import toast from "react-hot-toast";
import { UserStore } from "../../Store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import UserSubmitButton from "./UserSubmitButton";
import {useNavigate} from "react-router-dom";


const LoginForm = () => {
  const navigate=useNavigate();

  const { LoginFromData,LoginFormOnChange,UserOtpRequest} = UserStore()
  
  const onFormSubmit = async()=>{
    if(!ValidationHelper.IsEmail(LoginFromData.email)){
      toast.error("Valid Email Address Required")
    }else{
      const res = await UserOtpRequest(LoginFromData.email) ;
      res ? navigate('/otp') : toast.error('Something Went Wrong')
    }
  }


  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #624a7eff, #2575fc, #ff6a00, #ff007f)",
        animation: "bgAnimation 15s ease-in-out infinite alternate",
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-sm-10">
          <div
            className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
            style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
          >
            <h3 className="mb-3 text-center fw-bold" style={{ color: "#333" }}>
              Welcome Back
            </h3>
            <p className="mb-4 text-center text-muted">
              Enter your email below and we'll send you a verification code.
            </p>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={LoginFromData.email}
                onChange={(e)=>{LoginFormOnChange('email',e.target.value)}}
                placeholder="Enter your email"
                className="form-control form-control-lg rounded-3"
              />
            </div>

            <UserSubmitButton onClick={ onFormSubmit } className="btn mt-3 btn-success" text="Next"/>


            <p className="mt-3 text-center text-muted" style={{ fontSize: "0.85rem" }}>
              By continuing, you agree to our <a href="#">Terms & Conditions</a>.
            </p>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes bgAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .container-fluid {
          background-size: 400% 400%;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
