import CartModel from "../model/CartModel.js";
import mongoose from "mongoose";
import ProfileModel from "../model/ProfileModel.js";
import InvoiceModel from "../model/InvoiceModel.js";
import InvoiceProductModel from "../model/InvoiceProductModel.js";
import PaymentSettingModel from "../model/PaymentSettingModel.js";
import FormData from "form-data";
import axios from "axios";

const ObjectId = mongoose.Types.ObjectId;

// ======================= CREATE INVOICE ==============================
export const CreateInvoiceService = async (req) => {
  const user_id = new ObjectId(req.headers.user_id);
  const email = req.headers.email;

  // 1. Fetch Cart Products
  const CartProducts = await CartModel.aggregate([
    { $match: { userID: user_id } },
    { $lookup: { from: 'products', localField: 'productID', foreignField: '_id', as: 'product' } },
    { $unwind: "$product" }
  ]);

  if (!CartProducts || CartProducts.length === 0) {
    throw new Error("Cart is empty. Cannot create invoice.");
  }

  // 2. Calculate totals
  let totalAmount = 0;
  for (const item of CartProducts) {
    const price = item.product.discount && item.product.discountPrice
      ? parseFloat(item.product.discountPrice)
      : parseFloat(item.product.price);
    totalAmount += item.qty * price;
  }
  const vat = totalAmount * 0.05;
  const payable = totalAmount + vat;

  // 3. Fetch Profile or create default
  let Profile = await ProfileModel.findOne({ userID: user_id });
  if (!Profile) {
    Profile = await ProfileModel.create({
      userID: user_id,
      cus_name: "Unknown Customer",
      cus_add: "Unknown Address",
      cus_city: "Unknown City",
      cus_country: "Unknown Country",
      cus_phone: "N/A",
      ship_name: "Unknown",
      ship_add: "Unknown",
      ship_city: "Unknown",
      ship_country: "Unknown",
      ship_phone: "N/A"
    });
  }
  const cus = Profile;

  const cus_details = `Name:${cus.cus_name}, Email:${email}, Address:${cus.cus_add}, Phone:${cus.cus_phone}`;
  const ship_details = `Name:${cus.ship_name}, City:${cus.ship_city}, Address:${cus.ship_add}, Phone:${cus.ship_phone}`;

  // 4. Transaction info
  const tran_id = Math.floor(10000000 + Math.random() * 90000000);

  // 5. Create Invoice
  const createInvoice = await InvoiceModel.create({
    userID: user_id,
    payable,
    cus_details,
    ship_details,
    tran_id,
    val_id: 0,
    payment_status: "pending",
    delivery_status: "pending",
    total: totalAmount,
    vat
  });

  const invoice_id = createInvoice._id;

  // 6. Create Invoice Products
  for (const item of CartProducts) {
    await InvoiceProductModel.create({
      userID: user_id,
      productID: item.productID,
      invoiceID: invoice_id,
      qty: item.qty,
      price: item.product.discount ? item.product.discountPrice : item.product.price,
      color: item.color,
      size: item.size
    });
  }

  // 7. Remove Cart Items
  await CartModel.deleteMany({ userID: user_id });

  // 8. SSL Payment
  const PaymentSettings = await PaymentSettingModel.find();
  if (!PaymentSettings || PaymentSettings.length === 0) {
    throw new Error("Payment settings not configured.");
  }
  const ps = PaymentSettings[0];

  const form = new FormData();
  form.append('store_id', ps.store_id);
  form.append('store_passwd', ps.store_passwd);
  form.append('total_amount', payable.toString());
  form.append('currency', ps.currency);
  form.append('tran_id', tran_id);

  form.append('success_url', `${ps.success_url}/${tran_id}`);
  form.append('fail_url', `${ps.fail_url}/${tran_id}`);
  form.append('cancel_url', `${ps.cancel_url}/${tran_id}`);
  form.append('ipn_url', `${ps.ipn_url}/${tran_id}`);

  form.append('cus_name', cus.cus_name);
  form.append('cus_email', email);
  form.append('cus_add1', cus.cus_add);
  form.append('cus_add2', cus.cus_add);
  form.append('cus_city', cus.cus_city);
  form.append('cus_state', cus.cus_state || "");
  form.append('cus_postcode', cus.cus_postcode || "");
  form.append('cus_country', cus.cus_country);
  form.append('cus_phone', cus.cus_phone);
  form.append('cus_fax', cus.cus_phone);

  form.append('shipping_method', "YES");
  form.append('ship_name', cus.ship_name);
  form.append('ship_add1', cus.ship_add);
  form.append('ship_add2', cus.ship_add);
  form.append('ship_city', cus.ship_city);
  form.append('ship_state', cus.ship_state || "");
  form.append('ship_country', cus.ship_country);
  form.append('ship_postcode', cus.ship_postcode || "");

  form.append('product_name', 'According Invoice');
  form.append('product_category', 'According Invoice');
  form.append('product_profile', 'According Invoice');
  form.append('product_amount', 'According Invoice');

  const SSLRes = await axios.post(ps.init_url, form);

  return { status: "success", data: SSLRes.data };
};

// ==================== PAYMENT SERVICES ================================
const updatePaymentStatus = async (tran_id, status) => {
  try {
    await InvoiceModel.updateOne({ tran_id }, { payment_status: status });
    return { status: "success" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

export const PaymentSuccessService = async (req) => updatePaymentStatus(req.params.trxID, "success");
export const PaymentFailService = async (req) => updatePaymentStatus(req.params.trxID, "fail");
export const PaymentCancelService = async (req) => updatePaymentStatus(req.params.trxID, "cancel");

export const PaymentIPNService = async (req) => {
  const status = req.body.status;
  return updatePaymentStatus(req.params.trxID, status);
};

// ===================== INVOICE LIST ================================
export const InvoiceListService = async (req) => {
  try {
    const invoice = await InvoiceModel.find({ userID: req.headers.user_id });
    return { status: "success", data: invoice };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

export const InvoiceProductListService = async (req) => {
  try {
    const user_id = new ObjectId(req.headers.user_id);
    const invoice_id = new ObjectId(req.params.invoice_id);

    const products = await InvoiceProductModel.aggregate([
      { $match: { userID: user_id, invoiceID: invoice_id } },
      { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } },
      { $unwind: "$product" }
    ]);

    return { status: "success", data: products };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
