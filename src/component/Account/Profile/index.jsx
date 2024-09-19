import React, { useState, useEffect } from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import HeroSectionAccount from "../HeroSectionAccount";
import TabsAccount from "../TabsAccount";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../../../context/UserContext";
import Spinner from "../../../assets/spinner.gif";
import { updateUserProfile, updateUserPassword } from './API'; // Adjust the import path as needed
import { toast } from 'react-toastify'; // Ensure react-toastify is installed and set up

const Profile = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, loading, error } = useUser();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setContactNo(user.contactNumber);
    }
  }, [user]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

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

  const handleProfileUpdate = async () => {
    try {
      await updateUserProfile(user._id, { email, firstName, lastName, contactNo });
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    try {
      await updateUserPassword(user._id, { oldPassword: currentPassword, newPassword });
      toast.success('Password updated successfully.');
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSectionAccount />
      <div className="bg-light">
        <TabsAccount />
        <div className="account-dashboard-content mt-5 mb-5 container">
          <h4>Edit your account</h4>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Contact No.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </div>
              <button className="btn btn-primary mt-3 mb-3" onClick={handleProfileUpdate}>
                Save Changes
              </button>
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
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn"
                      type="button"
                      onClick={() =>
                        setCurrentPasswordVisible(!currentPasswordVisible)
                      }
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
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      handlePasswordChange(e);
                    }}
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
                    style={{
                      width: `${
                        passwordStrength === "Weak"
                          ? 20
                          : passwordStrength === "Good"
                          ? 40
                          : passwordStrength === "Very Good"
                          ? 60
                          : 80
                      }%`,
                    }}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn"
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
              <button className="btn btn-primary mt-3" onClick={handlePasswordUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
