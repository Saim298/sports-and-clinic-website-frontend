import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../Sidebar";
import Navbar from "../../../Navbar";

const AllFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [editFaq, setEditFaq] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-add-faqs/faqs");
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin-add-faqs/faq/${id}`);
      setNotification("FAQ deleted successfully");
      fetchFaqs(); // Refresh the list after deletion
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setNotification("Failed to delete FAQ");
    }
  };

  const handleEditFaq = (faq) => {
    setEditFaq(faq);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  const handleUpdateFaq = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin-add-faqs/faq/${editFaq._id}`, {
        question: editQuestion,
        answer: editAnswer,
      });
      setNotification("FAQ updated successfully");
      fetchFaqs(); // Refresh the list after update
      setEditFaq(null);
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error updating FAQ:", error);
      setNotification("Failed to update FAQ");
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
              {notification && (
                <div className="alert alert-info" role="alert">
                  {notification}
                </div>
              )}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">FAQs</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered" width="100%" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq) => (
                          <tr key={faq._id}>
                            <td>{faq._id}</td>
                            <td>
                              {editFaq && editFaq._id === faq._id ? (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editQuestion}
                                  onChange={(e) => setEditQuestion(e.target.value)}
                                />
                              ) : (
                                faq.question
                              )}
                            </td>
                            <td>
                              {editFaq && editFaq._id === faq._id ? (
                                <textarea
                                  className="form-control"
                                  value={editAnswer}
                                  onChange={(e) => setEditAnswer(e.target.value)}
                                ></textarea>
                              ) : (
                                faq.answer
                              )}
                            </td>
                            <td>
                              {editFaq && editFaq._id === faq._id ? (
                                <>
                                  <button className="btn btn-success btn-sm" onClick={handleUpdateFaq}>
                                    Save
                                  </button>{" "}
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setEditFaq(null)}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="btn btn-warning btn-sm" onClick={() => handleEditFaq(faq)}>
                                    Edit
                                  </button>{" "}
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteFaq(faq._id)}
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AllFaqs;
