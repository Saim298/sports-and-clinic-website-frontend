import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

const AddEvents = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;
      case 2:
        return <Step2 previousStep={previousStep} nextStep={nextStep} />;
      case 3:
        return <Step3 previousStep={previousStep} handleSubmit={handleSubmit} />;
      default:
        return <Step1 nextStep={nextStep} />;
    }
  };

  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Add Events</h1>
              </div>
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;
