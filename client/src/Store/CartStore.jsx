import axios from 'axios';
import { create } from 'zustand';

// ✅ Backend base URL (Vercel deployed)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://e-com-boni-27uw.vercel.app/api";

export const CartStore = create((set) => ({

  isCartSubmit: false,

  // 🛒 Cart Form State
  CartForm: { productID: "", color: "", size: "" },
  CartFormChange: (name, value) => {
    set((state) => ({
      CartForm: {
        ...state.CartForm,
        [name]: value,
      },
    }));
  },

  // 🛍️ Add or Update Cart Item
  CartSaveOrUpdateRequest: async (PostBody, productID, quantity, isUpdate = false) => {
    try {
      set({ isCartSubmit: true });

      const PostBodyData = {
        productID,
        qty: parseInt(quantity),
        color: PostBody.color || "",
        size: PostBody.size || "",
      };

      const url = isUpdate
        ? `${API_BASE}/UpdateCartListControler`
        : `${API_BASE}/createCartListControler`;

      const res = await axios.post(url, PostBodyData, {
        headers: { "Content-Type": "application/json" },
      });

      return res.data.status === "success";
    } catch (error) {
      console.error("CartSaveOrUpdate Error:", error.response?.data || error);
      return false;
    } finally {
      set({ isCartSubmit: false });
    }
  },

  // 🛒 Cart Data State
  CartList: null,
  CartCount: 0,
  CartTotal: 0,
  CartVatTotal: 0,
  CartPayableTotal: 0,

  // 🧮 Load Cart List
  CartListRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/CartistControler`, {
        headers: { user_id: localStorage.getItem("user_id") }
      });

      const data = res.data.data || [];

      let total = 0;
      data.forEach((item) => {
        const price = item.product.discount
          ? parseInt(item.product.discountPrice)
          : parseInt(item.product.price);
        total += parseInt(item.qty) * price;
      });

      const vat = total * 0.05;
      const payable = total + vat;

      set({
        CartList: data,
        CartCount: data.length,
        CartTotal: total,
        CartVatTotal: vat,
        CartPayableTotal: payable,
      });

      return true;
    } catch (error) {
      console.error("CartListRequest Error:", error);
      return false;
    }
  },

  RemoveCartListRequest: async (cartID) => {
    try {
      set({ CartList: null });

      await axios.delete(`${API_BASE}/RemoveCartListControler`, {
        headers: { user_id: localStorage.getItem("user_id") },
        data: { _id: cartID },
      });

      const res = await axios.get(`${API_BASE}/CartistControler`, {
        headers: { user_id: localStorage.getItem("user_id") },
      });
      set({ CartList: res.data.data });
    } catch (e) {
      console.error("RemoveCartListRequest Error:", e.response?.data || e.message);
    }
  },

  CreateInvoiceRequest: async () => {
    try {
      set({ isCartSubmit: true });
      let res = await axios.get(`${API_BASE}/CreateInvoice`);
      window.location.href = res.data.data.GatewayPageURL;
    } catch (e) {
      console.error("CreateInvoiceRequest Error:", e.response?.status || e.message);
      alert("Something went wrong while creating invoice!");
    } finally {
      set({ isCartSubmit: false });
    }
  },

  InvoiceList: null,
  InvoiceListRequest: async () => {
    try {
      let res = await axios.get(`${API_BASE}/InvoiceList`);
      set({ InvoiceList: res.data.data });
    } catch (e) {
      console.error("InvoiceListRequest Error:", e.response?.status || e.message);
    }
  },

  InvoiceDetails: null,
  InvoiceDetailsRequest: async (id) => {
    try {
      let res = await axios.get(`${API_BASE}/InvoiceProductList/${id}`);
      set({ InvoiceDetails: res.data.data });
    } catch (e) {
      console.error("InvoiceDetailsRequest Error:", e.response?.status || e.message);
    }
  }

}));
