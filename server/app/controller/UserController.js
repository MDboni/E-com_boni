import { CreateUpdateServic, ReadProfileService, UserOTPService, VerifyOtpService } from "../services/UserServices.js"


export const UserOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await UserOTPService(email);
    return res.status(200).json(result);  
  } catch (e) {
    console.error("UserOTP Error:", e.message);
    return res.status(500).json({ status: "fail", message: e.message });
  }
} 

export const VerifyOtpController = async (req, res) => {
  const result = await VerifyOtpService(req);

  if (result.status === "success") {
   let cookieOption = {expires: new Date(Date.now() + 24*60*60*1000), httpOnly: false}

    res.cookie("token", result.token, cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};


export const UserLogOut = async (req, res) => {
  try {
    // clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({ status: "success",message: "User logged out successfully", });
  } catch (error) {
    return res.status(500).json({ status: "fail",message: error.message,  });
  }
};

export const CreateProfile = async( req,res )=>{
  try {
    const result = await CreateUpdateServic(req)
    if(result.status === 'success'){
          return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
  } catch (error) {
       return res.status(500).json({ status: "fail",message: "Internal Server Error",error: error.message });
  }
}

export const UpdateProfile = async( req,res )=>{
  try {
    const result = await CreateUpdateServic(req)
    if(result.status === 'success'){
          return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
  } catch (error) {
       return res.status(500).json({ status: "fail",message: "Internal Server Error",error: error.message });
  }
}

export const ReadProfileControler = async(req,res) =>{
  try {
    const result = await ReadProfileService(req)
    if(result.status === 'success'){
          return res.status(200).json(result)
    }else{
      return res.status(400).json(result);
    }
  } catch (error) {
       return res.status(500).json({ status: "fail",message: "Internal Server Error",error: error.message });
  } 

  
}
