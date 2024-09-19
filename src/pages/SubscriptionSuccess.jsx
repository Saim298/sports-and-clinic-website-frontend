import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SubscriptionSuccess = () => {
  const { session_id, subscriptionId } = useParams(); // Get session_id and subscriptionId from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const updateSubscription = async () => {
      if (session_id && subscriptionId) {
        try {
          const response = await axios.put("http://localhost:5000/api/subscriptions/update-subscription-status", {
            subscriptionId,
            session_id,
          });
          console.log("Subscription status updated:", response.data);

          // Navigate to a success or dashboard page if needed
          navigate("/account/overview"); // Replace with your desired route
        } catch (error) {
          console.error("Error updating subscription status:", error);
        }
      } else {
        console.error("Missing session_id or subscriptionId");
      }
    };

    updateSubscription();
  }, [session_id, subscriptionId, navigate]);

  return (
    <div className="container">
      <h2>Processing Subscription...</h2>
      <p>Please wait while we confirm your subscription.</p>
    </div>
  );
};

export default SubscriptionSuccess;
