import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../../config/apiRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const stripePromise = loadStripe(
  "pk_test_51NehF1GdOlJmgDN1ZhjKiQ7T2eCotWN4MqC0X1tYqBSVCzzR5ZFZ7w2aw6MTn73FLjco8gnRdZ30W1tDJgq3d1RM00BCFqGCTu"
);

const EnterEvent = () => {
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [price, setPrice] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [paypalOrderId, setPaypalOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ageGroup, setAgeGroup] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relation: "",
    phone: "",
  });
  const [specialRequirements, setSpecialRequirements] = useState("");
  const { event_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const response = await axios.get(
          `${API_ROUTES.API_GET_EVENT_PAYMENT_PLANS}/${event_id}`
        );
        const { paymentPlans, price } = response.data;
        setPaymentPlans(paymentPlans);
        setPrice(price);
      } catch (error) {
        console.error("Error fetching payment plans:", error);
      }
    };

    fetchPaymentPlans();
  }, [event_id]);

  const user_id = localStorage.getItem("user_id");

  const handlePayment = (paymentMethod) => {
    if (!user_id) {
      navigate("/signup");
      return;
    }

    localStorage.setItem("event_id", event_id);
    localStorage.setItem("paymentMethod", paymentMethod);

    setShowModal(true);
  };

  const handleModalSubmit = async (paymentMethod) => {
    try {
      const registrationData = {
        user: user_id,
        event: event_id,
        ageGroup,
        emergencyContact,
        specialRequirements,
      };

      await axios.post(
        "http://localhost:5000/api/event/registration/event/registrations",
        registrationData
      );

      if (paymentMethod === "stripe") {
        const response = await axios.post(
          "http://localhost:5000/api/event/registration/payment/register",
          {
            userId: user_id,
            eventId: event_id,
            paymentMethod: "stripe",
          }
        );
        const { sessionId } = response.data;
        setSessionId(sessionId);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
      } else if (paymentMethod === "paypal") {
        const response = await axios.post(
          "http://localhost:5000/api/event/registration/payment/register",
          {
            userId: user_id,
            eventId: event_id,
            paymentMethod: "paypal",
          }
        );
        const { paypalOrderId } = response.data;
        setPaypalOrderId(paypalOrderId);
      }
    } catch (error) {
      console.error("Error during registration or payment:", error);
    }
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
            <h1 className="mt-3 mb-4">Payment Plans</h1>
            {price !== null && <h2 className="mt-3 mb-4">Price: ${price}</h2>}
          </div>
          <div className="row text-center">
            {paymentPlans.map((plan, index) => (
              <div
                key={plan._id}
                className={`col-lg-4 col-sm-6 col-xs-12 wow fadeInUp`}
                data-wow-duration="1s"
                data-wow-delay={`${index * 0.1}s`}
                data-wow-offset="0"
              >
                <div className="single-pricing card h-100 border-0 shadow-sm">
                  <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">{plan.name}</h2>
                  </div>
                  <div className="card-body">
                    <h1 className="price">${price}</h1>
                    {/* <h5 className="text-muted">
                      <b>{plan.installments} Installments</b>
                    </h5> */}
                    {/* <ul className="list-unstyled text-start">
                      <li>
                        <i className="bi bi-check-circle-fill text-success"></i>{" "}
                        {plan.interestRate}% Interest
                      </li>
                    </ul> */}
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn stripe-button me-2 mb-2"
                      onClick={() => handlePayment("stripe")}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s"
                        alt="Stripe Logo"
                        className="payment-logo"
                      />
                      Pay with Stripe
                    </button>
                    <button
                      className="btn paypal-button"
                      onClick={() => handlePayment("paypal")}
                    >
                      <img
                        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                        alt="PayPal Logo"
                        className="payment-logo"
                      />
                      Pay with PayPal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: "block", backgroundColor:"#00000066" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Event Registration</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Age Group</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={emergencyContact.name}
                        onChange={(e) =>
                          setEmergencyContact({
                            ...emergencyContact,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Emergency Contact Relation
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={emergencyContact.relation}
                        onChange={(e) =>
                          setEmergencyContact({
                            ...emergencyContact,
                            relation: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={emergencyContact.phone}
                        onChange={(e) =>
                          setEmergencyContact({
                            ...emergencyContact,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Special Requirements</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  
                  <button
                    type="button"
                    className="btn stripe-button me-2 mb-2"
                    onClick={() => {
                      handleModalSubmit("stripe");
                      setShowModal(false);
                    }}
                  >
                     <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s"
                        alt="Stripe Logo"
                        className="payment-logo"
                      />
                    Submit and Pay with Stripe
                  </button>
                  <button
                    type="button"
                    className="btn paypal-button"
                    onClick={() => {
                      handleModalSubmit("paypal");
                      setShowModal(false);
                    }}
                  >
                    <img
                        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                        alt="PayPal Logo"
                        className="payment-logo"
                      />
                    Submit and Pay with PayPal
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default EnterEvent;
