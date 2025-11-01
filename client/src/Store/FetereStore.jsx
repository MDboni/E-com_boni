import axios from "axios";
import { create } from "zustand";

const FeatureStoreZustin = create((set) => ({
  // ===== Feature Store =====
  FeatureStore: null,

  FeatureListRequest: async () => {
    try {
      const res = await axios.get("/api/FeaturesList");
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
    const res = await axios.get(`/api/LegalDetails/${type}`);
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
