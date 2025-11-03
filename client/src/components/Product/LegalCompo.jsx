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
      // Backend API call (replace with real API)
      // await axios.post('/api/contact', formData);

      setTimeout(() => {
        setResponseMsg("Thank you! Your message has been sent.");
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
      setResponseMsg("Something went wrong. Try again!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8 animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700 animate__animated animate__fadeInDown">
          Contact Us
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 transition"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-400 transition"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-300 transition"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 transition"
          />
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-300 transition"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 transition md:col-span-2"
          ></textarea>

          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {responseMsg && (
            <p className="md:col-span-2 text-center text-green-600 font-semibold mt-2">
              {responseMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
