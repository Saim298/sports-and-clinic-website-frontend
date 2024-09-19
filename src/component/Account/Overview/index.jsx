import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import HeroSectionAccount from "../HeroSectionAccount";
import TabsAccount from "../TabsAccount";
import { useUser } from "../../../context/UserContext";
import Spinner from "../../../assets/spinner.gif";

const Overview = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("userId");

    if (userId) {
      localStorage.setItem("user_id", userId);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!user) {
    window.location.href = "/"
  }

  return (
    <div>
      <Navbar />
      <HeroSectionAccount />
      <div className="bg-light">
        <TabsAccount />
        <div className="account-dashboard-content mt-5 mb-5">
          <h4>Dashboard</h4>
          <p>
            Welcome to our Membership platform. Check for valuable content and
            sign to our Subscriptions.
          </p>
          <p>
            From Membership dashboard you may manage your{" "}
            <strong>Subscriptions</strong>, check{" "}
            <strong>recent payments</strong> or edit your{" "}
            <strong>account details</strong>.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Overview;
