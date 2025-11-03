import React from 'react'
import Layoutt from '../components/Layout/Layoutt'
import Categories from '../components/Product/Categories'
import Products from '../components/Product/Products'
import Brands from '../components/Product/Brands'
import ProductStore from '../Store/ProductStore'

const ShopePage = () => {

 
  const { BrandListRequest ,CategoryListRequest,SliderListRequest,ListByRemarkRequest} = ProductStore();

  useEffect(() => {
    // ✅ IIFE (Immediately Invoked Function)
    (async () => {
      await FeatureListRequest();
      await BrandListRequest();
      await CategoryListRequest();
      await SliderListRequest();
      await ListByRemarkRequest('new');
    })();
  }, []);



  return (
    <Layoutt>
               <Categories/>
               <Products/>
               <Brands/>
    </Layoutt>
  )
}

export default ShopePage