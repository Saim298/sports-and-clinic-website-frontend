import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import contact1 from "../../assets/contact1.jpg";
import contact2 from "../../assets/contact2.jpg";
import axios from "axios";
import { toast } from "react-toastify";


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    hasSubscription: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        hasSubscription: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Debug line
    try {
      const response = await axios.post("http://localhost:5000/api/contact-us/contact", formData);
      if (response.status === 201) {
        toast.success("Sent back successfully. We will contact you shortly.");
        // Clear the form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          hasSubscription: "",
          message: "",
        });
      } else {
        toast.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Error sending your message. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={contact1} alt="Placeholder" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <img src={contact2} alt="Placeholder" className="img-fluid" />
          </div>
        </div>
      </div>

      <div className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4 container">
            <h1>Contact Us</h1>
            <p className="text-muted">
              We would love to hear from you. Feel free to reach out using the
              form below.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <h6 className="mb-4">Name</h6>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <p className="mb-2">
                    Do you have an active subscription to Got Next?{" "}
                    <span className="text-danger">*</span>
                  </p>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="subscription"
                      id="hasSubscriptionYes"
                      value="true"
                      checked={formData.hasSubscription === "true"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="hasSubscriptionYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="subscription"
                      id="hasSubscriptionNo"
                      value="false"
                      checked={formData.hasSubscription === "false"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="hasSubscriptionNo">
                      No
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Comment or Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-outline-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
