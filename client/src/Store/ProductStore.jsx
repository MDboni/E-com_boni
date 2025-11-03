import axios from "axios";
import { create } from "zustand";

// ✅ Backend base URL (Vercel deployed)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://e-com-boni-27uw.vercel.app/api";

const ProductStore = create((set)=>({

  // ===== Brand Store =====
  BrandStore: null,
  BrandListRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/ProductBrandList`);
      if (res.data.status === "success") {
        set({ BrandStore: res.data.data });
      }
    } catch (error) {
      set({ BrandStore: null });
      console.error("BrandListRequest Error:", error.message);
    }
  },

  // ===== Category Store =====
  CategoryStore: null,
  CategoryListRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/ProductCategoryList`);
      if (res.data.status === "success") {
        set({ CategoryStore: res.data.data });
      }
    } catch (error) {
      set({ CategoryStore: null });
      console.error("CategoryListRequest Error:", error.message);
    }
  },

  // ===== Slider Store =====
  SliderStore: null,
  SliderListRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/ProductSliderList`);
      if (res.data.status === "success") {
        set({ SliderStore: res.data.data });
      }
    } catch (error) {
      set({ SliderStore: null });
      console.error("SliderListRequest Error:", error.message);
    }
  },

  // ===== List by Remark =====
  ListByRemarkStore: [],
  ListByRemarkRequest: async (Remark) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductListByRemark/${Remark}`);
      if (res.data.status === "success") {
        set({ ListByRemarkStore: res.data.data });
      }
    } catch (error) {
      console.error("ListByRemarkRequest Error:", error.message);
    }
  },

  // Product Store
  ProductListByBCK: [],

  ProductListByBrandRequest: async (BrandID) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductListByBrand/${BrandID}`);
      if (res.data.status === "success") {
        set({ ProductListByBCK: res.data.data });
      }
    } catch (error) {    
      console.error("ProductListByBrandRequest Error:", error.message);
    }
  },

  ProductListByCategoryRequest: async (CategoryID) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductListByCategory/${CategoryID}`);
      if (res.data.status === "success") {
        set({ ProductListByBCK: res.data.data });
      }
    } catch (error) {    
      console.error("ProductListByCategoryRequest Error:", error.message);
    }
  },

  SearchKeyword: "",
  SetSearchKeyword: async (keyword) => {
    set({ SearchKeyword: keyword });
  },

  ProductListByKeywordRequest: async (Keyword) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductListByKeyword/${Keyword}`);
      if (res.data.status === "success") {
        set({ ProductListByBCK: res.data.data });
      }
    } catch (error) {    
      console.error("ProductListByKeywordRequest Error:", error.message);
    } 
  },

  ProductListByFilterRequest: async (FilterData = {}) => {
    try {
      const res = await axios.post(`${API_BASE}/ProductListByFilter`, FilterData);
      if (res.data.status === "success") {
        set({ ProductListByBCK: res.data.data });
      }
    } catch (error) {
      console.error("ProductListByFilterRequest Error:", error.message);
    }
  },

  ProductDetailsStore: [],
  ProductDetailsStoreRequest: async (ProductID) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductDetails/${ProductID}`);
      if (res.data.status === "success") {
        set({ ProductDetailsStore: res.data.data });
      }
    } catch (error) {    
      console.error("ProductDetailsStoreRequest Error:", error.message);
    }
  },

  ProductReviewListStore: [],
  ProductReviewListRequest: async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductReviewList/${id}`);
      if (res.data.status === "success") {
        set({ ProductReviewListStore: res.data.data });
      }
    } catch (error) {    
      console.error("ProductReviewList Error:", error.message);
    }
  }

}));

export default ProductStore;
