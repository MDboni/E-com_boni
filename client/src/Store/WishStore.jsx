// src/Store/WishStore.jsx
import { create } from 'zustand';
import axios from 'axios';

const WishStore = create((set) => ({
  isWishSubmit: false,
  WishListGate: [],
  WishCount: 0,

  // ✅ Helper to get token
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  },

  // ✅ Save or Update Wishlist
  WishSaveUpdateRequest: async (productID, isUpdate = false) => {
    try {
      set({ isWishSubmit: true });

      const url = isUpdate
        ? '/api/UpdateWishListControler'
        : '/api/createWishListControler';

      const tokenHeader = WishStore.getState().getAuthHeader();
      const res = await axios.post(url, { productID }, tokenHeader);

      if (res.data.status === 'success') return true;
      else {
        console.warn('WishSaveUpdate Failed', res.data);
        return false;
      }
    } catch (error) {
      console.error('WishSaveUpdate Error', error.response?.data || error);
      return false;
    } finally {
      set({ isWishSubmit: false });
    }
  },

  // ✅ Fetch Wishlist
  WishListRequest: async () => {
    try {
      console.log("Fetching WishList...");
      const tokenHeader = WishStore.getState().getAuthHeader();
      const res = await axios.get('/api/WishListControler', tokenHeader);

      set({
        WishListGate: res.data.data || [],
        WishCount: (res.data.data || []).length,
      });
      console.log("WishList fetched:", res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Unauthorized, please login");
      } else {
        console.error("WishListRequest Error", error.response?.data || error);
      }
    }
  },
}));

export default WishStore;
