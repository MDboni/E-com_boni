import CartModel from "../model/CartModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const CartListService = async(req,res) => {
    try {
        const user_id = new ObjectId(req.headers.user_id) ;
        const matchStage = {$match:{ userID:user_id}}
        
        const JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        const unwindProductStage={$unwind:"$product"}

        const JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        const unwindBrandStage={$unwind:"$brand"}

        const JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        const unwindCategoryStage={$unwind:"$category"}

        const projectionStage={
                $project:{
                    '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                    'product.categoryID':0,'product.brandID':0,
                    'brand._id':0,'category._id':0

                }
            }
 
            const data= await CartModel.aggregate([
                matchStage,
                JoinStageProduct,
                unwindProductStage,
                JoinStageBrand,
                unwindBrandStage,
                JoinStageCategory,
                unwindCategoryStage,
                projectionStage
            ])

            return {status:"success",data:data}

    } catch (error) {
          return {status:"fail",message:"Something Went Wrong !"}

    }
}

export const SaveCartListService = async (req) => {
  try {
    const user_id = new ObjectId(req.headers.user_id); // headers থেকে ObjectId
    const reqBody = req.body;

    reqBody.userID = user_id;
    reqBody.productID = new ObjectId(reqBody.productID); // ObjectId convert
    const result = await CartModel.create(reqBody); // এখন insert হবে
    

    return { status: "success", message: "Cart List Create Success", result };
  } catch (e) {
    console.log("Error:", e);
    return { status: "fail", message: "Something Went Wrong !", error: e.message };
  }
};

export const UpdateCartListService = async (req) => {
    try {
        let user_id=req.headers.user_id;
        let cartID=req.params.cartID;
        let reqBody=req.body;
        await  CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody});
        return {status:"success",message:"Cart List Update Success"}
    }
    catch (e) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}

export const RemoveCartListService = async(req)=>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await CartModel.deleteOne(reqBody)
        return {status:"success",message:"Wish List Remove Success"}

    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}


