import ProfileModel from "../model/ProfileModel.js";
import UserModel from "../model/UserModel.js";
import SendEmail from "../utility/emailUtility.js";
import { EncodeToken } from "../utility/tokenUtility.js";

export const UserOTPService = async (email) => {
  if (!email) {
    return { status: "fail", message: "Email is required" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const EmailText = `Your Verification Code is: ${otp}`;
  const EmailSubject = "Email Verification";

  const emailResult = await SendEmail(email, EmailText, EmailSubject);
  if (!emailResult.success) {
    return { status: "fail", message: "Failed to send OTP email" };
  }

  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  await UserModel.updateOne({ email }, { $set: { otp, otpExpiry } }, { upsert: true });

  return { status: "success", message: "6-digit OTP has been sent" };
};


export  const VerifyOtpService = async (req)=>{
  try {
    const email = req.params.email   
    const otp   = req.params.otp

    const total = await UserModel.countDocuments({ email, otp });
    
    if(total===1){
      // user read 
      const user_id = await UserModel.find({email,otp}).select('_id') ;
      
      let token = EncodeToken(email,user_id[0]['_id'].toString())

      await UserModel.updateOne({email},{$set:{otp:'0'}})
      return {status:"success", message:"Valid OTP",token:token,total:total}

    }else{
          return {status:"fail", message:"Invalid OTP",total:total}
    } 
    
  } catch (error) {
      return {status:"fail", message:"Invalid OTP"}
  }
}


export const CreateUpdateServic = async(req)=>{
  try {
    const user_id = req.headers.user_id 
    const reqBody = req.body 
    reqBody.userID=user_id
    const result = await ProfileModel.updateOne({ userID:user_id},{$set:reqBody},{upsert:true})
    return {status:"success", message:"Profile Save Success",result}

  } catch (error) {
           return {status:"fail", message:"Something Went Wrong"}

  }
}

export const ReadProfileService = async(req) =>{
  try {
    const read = req.headers.user_id
    const result = await ProfileModel.find({userID:read})
    return {status:"success", data:result}

  } catch (error) {
    return {status:"fail", message:"Something Went Wrong"}

  }
}