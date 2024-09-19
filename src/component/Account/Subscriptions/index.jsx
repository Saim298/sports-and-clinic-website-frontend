import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";

const Subscribe = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("monthly"); // Default to monthly
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/plan/plans"
        );
        console.log("Fetched plans:", response.data);
        if (Array.isArray(response.data)) {
          setPlans(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Error fetching plans");
        }
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        setError("Error fetching plans");
      }
    };

    fetchPlans();
  }, []);

  const handleSubscription = async () => {
    setLoading(true);
    setError(null);
    localStorage.setItem("subscriptionId",selectedPlan);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subscriptions/subscribe",
        {
          userId: localStorage.getItem("user_id"),
          planId: selectedPlan,
          duration: selectedDuration, // Include duration in the subscription request
          promoCode,
          paymentMethod: "stripe", // Default to Stripe
        }
      );

      if (response.data.sessionId) {
        const stripe = await window.Stripe(
          "pk_test_51NehF1GdOlJmgDN1ZhjKiQ7T2eCotWN4MqC0X1tYqBSVCzzR5ZFZ7w2aw6MTn73FLjco8gnRdZ30W1tDJgq3d1RM00BCFqGCTu"
        );
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else if (response.data.approvalUrl) {
        window.location.href = response.data.approvalUrl;
      }
    } catch (error) {
      console.error("Error processing subscription:", error);
      setError(
        "There was an error processing your subscription. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (planId) => {
    setSelectedPlan(planId);
    setPromoCode("");
    setSelectedDuration("monthly"); // Reset duration to default monthly
    const modal = new window.bootstrap.Modal(
      document.getElementById("paymentModal")
    );
    modal.show();
  };

  return (
    <>
      <Navbar />
      <section
        id="pricing"
        className="pricing-content section-padding pt-5 pb-5 bg-light"
      >
        <div className="container">
          <div className="section-title text-center">
            <h1 className="mt-3 mb-4">Subscribers</h1>
          </div>
          <div className="row text-center">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${index * 0.1}s`}
                data-wow-offset="0"
              >
                <div
                  className={`single-pricing ${
                    index === 2 ? "single-pricing-white" : ""
                  }`}
                >
                  <div className="price-head">
                    <h2>{plan.title}</h2>
                  </div>
                  <h1 className="price">${plan.price[selectedDuration]}</h1>{" "}
                  {/* Show price based on selected duration */}
                  <h5>{plan.subHeading}</h5>
                  <ul className="list-unstyled text-start">
                    {plan.points &&
                      Array.isArray(plan.points) &&
                      plan.points.map((feature, i) => (
                        <li key={i}>
                          <i className="bi bi-check-circle"></i> {feature}
                        </li>
                      ))}
                  </ul>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(plan._id);
                    }}
                    className="btn"
                    disabled={loading}
                  >
                    Get started
                  </button>
                </div>
              </div>
            ))}
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="paymentModalLabel">
                Enter Promo Code and Confirm Subscription
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="promoCodeInput" className="form-label">
                  Promo Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="promoCodeInput"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Duration</label>
                <select
                  className="form-select"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubscription}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Subscribe;
