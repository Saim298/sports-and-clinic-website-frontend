import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center pt-5 pb-5" style={{backgroundColor:"#e9e9e9"}}>
      <div className="social-icons" style={{ justifyContent: "center" }}>
        <span
          className="social-icon instagram"
          style={{ padding: "11px", borderRadius: ".5rem" }}
        >
          <FaInstagram />
        </span>
        <span
          className="social-icon twitter"
          style={{ padding: "11px", borderRadius: ".5rem" }}
        >
          <FaTwitter />
        </span>
      </div>
      <div className="footer-text mt-3">
        © 2023. All Rights Reserved. Got Next ID Camps, LLC
      </div>
    </footer>
  );
};

export default Footer;
