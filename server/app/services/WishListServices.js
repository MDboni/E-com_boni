import WishModel from "../model/WishModel.js"
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;



export const WishListService = async(req,res) => {
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
 
            const data= await WishModel.aggregate([
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

export const SaveWishListService = async(req)=>{
    try {
        const user_id = req.headers.user_id
        const reqBody = req.body 
        reqBody.userId=user_id

        const filter = { userID: user_id, productID: req.body.productID };
        const update = { $set: { userID: user_id, productID: req.body.productID } };

        await WishModel.updateOne(filter, update, { upsert: true });

        return {status:"success",message:"Wish List Save Success"}

    } catch (error) {
         return {status:"fail",message:"Something Went Wrong !"}

    }
}


export const RemoveWishListService = async(req)=>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await WishModel.deleteOne(reqBody)
        return {status:"success",message:"Wish List Remove Success"}

    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}