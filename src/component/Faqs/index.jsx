import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const faqRefs = useRef([]);
  faqRefs.current = [];

  const headingRefs = useRef([]);
  headingRefs.current = [];

  const addToRefs = el => {
    if (el && !faqRefs.current.includes(el)) {
      faqRefs.current.push(el);
    }
  };

  const addHeadingToRefs = el => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin-add-faqs/faqs");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  useEffect(() => {
    const [headingOne, headingTwo, headingThree] = headingRefs.current;
    const faqElements = faqRefs.current;

    gsap.fromTo(headingOne, 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, scrollTrigger: {
        trigger: headingOne,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    gsap.fromTo(headingTwo, 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, scrollTrigger: {
        trigger: headingTwo,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    gsap.fromTo(headingThree, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, scrollTrigger: {
        trigger: headingThree,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    faqElements.forEach((faq, index) => {
      gsap.fromTo(faq, 
        { x: -100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, scrollTrigger: {
          trigger: faq,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    });
  }, [faqs]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container my-5 flex-grow-1">
        <div className="text-center mb-4">
          <h1 className="mb-3" ref={addHeadingToRefs}>Frequently Asked Questions</h1>
          <h4 className="text-muted" ref={addHeadingToRefs}>Most frequently asked questions</h4>
        </div>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item border-0 rounded-3 shadow-sm mb-3" ref={addToRefs} key={faq._id}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button custom-accordion-button text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0}
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Faqs;
