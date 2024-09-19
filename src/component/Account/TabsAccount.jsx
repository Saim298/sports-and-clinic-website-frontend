import React from "react";
import {
  FaHome,
  FaUser,
  FaList,
  FaComments,
  FaMoneyCheckAlt,
  FaQuestion,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";


const TabsAccount = () => {
  const location = useLocation();

  const tabs = [
    { path: "/account/overview", icon: <FaHome />, label: "Dashboard" },
    { path: "/account/profile", icon: <FaUser />, label: "Profile Details" },
    { path: "/account/subscriptions", icon: <FaList />, label: "Subscriptions" },
    // { path: "/account/social-plus", icon: <FaComments />, label: "Social Plus" },
    { path: "/account/payments", icon: <FaMoneyCheckAlt />, label: "Payments" },
    { path: "/account/help", icon: <FaQuestion />, label: "Help" },
    { path: "/", icon: <FaSignOutAlt />, label: "Logout" },
  ];

  return (
    <div>
      <div className="account-tabs" style={{ overflowX: "auto" }}>
        {tabs.map((tab) => (
          <Link to={tab.path} key={tab.path} className={`account-tab ${location.pathname === tab.path ? "account-tab-active" : ""}`}>
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TabsAccount;
