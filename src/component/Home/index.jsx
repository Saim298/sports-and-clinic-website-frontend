import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FilterByCategory from "./FilterByCategory";
import FeaturedOpportunities from "./FeaturedOppurtunities";
import WhatsHappening from "./WhatsHappening";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import Footer from "./Footer";
import axios from "axios";

const Home = () => {
  const [mainPageText, setMainPageText] = useState("");
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5000/api/admin-add-media/media")
      .then((response) => {
        const data = response.data[0]; // Get the 0th index of the array
        if (data) {
          setMainPageText(data.main_page_image);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the media data!", error);
      });
  });
  return (
    <div>
      <Navbar />
      <div className="banner"  style={{
          position: "relative",
          backgroundImage: `url(${mainPageText})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}>
        {/* Banner content here */}
        <div className="banner-overlay"></div>
        <HeroSection />
      </div>
      <FilterByCategory />
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <div className="mt-5 mb-5">
        <FeaturedOpportunities />
      </div>
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <div className="mt-5 mb-5">
        <WhatsHappening />
      </div>
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
