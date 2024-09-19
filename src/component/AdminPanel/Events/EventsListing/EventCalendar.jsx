import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Papa from "papaparse"; // Import PapaParse
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/event/registration/creation/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    window.$("#eventModal").modal("show");
  };

  const closeModal = () => {
    setSelectedEvent(null);
    window.$("#eventModal").modal("hide");
  };

  const formatEvents = () => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.date),
      end: event.recurring?.endDate
        ? new Date(event.recurring.endDate)
        : new Date(event.date),
      title: event.title,
    }));
  };

  // Function to export event data as CSV using PapaParse
  const exportToCSV = () => {
    const csvData = events.map((event) => ({
      Title: event.title,
      Description: event.description,
      Date: event.date,
      Time: event.time,
      EndDate:event.endDate || event.recurring?.endDate,
      Location: event.location?.address || "N/A",
      GoverningBody: event.athleticsInfo?.governingBody || "N/A",
      Division: event.athleticsInfo?.division || "N/A",
      Conference: event.athleticsInfo?.conference || "N/A",
      CampWebsite: event.athleticsInfo?.campWebsite || "N/A",
      Instagram: event.socialNetworks?.instagram || "N/A",
      X: event.socialNetworks?.x || "N/A",
      Facebook: event.socialNetworks?.facebook || "N/A",
      Threads: event.socialNetworks?.threads || "N/A",
    }));

    const csv = Papa.unparse(csvData); // Converts JSON to CSV format

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-4">
      <h2>Events Calendar</h2>
      <button
        className="btn btn-success mb-4"
        onClick={() => {
          exportToCSV();
          alert("Download started!");
        }}
      >
        Download CSV
      </button>

      <Calendar
        localizer={localizer}
        events={formatEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginBottom: "50px" }}
        onSelectEvent={openModal}
      />

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="eventModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="eventModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="eventModalLabel">
                {selectedEvent ? selectedEvent.title : "Event Details"}
              </h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedEvent ? (
                <div>
                  {/* Description */}
                  <section className="mb-4">
                    <h6>Description</h6>
                    <p>{selectedEvent.description}</p>
                  </section>

                  {/* Date and Time */}
                  <section className="mb-4">
                    <h6>Date & Time</h6>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                    {selectedEvent.recurring?.isRecurring && (
                      <p>
                        <strong>Recurring Until:</strong>{" "}
                        {new Date(
                          selectedEvent.recurring.endDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                    <p>
                      <strong>Time:</strong> {selectedEvent.time}
                    </p>
                  </section>

                  {/* Location */}
                  <section className="mb-4">
                    <h6>Location</h6>
                    <p>
                      <strong>Address:</strong>{" "}
                      {selectedEvent.location?.address || "N/A"}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${
                            selectedEvent.location?.coordinates?.[1] || 0
                          },${selectedEvent.location?.coordinates?.[0] || 0}`,
                          "_blank"
                        )
                      }
                    >
                      Get Directions
                    </button>
                  </section>

                  {/* Athletics Information */}
                  {selectedEvent.athleticsInfo && (
                    <section className="mb-4">
                      <h6>Athletics Information</h6>
                      <p>
                        <strong>Governing Body:</strong>{" "}
                        {selectedEvent.athleticsInfo.governingBody}
                      </p>
                      <p>
                        <strong>Division:</strong>{" "}
                        {selectedEvent.athleticsInfo.division}
                      </p>
                      <p>
                        <strong>Conference:</strong>{" "}
                        {selectedEvent.athleticsInfo.conference}
                      </p>
                      <p>
                        <strong>Camp Website:</strong>{" "}
                        <a
                          href={selectedEvent.athleticsInfo.campWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedEvent.athleticsInfo.campWebsite}
                        </a>
                      </p>
                      <p>
                        <strong>Recruiting Questionnaire:</strong>{" "}
                        {selectedEvent.athleticsInfo.recruitingQuestionnaire}
                      </p>
                    </section>
                  )}

                  {/* Social Networks */}
                  {selectedEvent.socialNetworks && (
                    <section className="mb-4">
                      <h6>Social Networks</h6>
                      <ul>
                        {selectedEvent.socialNetworks.instagram && (
                          <li>
                            <a
                              href={selectedEvent.socialNetworks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Instagram
                            </a>
                          </li>
                        )}
                        {selectedEvent.socialNetworks.x && (
                          <li>
                            <a
                              href={selectedEvent.socialNetworks.x}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              X (formerly Twitter)
                            </a>
                          </li>
                        )}
                        {selectedEvent.socialNetworks.facebook && (
                          <li>
                            <a
                              href={selectedEvent.socialNetworks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Facebook
                            </a>
                          </li>
                        )}
                        {selectedEvent.socialNetworks.threads && (
                          <li>
                            <a
                              href={selectedEvent.socialNetworks.threads}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Threads
                            </a>
                          </li>
                        )}
                      </ul>
                    </section>
                  )}

                  {/* Media */}
                  {selectedEvent.media &&
                    (selectedEvent.media.images.length > 0 ||
                      selectedEvent.media.videos.length > 0) && (
                      <section className="mb-4">
                        <h6>Media</h6>
                        {/* Images */}
                        {selectedEvent.media.images.length > 0 && (
                          <div className="mb-3">
                            <h6>Images</h6>
                            <div className="d-flex flex-wrap">
                              {selectedEvent.media.images.map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`Event Image ${index + 1}`}
                                  className="img-thumbnail m-2"
                                  style={{ width: "150px", height: "auto" }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Videos */}
                        {selectedEvent.media.videos.length > 0 && (
                          <div>
                            <h6>Videos</h6>
                            <div className="d-flex flex-wrap">
                              {selectedEvent.media.videos.map(
                                (video, index) => (
                                  <video
                                    key={index}
                                    controls
                                    className="m-2"
                                    style={{ width: "300px", height: "auto" }}
                                  >
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </section>
                    )}

                  {/* Coach Profiles */}
                  {selectedEvent.coachProfiles &&
                    selectedEvent.coachProfiles.length > 0 && (
                      <section className="mb-4">
                        <h6>Coaches</h6>
                        <ul>
                          {selectedEvent.coachProfiles.map((coach) => (
                            <li key={coach._id} className="mb-2">
                              <p>
                                <strong>Name:</strong> {coach.name}
                              </p>
                              <p>
                                <strong>Bio:</strong> {coach.bio}
                              </p>
                              <p>
                                <strong>Experience:</strong>{" "}
                                {coach.experience || "N/A"} years
                              </p>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                  {/* Reviews */}
                  {selectedEvent.reviews &&
                    selectedEvent.reviews.length > 0 && (
                      <section className="mb-4">
                        <h6>Reviews</h6>
                        <ul>
                          {selectedEvent.reviews.map((review) => (
                            <li key={review._id} className="mb-2">
                              <p>
                                <strong>User ID:</strong> {review.user}
                              </p>
                              <p>
                                <strong>Review:</strong> {review.review}
                              </p>
                              <p>
                                <strong>Rating:</strong> {review.rating} / 5
                              </p>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                  {/* Age Groups */}
                  {selectedEvent.ageGroups &&
                    selectedEvent.ageGroups.length > 0 && (
                      <section className="mb-4">
                        <h6>Age Groups</h6>
                        <ul>
                          {selectedEvent.ageGroups.map((ageGroup) => (
                            <li key={ageGroup._id}>
                              <p>
                                <strong>Age Group:</strong> {ageGroup.ageGroup}
                              </p>
                              <p>
                                <strong>Max Participants:</strong>{" "}
                                {ageGroup.maxParticipants}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                  {/* Promo Codes */}
                  {selectedEvent.promoCodes &&
                    selectedEvent.promoCodes.length > 0 && (
                      <section className="mb-4">
                        <h6>Promo Codes</h6>
                        <ul>
                          {selectedEvent.promoCodes.map((promo) => (
                            <li key={promo.code}>
                              {promo.code} - {promo.discount}% off (Valid until{" "}
                              {new Date(promo.validUntil).toLocaleDateString()})
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                  {/* Additional Information */}
                  <section className="mb-4">
                    <h6>Additional Information</h6>
                    <p>
                      <strong>Brief Camp Intro:</strong>{" "}
                      {selectedEvent.briefCampIntro}
                    </p>
                    <p>
                      <strong>Tags:</strong> {selectedEvent.tags.join(", ")}
                    </p>
                    {selectedEvent.category && (
                      <p>
                        <strong>Category:</strong> {selectedEvent.category}
                      </p>
                    )}
                    <p>
                      <strong>Discount:</strong> {selectedEvent.discount}%
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedEvent.isActive ? "Active" : "Inactive"}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(selectedEvent.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Last Updated:</strong>{" "}
                      {new Date(selectedEvent.updatedAt).toLocaleString()}
                    </p>
                  </section>
                </div>
              ) : (
                <p>No event selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
