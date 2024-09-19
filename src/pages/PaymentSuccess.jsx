import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../assets/spinner.gif";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve event_id, paymentMethod, and user_id from localStorage
    const eventId = localStorage.getItem("event_id");
    const paymentMethod = localStorage.getItem("paymentMethod");
    const userId = localStorage.getItem("user_id");

    // Check if all required data is available
    if (eventId && paymentMethod && userId) {
      // Make the POST request to confirm the payment
      axios
        .post(
          "http://localhost:5000/api/event/registration/payment/confirm-payment",
          {
            userId,
            eventId,
            paymentMethod,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // Redirect the user to /account/overview if the payment is successfully confirmed
            navigate("/account/overview");
          } else {
            // Handle cases where the payment is not confirmed or other errors occur
            console.error(response.data.error);
            // Optionally, you can navigate to an error page or display an error message
          }
        })
        .catch((error) => {
          console.error("Failed to confirm payment:", error);
          // Optionally, you can navigate to an error page or display an error message
        });
    } else {
      console.error("Missing required information");
      // Optionally, you can navigate to an error page or display an error message
    }
  }, [navigate]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    </div>
  );
};

export default PaymentSuccess;
