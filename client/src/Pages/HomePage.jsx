
import { useEffect } from "react"
import Layoutt from "../components/Layout/Layoutt"
import FeatureStoreZustin from "../Store/FetereStore"
import ProductStore from "../Store/ProductStore"
import Featers from "../components/Featars/Featers"
import Categories from "../components/Product/Categories"
import Brands from "../components/Product/Brands"
import Slider from "../components/Product/Slider"
import Products from "../components/Product/Products"


const HomePage = () => {

  const { FeatureListRequest } = FeatureStoreZustin();
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
       <Slider/>
       <Featers/>
       <Categories/>
       <Products/>
       <Brands/>
    </Layoutt>
  )
}

export default HomePage