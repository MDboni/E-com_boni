import axios from "axios";
import { create } from "zustand";

// ✅ Backend base URL (Vercel deployed)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://e-com-boni-27uw.vercel.app/api";

const FeatureStoreZustin = create((set) => ({
  // ===== Feature Store =====
  FeatureStore: null,

  FeatureListRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/FeaturesList`);
      if (res.data.status === "success") {
        set({ FeatureStore: res.data.data });
      }
    } catch (error) {
      console.error("FeatureListRequest Error:", error.message);
    }
  },

  LegalDetailsStore: null,

  LegalDetailsRequest: async (type) => {
    try {
      const res = await axios.get(`${API_BASE}/LegalDetails/${type}`);
      if (res.data.status === "success") {
        set({ LegalDetailsStore: res.data.data[0] }); // কারণ API তে array আসছে
      } else {
        set({ LegalDetailsStore: null });
      }
    } catch (error) {
      console.error("LegalDetailsRequest Error:", error.message);
      set({ LegalDetailsStore: null });
    }
  },

}));

export default FeatureStoreZustin;
