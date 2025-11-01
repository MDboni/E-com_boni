import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserStore } from "../../Store/UserStore";

const ProfileForm = () => {
  
 const { ProfileForm,  ProfileChange,  ProfileDetailsRequest, isLoading,  ProfileSaveRequest } = UserStore();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: ProfileForm,
  });


  // Fetch profile data on mount=======================
  useEffect(() => {
    (async () => {
      await ProfileDetailsRequest();
    })();
  }, [ProfileDetailsRequest]);

  // Reset form when store data changes=====================
  useEffect(() => {
    reset(ProfileForm)
  }, [ProfileForm, reset]);

  // Submit handler==================
  const onSubmit = async (data) => {
     ProfileChange(data)
    const success = await ProfileSaveRequest(data);
    if (success) toast.success("Profile updated successfully!");
    else toast.error("Update failed!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #624a7e, #2575fc, #ff6a00, #ff007f)",
        animation: "bgAnimation 15s ease-in-out infinite alternate",
      }}

    >
    <div  className="container py-4">
      <h3 className="mb-4 text-center fw-bold text-white">Customer & Shipping Details</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
        {/* ===== Customer Details ===== */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 border-0">
            <h5 className="fw-semibold mb-3">Customer Details</h5>

            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input {...register("cus_name")} className="form-control" placeholder="Enter name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input {...register("cus_phone")} className="form-control" placeholder="Enter phone" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input {...register("cus_email")} className="form-control" placeholder="Enter email" />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input {...register("cus_add")} className="form-control" placeholder="Enter address" />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input {...register("cus_city")} className="form-control" placeholder="Enter city" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input {...register("cus_country")} className="form-control" placeholder="Enter country" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input {...register("cus_state")} className="form-control" placeholder="Enter state" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Postcode</label>
                <input {...register("cus_postcode")} className="form-control" placeholder="Enter postcode" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== Shipping Details ===== */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 border-0">
            <h5 className="fw-semibold mb-3">Shipping Details</h5>

            <div className="mb-3">
              <label className="form-label">Receiver Name</label>
              <input {...register("ship_name")} className="form-control" placeholder="Receiver name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input {...register("ship_phone")} className="form-control" placeholder="Receiver phone" />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input {...register("ship_add")} className="form-control" placeholder="Receiver address" />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input {...register("ship_city")} className="form-control" placeholder="Receiver city" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input {...register("ship_country")} className="form-control" placeholder="Receiver country" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input {...register("ship_state")} className="form-control" placeholder="Receiver state" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Postcode</label>
                <input {...register("ship_postcode")} className="form-control" placeholder="Receiver postcode" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-5" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
      

      {/* Gradient Animation CSS */}
      <style>{`
        @keyframes bgAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .container {
          background-size: full;
        }
      `}</style>
    </div>
  );
};

export default ProfileForm;
