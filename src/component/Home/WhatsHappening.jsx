import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatsHappening = () => {
  const [events, setEvents] = useState([]);
  const refs = useRef([]);
  refs.current = [];
  const navigate = useNavigate(); // Hook for navigation

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    // Fetch latest events
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/event/registration/creation/latest-events"
        );
        const data = await response.json();
        setEvents(data.slice(0, 3)); // Take only the latest 3 events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const headings = refs.current.slice(0, 2); // First two elements are the headings
    const cards = refs.current.slice(2); // The rest are the cards

    gsap.fromTo(
      headings[0],
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headings[0],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      headings[1],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headings[1],
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [events]);

  const handleCardClick = async (eventId) => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      navigate("/signup");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/subscriptions/check-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();

      if (data.subscribed) {
        navigate(`/women-soccer/${eventId}`);
      } else {
        navigate("/subscribe");
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      navigate("/signup"); // Redirect to signup on error
    }
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h5 ref={addToRefs}>What's happening?</h5>
        <h3 className="text-muted mb-4 fw-bold" ref={addToRefs}>
          Discover events throughout the city
        </h3>
        <div className="container">
          <div className="row">
            {events.map((event) => (
              <div
                key={event._id}
                className="col-12 col-md-4 mb-4"
                ref={addToRefs}
              >
                <div
                  className="card text-white custom-card"
                  style={{
                    backgroundImage: `url(${
                      event.media.images[1] || event.media.images[0]
                    })`, // Use the second image or fallback to the first
                  }}
                  onClick={() => handleCardClick(event._id)}
                >
                  <div className="overlay overlay-3">
                    <span className="event-date">
                      {new Date(event.date).toLocaleDateString()} {event.time}
                    </span>
                    <div className="d-flex align-items-center mt-3">
                      <div className="col-3">
                        <img
                          src={event.media.images[0]} // Use the first image as the logo
                          alt="Event Logo"
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <div className="col-9 d-flex flex-column ">
                        <div className="event-title">{event.title}</div>
                        <div className="event-details">
                          {event.category} <br />
                          {/* Price: ${event.price} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
