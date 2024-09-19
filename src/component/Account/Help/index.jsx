import React from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";

import HeroSectionAccount from "../HeroSectionAccount";
import TabsAccount from "../TabsAccount";

const Help = () => {
  return (
    <div>
      <Navbar />
      <HeroSectionAccount />
      <div className="bg-light">
        <TabsAccount />
        <div className="account-dashboard-content mt-5 mb-5">
          <h4>Help </h4>
          <p>
            If you have any questions or need help, please do not hesitate to
            contact us.
          </p>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Help;
