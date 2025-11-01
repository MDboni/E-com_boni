import axios from "axios";
import { create } from "zustand";

const ZusanStore = create((set) => ({


  // ===== Brand Store =====
  BrandStore: null,
  BrandListRequest: async () => {
    try {
      const res = await axios.get("/api/ProductBrandList");
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
      const res = await axios.get("/api/ProductCategoryList");
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
      const res = await axios.get("/api/ProductSliderList");
      if (res.data.status === "success") {
        set({ SliderStore: res.data.data });
      }
    } catch (error) {
      set({ SliderStore: null });
      console.error("SliderListRequest Error:", error.message);
    }
  },

  // ===== List by Remark =====
  ListByRemarkStore: null,
  ListByRemarkRequest: async (Remark) => {
    try {
      const res = await axios.get(`/api/ProductListByRemark/${Remark}`);
      if (res.data.status === "success") {
        set({ ListByRemarkStore: res.data.data });
      }
    } catch (error) {
      set({ ListByRemarkStore: null });
      console.error("ListByRemarkRequest Error:", error.message);
    }
  },
  
}));

export default ZusanStore;
