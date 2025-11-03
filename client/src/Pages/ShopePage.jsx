import React from 'react'
import Layoutt from '../components/Layout/Layoutt'
import Products from '../components/Product/Products'
import ProductStore from '../Store/ProductStore'
import { useEffect } from 'react'

const ShopePage = () => {

 
  const { BrandListRequest ,CategoryListRequest,SliderListRequest,ListByRemarkRequest} = ProductStore();

  useEffect(() => {
    // ✅ IIFE (Immediately Invoked Function)
    (async () => {
    
      await BrandListRequest();
      await CategoryListRequest();
      await SliderListRequest();
      await ListByRemarkRequest('new');
    })();
  }, []);



  return (
    <Layoutt>
               
               <Products/>
               
    </Layoutt>
  )
}

export default ShopePage