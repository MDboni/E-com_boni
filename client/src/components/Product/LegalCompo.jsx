import React, { useState } from "react";

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
      // Backend API call
      // await axios.post('/api/contact', formData);

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center p-6">
      <div className="bg-gray-100 shadow-2xl rounded-3xl w-full max-w-5xl p-10 animate__animated animate__fadeInUp border-t-8 border-indigo-700">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 animate__animated animate__fadeInDown">
          Contact Us
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Floating label input fields */}
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

          <div className="relative md:col-span-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              rows="6"
              required
              className="peer w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 transition bg-white"
            ></textarea>
            <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm">
              Your Message
            </label>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl text-lg transition shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {responseMsg && (
            <p className="md:col-span-2 text-center text-green-700 font-semibold mt-4">
              {responseMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
