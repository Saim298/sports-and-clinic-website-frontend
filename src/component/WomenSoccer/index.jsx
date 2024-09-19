import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { FaHeart, FaLink } from "react-icons/fa";
import { gsap } from "gsap";
import { useEvent } from "../../context/EventContextByID";
import { useParams } from "react-router-dom";
import Spinner from "../../assets/spinner.gif";
import axios from "axios";
import { toast } from "react-toastify";

const WomenSoccer = () => {
  const { event_id } = useParams();
  const { event, fetchEventById, loading, error } = useEvent();

  const [activeTab, setActiveTab] = useState("details");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const imgRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const tabRef = useRef(null);

  useEffect(() => {
    // Fetch event only if event_id changes
    if (event_id) {
      fetchEventById(event_id);
    }
  }, [event_id]);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      imgRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    gsap.fromTo(
      btnRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1 }
    );

    gsap.fromTo(
      tabRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  useEffect(() => {
    // Fetch subscription status and bookmarked events
    const fetchInitialData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }

        // Fetch subscription status
        const subscriptionResponse = await axios.post(
          "http://localhost:5000/api/subscriptions/check-subscription",
          { userId }
        );

        if (subscriptionResponse.status === 200) {
          const subscription = subscriptionResponse.data;
          setSubscriptionStatus(subscription);

          // Check if bookmarking is allowed
          if (subscription.plan.exportBookmarks) {
            // Fetch bookmarked events
            const bookmarkResponse = await axios.get(
              `http://localhost:5000/api/event/registration/creation/bookmarked-events/${userId}`
            );

            if (bookmarkResponse.status === 200) {
              const bookmarkedEvents = bookmarkResponse.data;
              const isEventBookmarked = bookmarkedEvents.some(
                (event) => event.event_id === event_id
              );
              setIsBookmarked(isEventBookmarked);
            }
          }
        } else {
          throw new Error("Failed to fetch subscription status");
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Error fetching initial data");
      }
    };

    fetchInitialData();
  }, [event_id]);

  const handleBookmark = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await axios.post(
        "http://localhost:5000/api/event/registration/creation/bookmark",
        { userId, event_id }
      );

      if (response.status === 200) {
        setIsBookmarked(true);
        toast.success("Event bookmarked successfully");
      } else {
        throw new Error("Failed to bookmark event");
      }
    } catch (error) {
      console.error("Error bookmarking event:", error);
      toast.error("Error bookmarking event");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event details available</div>;

  return (
    <div
      className="women-soccer"
      style={{
        background: `url('${
          event.media.images[1] || event.media.images[0]
        }') no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="container content">
        <div className="overlayWomenSc row align-items-end">
          <div
            className="content-left col-md-6 d-flex align-items-end"
            ref={imgRef}
          >
            <div className="d-flex">
              <img
                src={event.media.images[0]}
                alt="Event"
                className="uab-logo"
              />
              <div className="text text-1" ref={textRef}>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
              </div>
            </div>
          </div>
          <div
            className="content-right col-md-6 d-flex justify-content-md-end justify-content-center align-items-end"
            ref={btnRef}
          >
            <div className="d-flex">
              <button
                className="btn btn-dark mb-3 me-2"
                onClick={handleBookmark}
                disabled={
                  isBookmarked || !subscriptionStatus?.plan.exportBookmarks
                }
              >
                <FaHeart className="icon" />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
              <a
                href={event.athleticsInfo.campWebsite}
                className="btn btn-dark mb-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="icon" /> Website
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default WomenSoccer;
