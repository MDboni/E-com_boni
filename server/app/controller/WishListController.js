import { RemoveWishListService, SaveWishListService, WishListService } from "../services/WishListServices.js"

export const createWishListControler = async(req , res)=>{
    const result = await SaveWishListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

export const UpdateWishListControler = async(req , res)=>{
    const result = await SaveWishListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}


export const RemoveWishListControler = async(req , res)=>{
    const result = await RemoveWishListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

export const WishListControler = async(req , res)=>{
    const result = await WishListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

