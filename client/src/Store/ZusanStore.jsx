import axios from "axios";
import { create } from "zustand";

// ✅ Vercel deployed API base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://e-com-boni-27uw.vercel.app/api";

const ZusanStore = create((set) => ({

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
  ListByRemarkStore: null,
  ListByRemarkRequest: async (Remark) => {
    try {
      const res = await axios.get(`${API_BASE}/ProductListByRemark/${Remark}`);
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
