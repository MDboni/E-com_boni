import { create } from "zustand";
import { getEmail, setEmail } from "../utility/utility";
import Cookies from "js-cookie";
import axios from "axios";

// ✅ Vercel deployed API base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://e-com-boni-27uw.vercel.app/api";

const unauthorized = (status) => {
  if (status === 401) {
    alert("Session expired. Please login again.");
    window.location.href = "/login"; 
  } else {
    console.warn("Unhandled status:", status);
  }
};

export const UserStore = create((set, get) => ({

  token: Cookies.get('token') || "", 
  isLogin: () => !!get().token,

  isFormSubmit: false,

  LoginFromData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFromData: {
        ...state.LoginFromData,
        [name]: value
      }
    }));
  },

  UserOtpRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`${API_BASE}/UserOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data.status === 'success';
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value
      }
    }));
  },

  VeriFyOtpRequest: async (otp) => {
    const email = getEmail(); 
    if (!email || !otp) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`${API_BASE}/VerifyOtpControler/${email}/${otp}`);
    set({ isFormSubmit: false });

    if (res.data.status) {
      const token = res.data.token;
      if (token) {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Lax' });
        set({ token });
      }
      return true; 
    }
    return false;
  },

  ResendOtpRequest: async () => {
    const email = getEmail();
    if (!email) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`${API_BASE}/UserOTP/${email}`);
    set({ isFormSubmit: false });
    return res.data.status === "success";
  },

  UserLogoutRequest: async () => {
    try {
      set({ isFormSubmit: true });

      const res = await axios.get(`${API_BASE}/UserLogOut`);

      set({ isFormSubmit: false });

      if (res.data.status === "success") {
        Cookies.remove("token", { path: "/", secure: true, sameSite: "Lax" });
        localStorage.clear();
        sessionStorage.clear();
        set({ token: "" });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Logout failed:", error);
      set({ isFormSubmit: false });
      Cookies.remove("token", { path: "/", secure: true, sameSite: "Lax" });
      set({ token: "" });
      return false;
    }
  },

  // ===== Profile =====
  ProfileForm: {
    cus_add: "", cus_city: "", cus_country: "", cus_fax: "", cus_name: "", cus_phone: "",
    cus_postcode: "", cus_state: "", ship_add: "", ship_city: "", ship_country: "",
    ship_name: "", ship_phone: "", ship_postcode: "", ship_state: ""
  },

  ProfileChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value
      }
    }));
  },

  ProfileDetails: null,

  ProfileDetailsRequest: async () => {
    try {
      const res = await axios.get(`${API_BASE}/ReadProfileControler`, {
        headers: { user_id: localStorage.getItem("user_id") }
      });
      if (res.data.data && res.data.data.length > 0) {
        set({ ProfileDetails: res.data.data[0] });
        set({ ProfileForm: res.data.data[0] });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      unauthorized(e.response?.status);
    }
  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post(`${API_BASE}/UpdateProfile`, PostBody, {
        headers: { user_id: localStorage.getItem("user_id") }
      });
      return res.data.status === "success";
    } catch (e) {
      unauthorized(e.response?.status);
      return false;
    }
  }

}));
