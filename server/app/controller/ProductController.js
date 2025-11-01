import { BrandListService, CategoryListService, DetailsService, ListByBrandService, ListByCategoryService, ListByFilterService, ListByKeywordService, ListByRemarkService, ReviewListService, SliderListService } from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  const result = await BrandListService();

  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }

};



export const ProductCategoryList = async(req , res) =>{
  const result = await CategoryListService();

  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}


export const ProductSliderList = async(req , res) =>{
 const result = await SliderListService();

  if (result.status === "success") {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}



export const ProductListByBrand = async(req , res) =>{

  const result = await ListByBrandService(req)

  if( result.status === 'success'){
    return res.status(200).json(result) ;
  }else {
    return res.status(500).json(result)
  }
}


export const ProductListByCategory = async(req , res) =>{
  const result = await ListByCategoryService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
}


export const ProductListBySmilier = async(req , res) =>{
  const result = await ListByCategoryService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
    
}
export const ProductListByKeyword = async(req , res) =>{
   const result = await ListByKeywordService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
}
export const ProductListByRemark = async(req , res) =>{
 const result = await ListByRemarkService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
}

export const ProductDetails = async(req , res) =>{
  const result = await DetailsService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
}

export const ProductReviewList = async(req , res) =>{
  const result = await ReviewListService(req)

  if(result.status === 'success'){
    return res.status(200).json(result) ;
  }else{
     return res.status(500).json(result)
  }
}


export const CreateReview = async(req , res) =>{
    
}


export const ProductListByFilter=async(req,res)=>{
    let result=await ListByFilterService(req);
    return res.status(200).json(result)
}