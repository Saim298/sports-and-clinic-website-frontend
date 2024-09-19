import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { toast } from "react-toastify";
import Navbar from "../../Navbar";

const Faqs = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleAddFaq = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin-add-faqs/faq", {
        question,
        answer,
      });
      toast.success("Faq added successfully")

      setNotification("FAQ added successfully");
      setQuestion("");
      setAnswer("");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setNotification("Failed to add FAQ");
    }
  };

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
          <Navbar/>

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Add FAQs</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Add FAQ
                      </h6>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/admin-all-faqs")}
                      >
                        Show FAQs
                      </button>
                    </div>
                    <div className="card-body">
                      {notification && (
                        <div className="alert alert-info" role="alert">
                          {notification}
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="question" className="form-label">
                          Question
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="answer" className="form-label">
                          Answer
                        </label>
                        <textarea
                          className="form-control"
                          id="answer"
                          rows="3"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={handleAddFaq}
                      >
                        Add FAQ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
