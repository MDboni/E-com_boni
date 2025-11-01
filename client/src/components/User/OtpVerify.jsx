import { useNavigate } from "react-router-dom";
import { UserStore } from "../../Store/UserStore";
import ValidationHelper from "../../utility/ValidationHelper";
import UserSubmitButton from "./UserSubmitButton";
import toast from "react-hot-toast";

const VerificationForm = () => {

  const { OTPFormData , OTPFormOnChange , VeriFyOtpRequest ,ResendOtpRequest  } = UserStore()
  const navigate = useNavigate() ;

  const onFormSubmit = async () => {
  if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
    toast.error("Valid PIN Required");
    return;
  }
  const res = await VeriFyOtpRequest(OTPFormData.otp);
  res ? navigate("/") : toast.error("OTP code Not Match");
};

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
              Enter Verification Code
            </h3>
            <p className="mb-4 text-center text-muted">
              A verification code has been sent to your email address
            </p>

            <div className="mb-3">
              <label htmlFor="otp" className="form-label fw-semibold">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={OTPFormData.otp}
                onChange={(e)=>{OTPFormOnChange('otp', e.target.value)}}
                placeholder="Enter code"
                className="form-control form-control-lg rounded-3"
              />
            </div>

            <UserSubmitButton onClick={onFormSubmit} submit={false} className="btn mt-3 btn-success" text="Submit"/>


            <p className="mt-3 text-center text-muted" style={{ fontSize: "0.85rem" }}>
               Didn't receive the code? 
              <a href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await ResendOtpRequest();
                  res ? toast.success("OTP sent successfully") : toast.error("Failed to send OTP");
                }}>
                Resend
              </a>

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

export default VerificationForm;
