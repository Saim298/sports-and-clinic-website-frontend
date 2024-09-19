import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEvent } from "../../context/EventContextByID";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Tabs = () => {
  const { event_id } = useParams();
  const { event, fetchEventById, loading, error } = useEvent();
  const [activeTab, setActiveTab] = useState("details");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    if (event_id) {
      fetchEventById(event_id);
    }
  }, [event_id]);

  useEffect(() => {
    // Fetch subscription status
    const fetchSubscriptionStatus = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }

        const response = await axios.post(
          "http://localhost:5000/api/subscriptions/check-subscription",
          { userId }
        );

        if (response.status === 200) {
          setSubscriptionStatus(response.data);
        } else {
          throw new Error("Failed to fetch subscription status");
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        toast.error("Error fetching subscription status");
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddReview = () => {
    const user_id = localStorage.getItem("user_id");

    const reviewData = {
      eventId: event_id,
      userId: user_id,
      rating,
      review: reviewText,
    };

    fetch(
      "http://localhost:5000/api/event/registration/creation/events/review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Review added successfully!");
          setReviewText("");
          setRating(0);
          fetchEventById(event_id);
        } else {
          toast.error("Failed to add review.");
        }
      })
      .catch((error) => {
        console.error("Error adding review:", error);
        toast.error("An error occurred.");
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          className={`tab text-black ${
            activeTab === "details" ? "active" : ""
          }`}
          onClick={() => handleTabClick("details")}
        >
          Details
        </div>
        <div
          className={`tab text-black ${
            activeTab === "reviews" ? "active" : ""
          }`}
          onClick={() => handleTabClick("reviews")}
        >
          {subscriptionStatus.plan.canLeaveReviews ? "Reviews " : ""}
        </div>
      </div>
      <div className="tab-content" style={{ width: "100%" }}>
        {activeTab === "details" && (
          <div className="card-bg-color pt-4 pb-4">
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title text-dark">Description</h5>
                      <p
                        className="card-text text-sm"
                        style={{ fontSize: "12px" }}
                      >
                        {event.description || "No description available."}
                      </p>
                    </div>
                  </div>
                  {subscriptionStatus.plan.exclusiveContent ? (
                    <>
                      {event.media && event.media.images.length > 0 && (
                        <div className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title text-dark">Media</h5>
                            <div className="row">
                              {event.media.images.map((image, index) => (
                                <div
                                  className="col-md-6 col-lg-6 mb-4"
                                  key={index}
                                >
                                  <div
                                    className="card"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleImageClick(image)}
                                  >
                                    <img
                                      src={image}
                                      alt={`Event ${index}`}
                                      className="card-img-top"
                                      style={{
                                        height: "150px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {subscriptionStatus.plan.exclusiveContent ? (
                    <>
                      {event.media && event.media.videos.length > 0 && (
                        <div className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title text-dark">Videos</h5>
                            {event.media.videos.map((video, index) => (
                              <div key={index} className="mb-3">
                                <video controls className="w-100">
                                  <source src={video} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="col-md-6">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title text-dark">Location</h5>
                      <div
                        className="mb-3"
                        style={{ height: "200px", backgroundColor: "#f7f7f7" }}
                      >
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <FaMapMarkerAlt className="text-muted" size={48} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0" style={{ fontSize: "12px" }}>
                          {event.location.address}
                        </p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${event.location.coordinates[0]},${event.location.coordinates[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>

                  {event.coachProfiles.length > 0 && (
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title text-dark">
                          Coaches Profiles
                        </h5>
                        {event.coachProfiles.map((coach) => (
                          <div
                            className="d-flex align-items-center mt-3"
                            key={coach._id}
                          >
                            <img
                              src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                              alt={`Coach ${coach.name}`}
                              className="rounded-circle me-3"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <div>
                              <p className="mb-0">{coach.name}</p>
                              <small className="text-muted">{coach.bio}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {event.socialNetworks &&
                    Object.keys(event.socialNetworks).length > 0 && (
                      <div className="card mb-4">
                        <div className="card-body">
                          <h5 className="card-title text-dark">Social Media</h5>
                          <div className="d-flex flex-wrap justify-content-start">
                            {event.socialNetworks.instagram && (
                              <a
                                href={event.socialNetworks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="women-social-icon instagram"
                              >
                                <FaInstagram />
                              </a>
                            )}
                            {event.socialNetworks.x && (
                              <a
                                href={event.socialNetworks.x}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="women-social-icon twitter"
                              >
                                <FaTwitter />
                              </a>
                            )}
                            {event.socialNetworks.facebook && (
                              <a
                                href={event.socialNetworks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="women-social-icon facebook"
                              >
                                <FaFacebookF />
                              </a>
                            )}
                            {event.socialNetworks.threads && (
                              <a
                                href={event.socialNetworks.threads}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="women-social-icon threads"
                              >
                                <FaInstagram />
                              </a>
                            )}
                            {!event.socialNetworks.instagram &&
                              !event.socialNetworks.x &&
                              !event.socialNetworks.facebook &&
                              !event.socialNetworks.threads && (
                                <p className="text-muted">
                                  No social media accounts found.
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    )}

                  {event.tags && event.tags.length > 0 && (
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title text-dark">Tags</h5>
                        <div className="d-flex flex-wrap">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary me-2 mb-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {event.tags.length === 0 && (
                          <p className="text-muted">No tags available.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for image preview */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Body>
            <img src={selectedImage} alt="Selected" className="img-fluid" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {activeTab === "reviews" && (
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold">Reviews</h5>
              <button
                className="btn btn-primary rounded-pill shadow"
                data-bs-toggle="modal"
                data-bs-target="#addReviewModal"
              >
                Add Review
              </button>
            </div>
            {event.reviews.length > 0 ? (
              event.reviews.map((review, index) => (
                <div
                  key={index}
                  className="review-card mb-4 p-3 border rounded shadow-sm"
                >
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex">
                      <h6 className="mb-0" style={{ color: "#808080" }}>
                        Username:{" "}
                      </h6>
                      <h6 className="mb-0 fw-semibold"> {review.userName}</h6>
                    </div>{" "}
                    {/* Reviewer’s name */}
                    <div className="text-warning">
                      {"⭐".repeat(review.rating)} {/* Star rating */}
                    </div>
                  </div>
                  <p className="mb-1">{review.review}</p> {/* Review text */}
                </div>
              ))
            ) : (
              <div className="text-center text-muted">
                No reviews available.
              </div>
            )}
          </div>
        )}
      </div>
      {/* Bootstrap Modal for Adding Review */}
      <div
        className="modal fade"
        id="addReviewModal"
        tabIndex="-1"
        aria-labelledby="addReviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addReviewModalLabel">
                Add Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="reviewText" className="form-label">
                  Review
                </label>
                <textarea
                  className="form-control"
                  id="reviewText"
                  rows="3"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <div id="rating">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <span
                        key={index}
                        className={`star ${
                          index <= (hover || rating) ? "on" : "off"
                        }`}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color:
                            index <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                        }}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
