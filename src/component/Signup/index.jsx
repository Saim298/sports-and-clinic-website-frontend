import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_ROUTES } from "../../config/apiRoutes";
import { toast } from "react-toastify";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

const Signup = () => {
  const [showSignup, setShowSignup] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    let strength = "";
    if (value.length < 6) {
      strength = "Weak";
    } else if (value.length < 10) {
      strength = "Good";
    } else if (value.length < 15) {
      strength = "Very Good";
    } else {
      strength = "Very Strong";
    }
    setPasswordStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignup = () => {
    window.location.href = API_ROUTES.GOOGLE_AUTH;
  };

  const handleFacebookSignup = () => {
    window.location.href = API_ROUTES.FACEBOOK_AUTH;
  };

  const handleSimpleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(API_ROUTES.AUTH_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          address: formData.address,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // Store user ID in localStorage
        localStorage.setItem("user_id", result.userId);
        toast.success(result.message);
        window.location.href = "/account/overview";
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(API_ROUTES.AUTH_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store user ID in localStorage
        localStorage.setItem("user_id", result.userId);

        toast.success(result.message);
        // Navigate to the desired page after successful login
        window.location.href = "/account/overview";
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signupPage">
      <Navbar />
      <div className="container blog-detail-form-container my-5 py-5">
        <h1 className="text-center mb-4">{showSignup ? "Sign Up" : "Login"}</h1>
        <div className="card shadow-lg p-5 border-0">
          {showSignup ? (
            <>
              {/* Signup Form Fields */}
              <div className="form-group mb-3">
                <label className="font-weight-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      handleInputChange(e);
                      handlePasswordChange(e);
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className={`progress mt-2 ${passwordStrength}`}>
                  <div
                    className={`progress-bar ${passwordStrength}`}
                    role="progressbar"
                    style={{
                      width: `${
                        passwordStrength === "Weak"
                          ? 20
                          : passwordStrength === "Good"
                          ? 60
                          : 100
                      }%`,
                    }}
                  >
                    {passwordStrength}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media Signup Buttons */}
              <button
                onClick={handleGoogleSignup}
                className="btn btn-google btn-block mb-3"
              >
                <FaGoogle className="mr-2" />
                Sign up with Google
              </button>

              <button
                onClick={handleFacebookSignup}
                className="btn btn-facebook btn-block"
              >
                <FaFacebookF className="mr-2" />
                Sign up with Facebook
              </button>

              {/* Regular Signup Button */}
              <button
                onClick={handleSimpleSignup}
                className="btn btn-primary btn-block mt-3"
              >
                Register
              </button>

              <p className="mt-3 text-center">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </span>
              </p>
            </>
          ) : (
            <>
              {/* Login Form Fields */}
              <div className="form-group mb-3">
                <label className="font-weight-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="font-weight-bold">Password</label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-block"
              >
                Login Now
              </button>
              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setShowSignup(true)}
                >
                  Sign up here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
