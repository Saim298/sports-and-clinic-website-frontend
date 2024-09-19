import React, { useEffect, useRef } from 'react';
import { FaMapMarkedAlt, FaFutbol, FaBasketballBall, FaFootballBall, FaSwimmer, FaBaseballBall, FaHockeyPuck, FaQuoteRight, FaListUl } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import flightImage from "../../assets/flight-image.jpg";
import womenFootball from "../../assets/women-footbal.webp";
import manBasketBall from "../../assets/basket-ball.webp";
import rugby from "../../assets/rugby.jpg";
import swiming from "../../assets/swiming.jpeg";
import baseball from "../../assets/baseball.jpeg";
import fieldHockey from "../../assets/fieldHockey.jpeg";
import football from "../../assets/football.jpg";

gsap.registerPlugin(ScrollTrigger);

const FilterByCategory = () => {
  const refs = useRef([]);
  refs.current = [];

  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: refs.current[0].parentElement, // use parent element of the first card to trigger
        start: "top 80%", // animation will start when top of the element is at 80% of the viewport height
        end: "bottom 20%", // animation will end when bottom of the element is at 20% of the viewport height
        toggleActions: "play none none none", // play animation on scroll, no action on leave
      }
    });

    tl.fromTo(refs.current[0], { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 })
      .fromTo(refs.current[1], { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[2], { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[3], { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[4], { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[5], { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[6], { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[7], { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[8], { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5")
      .fromTo(refs.current[9], { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5 }, "-=1.5");
  }, []);

  return (
    <div className="text-center mt-5">
      <h5 className="">Explore Our Camps and Activities</h5>
      <h3 className="text-muted mb-4 fw-bold">Filter By Category</h3>
      
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${flightImage})` }}>
              <div className="overlay overlay-1">
                <FaMapMarkedAlt size={32} />
                <div className="mt-2 filterFontSize">Explore Camps</div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-6 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${womenFootball})` }}>
              <div className="overlay overlay-2">
                <FaFutbol size={32} />
                <div className="mt-2 filterFontSize">Soccer</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${manBasketBall})` }}>
              <div className="overlay overlay-2">
                <FaBasketballBall size={32} />
                <div className="mt-2 filterFontSize">Basketball</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${rugby})` }}>
              <div className="overlay overlay-2">
                <FaFootballBall size={32} />
                <div className="mt-2 filterFontSize">Football</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${swiming})` }}>
              <div className="overlay overlay-2">
                <FaSwimmer size={32} />
                <div className="mt-2 filterFontSize">Swimming</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${baseball})` }}>
              <div className="overlay overlay-2">
                <FaBaseballBall size={32} />
                <div className="mt-2 filterFontSize">Baseball</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${fieldHockey})` }}>
              <div className="overlay overlay-2">
                <FaHockeyPuck size={32} />
                <div className="mt-2 filterFontSize">Field Hockey</div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 col-lg-3 mb-4" ref={addToRefs}>
            <div className="card bg-light text-dark custom-card" style={{ backgroundColor: '#f4f4f4' }}>
              <div className="overlay text-dark container">
                <FaQuoteRight size={32} />
                <div className="mt-2 filterFontSize">
                  To see a World in a Grain of Sand And a Heaven in a Wild Flower Hold Infinity in the palm of your hand And Eternity in an hour
                </div>
                <div className="mt-2 text-muted">
                  William Blake
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 col-lg-6 mb-4" ref={addToRefs}>
            <div className="card bg-dark text-white custom-card" style={{ backgroundImage: `url(${football})` }}>
              <div className="overlay overlay-1">
                <FaListUl size={32} />
                <div className="mt-2 filterFontSize">Discover Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;
