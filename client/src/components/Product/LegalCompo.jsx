import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMsg("");

    try {
      // Backend API call here
      setTimeout(() => {
        setResponseMsg("✅ Thank you! Your message has been sent.");
        setIsSubmitting(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
          company: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
        });
      }, 1000);
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Try again!");
      setIsSubmitting(false);
    }
  };

  // Google Maps setup
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
  };

  const center = {
    lat: 23.8103, // Example: Dhaka
    lng: 90.4125,
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-6">
      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="particle absolute w-2 h-2 bg-white rounded-full animate-bounce opacity-30"></div>
        <div className="particle absolute w-2 h-2 bg-white rounded-full animate-bounce delay-200 opacity-20"></div>
        <div className="particle absolute w-3 h-3 bg-white rounded-full animate-bounce delay-400 opacity-25"></div>
        {/* Add more particles for effect */}
      </div>

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-6 z-10">
        {/* Left: Google Map */}
        <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border-t-4 border-indigo-600">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
            >
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl p-10 flex flex-col justify-center animate__animated animate__fadeInUp">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center animate__animated animate__fadeInDown">
            Contact Us
          </h2>

          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            {[
              { name: "name", placeholder: "Full Name", type: "text" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "subject", placeholder: "Subject", type: "text" },
              { name: "phone", placeholder: "Phone", type: "text" },
              { name: "company", placeholder: "Company", type: "text" },
              { name: "city", placeholder: "City", type: "text" },
              { name: "state", placeholder: "State", type: "text" },
              { name: "country", placeholder: "Country", type: "text" },
              { name: "zipcode", placeholder: "Zip Code", type: "text" },
            ].map((field) => (
              <div key={field.name} className="relative w-full">
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="peer w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition bg-white"
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm">
                  {field.placeholder}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows="5"
                required
                className="peer w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition bg-white"
              ></textarea>
              <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-lg transition shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {responseMsg && (
              <p className="text-center text-green-700 font-semibold mt-2">
                {responseMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
