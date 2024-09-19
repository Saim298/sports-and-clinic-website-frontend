import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    const isHomePageOrWomenSoccer =
      location.pathname === "/" || location.pathname === "/women-soccer";

    if (isHomePageOrWomenSoccer) {
      window.addEventListener("scroll", handleScroll);
    } else {
      const navbar = document.getElementById("navbar");
      navbar.classList.remove("scrolled");
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const isHomePageOrWomenSoccer =
    location.pathname === "/" || location.pathname === "/women-soccer";

  return (
    <nav
      id="navbar"
      className={`navbar navbar-expand-lg ${
        isHomePageOrWomenSoccer ? "fixed-top" : "navbar-black"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://gotnextidcamps.com/wp-content/uploads/2024/01/GNID-Logos_Purple-White-Horizonal-1024x364.png"
            style={{ width: "12rem" }}
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/faqs" className="nav-link">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blogs" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/subscribe" className="nav-link">
                Subscribe
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="btn btn-outline-light ms-3"
                role="button"
              >
                Sign In/Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
