import React from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";

import HeroSectionAccount from "../HeroSectionAccount";
import TabsAccount from "../TabsAccount";

const SocialPlus = () => {
  return (
    <div>
      <Navbar />
      <HeroSectionAccount />
      <div className="bg-light">
        <TabsAccount />
        <div className="account-dashboard-content mt-5 mb-5">
          {/* content goes here */}
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default SocialPlus;
