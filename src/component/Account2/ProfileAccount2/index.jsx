import React, { useState } from "react";
import TabsList from "../TabsList";
import Profile from "../../Account/Profile";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";


const ProfileAccount2 = () => {
  const [avatar, setAvatar] = useState(null);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

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

  return (
    <div className="h-100">
      <Navbar />
      <div className="bg-light pb-5">
        <TabsList />
        <div className="container mt-5 mb-5">
        <div className="account-dashboard-content mt-5 mb-5 container">
          <h4>Edit your account</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group mb-3">
                <label>First Name</label>
                <input type="text" className="form-control" placeholder="First Name" />
              </div>
              <div className="form-group mb-3">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
              <div className="form-group mb-3">
                <label>Avatar</label>
                <div className="avatar-upload">
                  <img
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    className="img-thumbnail"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <input type="file" onChange={handleAvatarChange} style={{ display: "none", borderBottom:"none" }} id="avatarInput" />
                  <label htmlFor="avatarInput" className="btn btn-secondary mt-2">
                    <FaCamera /> Upload Avatar
                  </label>
                </div>
              </div>
              <button className="btn btn-primary mt-3 mb-3">Save Changes</button>
            </div>
            
            <div className="col-md-12 mt-4">
              <h4>Password Change</h4>
              <div className="form-group mb-3">
                <label>Current Password</label>
                <div className="input-group">
                  <input
                    type={currentPasswordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Current Password"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                    >
                      {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label>New Password</label>
                <div className="input-group">
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    onChange={handlePasswordChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className={`progress mt-2 ${passwordStrength}`}>
                  <div
                    className={`progress-bar ${passwordStrength}`}
                    role="progressbar"
                    style={{ width: `${(passwordStrength === "Weak" ? 20 : passwordStrength === "Good" ? 40 : passwordStrength === "Very Good" ? 60 : 80)}%` }}
                  >
                    {passwordStrength}
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <div className="input-group">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-3">Save Changes</button>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileAccount2;
