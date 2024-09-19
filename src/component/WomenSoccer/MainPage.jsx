import React from "react";
import WomenSoccer from ".";
import Footer from "../Home/Footer";
import Tabs from "./Tabs";
import Navbar from "../Home/Navbar";

const MainPage = () => {
  return (
    <div>
      <Navbar />

      <WomenSoccer />
      <Tabs />
      <Footer />
    </div>
  );
};

export default MainPage;
