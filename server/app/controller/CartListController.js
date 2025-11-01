import { CartListService, RemoveCartListService, SaveCartListService, UpdateCartListService } from "../services/CartListServices.js";

export const createCartListControler = async(req , res)=>{
    const result = await SaveCartListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

export const UpdateCartListControler = async(req , res)=>{
    const result = await UpdateCartListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}


export const RemoveCartListControler = async(req , res)=>{
    const result = await RemoveCartListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

export const CartistControler = async(req , res)=>{
    const result = await CartListService(req)
    if(result.status=== 'success'){
            return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
}

