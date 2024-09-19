import React, { useEffect, useRef } from 'react';
import { FaBasketballBall, FaFootballBall, FaSwimmer, FaBaseballBall } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manBasketBall from "../../assets/basket-ball.webp";
import rugby from "../../assets/rugby.jpg";
import swiming from "../../assets/swiming.jpeg";
import baseball from "../../assets/baseball.jpeg";

gsap.registerPlugin(ScrollTrigger);

const FeaturedOpportunities = () => {
  const refs = useRef([]);
  refs.current = [];

  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    const headings = refs.current.slice(0, 2); // First two elements are the headings
    const cards = refs.current.slice(2); // The rest are the cards

    gsap.fromTo(headings[0], 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, scrollTrigger: {
        trigger: headings[0],
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    gsap.fromTo(headings[1], 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, scrollTrigger: {
        trigger: headings[1],
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    cards.forEach((card, index) => {
      gsap.fromTo(card, 
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div>
      <div className="text-center mt-5">
        <h5 ref={addToRefs}>Recommended Camps</h5>
        <h3 className="text-muted mb-4 fw-bold" ref={addToRefs}>
          Check out these Featured Opportunities
        </h3>

        <div className="container" style={{ overflow: "hidden" }}>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
              <div
                className="card bg-dark text-white custom-card"
                style={{ backgroundImage: `url(${manBasketBall})` }}
              >
                <div className="overlay overlay-2">
                  <FaBasketballBall size={32} />
                  <div className="mt-2 filterFontSize">Basketball</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
              <div
                className="card bg-dark text-white custom-card"
                style={{ backgroundImage: `url(${rugby})` }}
              >
                <div className="overlay overlay-2">
                  <FaFootballBall size={32} />
                  <div className="mt-2 filterFontSize">Football</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
              <div
                className="card bg-dark text-white custom-card"
                style={{ backgroundImage: `url(${swiming})` }}
              >
                <div className="overlay overlay-2">
                  <FaSwimmer size={32} />
                  <div className="mt-2 filterFontSize">Swimming</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
              <div
                className="card bg-dark text-white custom-card"
                style={{ backgroundImage: `url(${baseball})` }}
              >
                <div className="overlay overlay-2">
                  <FaBaseballBall size={32} />
                  <div className="mt-2 filterFontSize">Baseball</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedOpportunities;
