import React, { useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../assets/spinner.gif";

const HeroSectionAccount = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>Error: {error}</div>
      </div>
    );
  }

  // Ensure user exists before rendering
  if (!user) {
    navigate("/");
  };

  return (
    <div className="account-hero-section container-fluid">
      <div className="account-hero-content">
        <div className="account-profile-circle">
          <span className="account-profile-letter">{user.firstName[0]}</span>
        </div>
        <div className="account-text">
          <span className="account-text-hello">Hello,</span>
          <br />
          <span className="account-text-logged-in">
            You are logged in as{" "}
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </span>
          <br />
          <span className="account-text-member-since">
            Member since <b>{new Date(user.createdAt).toDateString()}</b>
          </span>
        </div>
      </div>
      <div className="account-camera-icon">
        <FaCamera />
      </div>
    </div>
  );
};

export default HeroSectionAccount;
