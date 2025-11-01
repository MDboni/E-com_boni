import { create } from "zustand";
import { getEmail, setEmail } from "../utility/utility";
import Cookies from "js-cookie";
import axios from "axios";



const unauthorized = (status) => {
    if (status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login"; 
    } else {
        console.warn("Unhandled status:", status);
    }
};


export const UserStore = create((set,get)=>({

    token: Cookies.get('token') || "", 
    isLogin: () => !!get().token,

    isFormSubmit : false ,

    LoginFromData:{email:""},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFromData:{
                ...state.LoginFromData,
                [name]:value
            }
        }))
    } , 

    UserOtpRequest : async(email) =>{
        set({isFormSubmit:true})
        let res = await axios(`/api/UserOTP/${email}`)
        setEmail(email)
        set({isFormSubmit:false})
        return res.data.status === 'success'
    } ,


     OTPFormData:{otp:""},
     OTPFormOnChange:(name,value)=>{
        set((state)=>({
            OTPFormData:{
                ...state.OTPFormData ,
                [name]:value
            } 
        }))
     } ,

   VeriFyOtpRequest: async (otp) => {
    const email = getEmail(); 
    if (!email || !otp) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`/api/VerifyOtpControler/${email}/${otp}`);
    set({ isFormSubmit: false });
    if(res.data.status){
        const token = res.data.token ;
        if(token){
            Cookies.set('token',token , { expires: 7, secure: true, sameSite: 'Lax' }) ;
            set({ token })
        }
        return true ; 
    }
    return false ;
  },

  ResendOtpRequest: async () => {
    const email = getEmail();
    if (!email) return false;

    set({ isFormSubmit: true });
    const res = await axios.get(`/api/UserOTP/${email}`);
    set({ isFormSubmit: false });
    return res.data.status === "success";
  },
  

 UserLogoutRequest: async () => {
  try {
    set({ isFormSubmit: true });

    const res = await axios.get("/UserLogOut");

    set({ isFormSubmit: false });

    if (res.data.status === "success") {
      // ✅ Token remove (forcefully)
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
    // even if backend fails, clear local token
    Cookies.remove("token", { path: "/", secure: true, sameSite: "Lax" });
    set({ token: "" });
    return false;
  }
}
,


// Profile data api =============================================


    // Profile Form state
    ProfileForm: {
        cus_add: "",
        cus_city: "",
        cus_country: "",
        cus_fax: "",
        cus_name: "",
        cus_phone: "",
        cus_postcode: "",
        cus_state: "",
        ship_add: "",
        ship_city: "",
        ship_country: "",
        ship_name: "",
        ship_phone: "",
        ship_postcode: "",
        ship_state: ""
    },

    // Profile form value change
    ProfileChange: (name, value) => {
        set((state) => ({
            ProfileForm: {
                ...state.ProfileForm,
                [name]: value
            }
        }));
    },

    // Profile details state
    ProfileDetails: null,

    // Fetch profile details from backend
    ProfileDetailsRequest: async () => {
        try {
            const res = await axios.get('/api/ReadProfileControler', {
                headers: { user_id: localStorage.getItem("user_id") }
            });
            if (res.data['data'] && res.data['data'].length > 0) {
                set({ ProfileDetails: res.data['data'][0] });
                set({ ProfileForm: res.data['data'][0] });
            } else {
                set({ ProfileDetails: [] });
            }
        } catch (e) {
            unauthorized(e.response?.status);
        }
    },

    // Save/Update profile
    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ ProfileDetails: null });
            let res = await axios.post(`/api/UpdateProfile`, PostBody, {
                headers: { user_id: localStorage.getItem("user_id") }
            });
            return res.data['status'] === "success";
        } catch (e) {
            unauthorized(e.response?.status);
            return false;
        }
    }


    
}))
