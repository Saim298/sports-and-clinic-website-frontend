import React, { useState, useEffect, useRef } from "react";
import { FaFlag, FaUser, FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import axios from "axios";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("camps");
  const [mainPageText, setMainPageText] = useState("");
  const [mainPageDesc, setMainPageDesc] = useState("");

  const h1Ref = useRef(null);
  const h5Ref = useRef(null);
  const tabRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:5000/api/admin-add-media/media")
      .then(response => {
        const data = response.data[0]; // Get the 0th index of the array
        if (data) {
          setMainPageText(data.main_page_main_text);
          setMainPageDesc(data.main_page_para_text);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the media data!", error);
      });

    // GSAP animations
    gsap.fromTo(
      h1Ref.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      h5Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    gsap.fromTo(
      tabRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1 }
    );

    gsap.fromTo(
      cardRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  return (
    <div className="hero-section">
      <h1 ref={h1Ref}>{mainPageText || "Loading..."}</h1>
      <h5 ref={h5Ref}>{mainPageDesc || "Loading description..."}</h5>

      <div className="container mt-5 pt-3">
        <div className="d-flex flex-wrap justify-content-start" ref={tabRef}>
          <div
            className={`tab ${
              activeTab === "camps" ? "active" : ""
            } d-flex align-items-center me-3`}
            onClick={() => setActiveTab("camps")}
          >
            <FaFlag /> <span className="ms-2">Camps</span>
          </div>
          <div
            className={`tab ${
              activeTab === "governing-body" ? "active" : ""
            } d-flex align-items-center me-3`}
            onClick={() => setActiveTab("governing-body")}
          >
            <FaFlag /> <span className="ms-2">Governing Body</span>
          </div>
        </div>

        <div className="card mt-3 pt-4 pb-4" ref={cardRef}>
          {activeTab === "camps" || activeTab === "governing-body" ? (
            <div className="d-flex flex-wrap align-items-center">
              <div className="form-group position-relative flex-fill me-3 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Where to look?"
                />
                <FaUser className="input-icon" />
              </div>

              <div className="form-group position-relative flex-fill me-3 mb-3 mb-md-0">
                <select className="form-control">
                  <option>All categories</option>
                  <option>Soccer</option>
                  <option>Lacrosse</option>
                  <option>Field Hockey</option>
                  <option>Basketball</option>
                  <option>Rowing</option>
                </select>
              </div>

              <div className="form-group position-relative flex-fill me-3 mb-3 mb-md-0">
                <select className="form-control">
                  <option>Any day</option>
                  <option>Today</option>
                  <option>This week</option>
                  <option>This weekend</option>
                  <option>Next week</option>
                  <option>Pick a date</option>
                </select>
              </div>

              <Link className="btn btn-dark flex-fill" to="/explore">
                <FaSearch /> Search
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
