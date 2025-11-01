import React, { useState } from "react";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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

      // Temporary success simulation
      setTimeout(() => {
        setResponseMsg("Thank you! Your message has been sent.");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1000);
    } catch (error) {
      setResponseMsg("Something went wrong. Try again!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 contact-title animate__animated animate__fadeInDown">
        Contact Us
      </h2>
      <form
        className="p-4 rounded shadow contact-form animate__animated animate__fadeInUp"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control input-color1"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control input-color2"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control input-color3"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control input-color4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {responseMsg && <p className="mt-3 text-center">{responseMsg}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
