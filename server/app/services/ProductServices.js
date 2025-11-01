import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import BrandModel from "../model/BrandModel.js";
import CategoriModel from "../model/CategoriesModel.js";
import ProductSliderModel from "../model/ProductSlideModel.js";
import ProductModel from "../model/ProductModel.js";
import ReviewModel from "../model/ReviewModel.js";


export const BrandListService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
export const CategoryListService = async()=>{
try {
    const data = await CategoriModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}
export const SliderListService = async()=>{
try {
    const data = await ProductSliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}
export const ListByBrandService = async( req )=>{
    try {
        const brandid = req.params.BrandID
        const match   = {$match:{ brandID:new ObjectId(brandid)} }

        const joinWithBrand    = { $lookup:{from:'brands', localField:'brandID' , foreignField:'_id' , as:'brand'} }
        const joinWithCategory = { $lookup:{from:'categories',localField:'categoryID' , foreignField:'_id' , as:'categorie'} }
        const unwindBrand      = { $unwind: "$brand" };
        const unwindCategory   = { $unwind: "$categorie" };

        const data = await ProductModel.aggregate([
            match,joinWithBrand,joinWithCategory , unwindBrand , unwindCategory 
        ])

        return { status:"success" , data}
    } catch (error) {
            return { status: "fail", message: error.message };
    }
} 
export const ListByCategoryService = async(req)=>{
    try {
        const categoryID = req.params.CategoryID 
        const match = {$match : { categoryID: new ObjectId(categoryID)}}

        const joienWithCategory = { $lookup:{from:'categories', localField:"categoryID" , foreignField:'_id' , as:'category'}}
        const joienWithBrand    = { $lookup:{from:'brands', localField:'brandID' , foreignField:'_id', as:'brand'}}
        const unwindCategory    = { $unwind:'$category' }
        const unwindBrand       = { $unwind: '$brand' }
        const project           = { $project:{'brand._id':0, 'category._id':0}}

        const data = await ProductModel.aggregate([
            match,joienWithBrand,joienWithCategory,unwindBrand,unwindCategory , project
        ])

        return { status:"success" , data}
    } catch (error) {
        return { status: "fail", message: error.message };
    }

}
export const ListByRemarkService = async( req )=>{
     try {
        const Remark = req.params.Remark 
        const match = {$match : { remark: Remark}}

        const joienWithCategory = { $lookup:{from:'categories', localField:"categoryID" , foreignField:'_id' , as:'category'}}
        const joienWithBrand    = { $lookup:{from:'brands', localField:'brandID' , foreignField:'_id', as:'brand'}}
        const unwindCategory    = { $unwind:'$category' }
        const unwindBrand       = { $unwind: '$brand' }
        const project           = { $project:{'brand._id':0, 'category._id':0}}

        const data = await ProductModel.aggregate([
            match,joienWithBrand,joienWithCategory,unwindBrand,unwindCategory , project
        ])

        return { status:"success" , data}
    } catch (error) {
        return { status: "fail", message: error.message };
    }
}
export const ListBySmilierService = async(req , res)=>{
 try {
        const CategoryID = req.params.CategoryID 
        const match      = {$match : { categoryID: CategoryID}}
        const limitStage = {$limit:20}

        const joienWithCategory = { $lookup:{from:'categories', localField:"categoryID" , foreignField:'_id' , as:'category'}}
        const joienWithBrand    = { $lookup:{from:'brands', localField:'brandID' , foreignField:'_id', as:'brand'}}
        const unwindCategory    = { $unwind:'$category' }
        const unwindBrand       = { $unwind: '$brand' }
        const project           = { $project:{'brand._id':0, 'category._id':0}}

        const data = await ProductModel.aggregate([
            match,limitStage,joienWithBrand,joienWithCategory,unwindBrand,unwindCategory , project
        ])

        return { status:"success" , data}
    } catch (error) {
        return { status: "fail", message: error.message };
    }

}
export const DetailsService = async(req)=>{
  try {
    const detailsID = req.params.ProductID
    const match = { $match: { _id: new ObjectId(detailsID) } }

        const joienWithCategory = { $lookup:{from:'categories', localField:"categoryID" , foreignField:'_id' , as:'category'}}
        const joienWithBrand    = { $lookup:{from:'brands', localField:'brandID' , foreignField:'_id', as:'brand'}}
        const JoienWithDetails  = { $lookup:{from:'productdetails', localField:'_id' , foreignField:'productID' , as:'detail'}}
        const unwindCategory    = { $unwind:'$category' }
        const unwindBrand       = { $unwind: '$brand' }
        const unwindDetail      = { $unwind: '$detail' }
        const project           = { $project:{'brand._id':0, 'category._id':0}}

        const data = await ProductModel.aggregate([
            match,joienWithBrand,joienWithCategory,JoienWithDetails,unwindBrand,unwindDetail,unwindCategory , project
        ])
        return { status:"success" , data}

  } catch (error) {
            return { status: "fail", message: error.message };
  }
}


export const ListByKeywordService = async( req )=>{
 try {
    const keyword  = req.params.Keyword 
    const match    = { $match: { $or: [ {title:{$regex:keyword , $options:'i'}},{shortDes:{$regex:keyword , $options:'i'}}]}}
    
    const joienWithBrand    = { $lookup:{from:'brands' , localField:'brandID', foreignField:'_id' , as:'brand'} } 
    const joienWithCategori = { $lookup:{from:'categories', localField:'categoryID' , foreignField:'_id', as:'categori'}}
    const BrandUnwind       = { $unwind:"$brand"}
    const CategoryWind      = { $unwind:'$categori'}
    
    const data = await ProductModel.aggregate([
        match , joienWithBrand , joienWithCategori , BrandUnwind , CategoryWind
    ])
   return { status:"success" , data}

 } catch (error) {
      return { status: "fail", message: error.message };
 }
}

export const ReviewListService = async(req , res)=>{
 try {

        let ProductID=new ObjectId(req.params.ProductID);
        let MatchStage={$match:{productID:ProductID}}

        let JoinWithProfileStage= {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}};
        let UnwindProfileStage={$unwind:"$profile"}
        let ProjectionStage= {$project: {'des': 1, 'rating': 1, 'profile.cus_name': 1}}

        let data= await  ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail", message: e.message || e.toString() }
    }
} 

export const CreateReviewService = async(req , res)=>{

} 


export const ListByFilterService = async (req) => {
  try {

        let matchConditions = {};
        if (req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID']);
        }
        if (req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID']);
        }
        let MatchStage = { $match: matchConditions };






        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" }}
        };
        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {};
        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
        }
        let PriceMatchStage = { $match: PriceMatchConditions };






        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
};


