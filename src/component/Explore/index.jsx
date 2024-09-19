import React, { useState, useEffect } from "react";
import SideBarExplore from "./SideBarExplore";
import Navbar from "../Home/Navbar";
import infoImg from "../../assets/info-img.jpg";
import { BsFunnelFill } from "react-icons/bs";
import Footer from "../Home/Footer";
import Spinner from "../../assets/spinner.gif";
import { useEvent } from "../../context/GetEventContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Default Leaflet marker icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const customIconUrl =
  "https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png";

const SetViewOnBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);
  return null;
};

const Explore = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { event, loading, error, filterParams } = useEvent();

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (event) {
      let filtered = event;

      if (filterParams.category) {
        filtered = filtered.filter(
          (evt) => evt.category === filterParams.category
        );
      }

      if (filterParams.dateRange) {
        // Implement date range filtering logic based on filterParams.dateRange
        const today = new Date();
        filtered = filtered.filter((evt) => {
          const eventDate = new Date(evt.date);
          switch (filterParams.dateRange) {
            case "today":
              return (
                eventDate.getDate() === today.getDate() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
              );
            case "thisWeekend":
              const dayOfWeek = today.getDay();
              const startOfWeekend = new Date(today);
              startOfWeekend.setDate(today.getDate() + (5 - dayOfWeek));
              const endOfWeekend = new Date(startOfWeekend);
              endOfWeekend.setDate(startOfWeekend.getDate() + 2);
              return eventDate >= startOfWeekend && eventDate <= endOfWeekend;
            case "thisWeek":
              const endOfWeek = new Date(today);
              endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
              return eventDate >= today && eventDate <= endOfWeek;
            case "nextWeek":
              const startOfNextWeek = new Date(today);
              startOfNextWeek.setDate(today.getDate() + (7 - today.getDay()));
              const endOfNextWeek = new Date(startOfNextWeek);
              endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
              return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek;
            default:
              return true;
          }
        });
      }

      if (filterParams.search) {
        filtered = filtered.filter((evt) =>
          evt.title.toLowerCase().includes(filterParams.search.toLowerCase())
        );
      }

      if (filterParams.sort) {
        // Implement sorting logic
        if (filterParams.sort === "date") {
          filtered = filtered.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        } else if (filterParams.sort === "latest") {
          filtered = filtered.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        } else if (filterParams.sort === "topRated") {
          filtered = filtered.sort((a, b) => b.rating - a.rating);
        } else if (filterParams.sort === "random") {
          filtered = filtered.sort(() => Math.random() - 0.5);
        }
      }

      setFilteredEvents(filtered);
    }
  }, [event, filterParams]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={Spinner} alt="Loading..." />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  // Extract coordinates and other event details, ensuring location and coordinates exist
  const coordinates = filteredEvents
    .filter((evt) => evt.location && evt.location.coordinates)
    .map((evt) => ({
      coord: evt.location.coordinates,
      title: evt.title,
      description: evt.description,
      date: evt.date,
      time: evt.time,
      id:evt._id,
      address: evt.location.address,
      logo: evt.media.images[0] || customIconUrl,
    }));

  // Check if there are any valid coordinates
  if (coordinates.length === 0) {
    toast.error("No event found or no location specified");
  }

  // Calculate bounds to fit all markers
  const bounds = coordinates.map((evt) => [evt.coord[0], evt.coord[1]]);

  return (
    <div className="explore-page">
      <Navbar />
      <div>
        
        <div className="explore-container d-flex" style={{ height: "80vh" }}>
          <SideBarExplore
            show={showSidebar}
            onHide={() => setShowSidebar(false)}
          />
          <div
            className={`map-container flex-grow-1 ${
              showSidebar ? "d-none" : "d-flex"
            } justify-content-center align-items-center`}
            style={{ height: "60vh" }}
          >
            <div className="map w-100">
              <MapContainer
                center={bounds[0]} // Center on the first event or on the center of bounds if needed
                zoom={13}
                style={{ height: "80vh", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {coordinates.map((evt, index) => (
                  <Marker
                    key={index}
                    position={[evt.coord[0], evt.coord[1]]}
                    icon={
                      new L.Icon({
                        iconUrl: evt.logo,
                        iconSize: [50, 50],
                        iconAnchor: [25, 50],
                        popupAnchor: [0, -50],
                      })
                    }
                  >
                    <Popup>
                      <div>
                        <h4>{evt.title}</h4>
                        <p>{evt.description}</p>
                        <p>
                          <strong>Date:</strong>{" "}
                          {new Date(evt.date).toLocaleDateString()} <br />
                          <strong>Time:</strong> {evt.time}
                        </p>
                        <p>
                          <strong>Address:</strong> {evt.address}
                        </p>
                        <div className="d-flex ">
                        <button
                          className="btn btn-primary mr-3"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps?q=${evt.coord[0]},${evt.coord[1]}`,
                              "_blank"
                            )
                          }
                        >
                          Get Directions
                        </button>
                       
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <SetViewOnBounds bounds={bounds} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex align-items-center justify-content-center mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="overlay-2">
              <img
                src={infoImg}
                style={{ width: "16rem" }}
                alt="Submit Info"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
            <h4 className="fw-bold">Submit Your Event</h4>
            <p>
              Share your event with us and let more people know about it. Fill
              in the necessary details and our team will review and add it to
              our platform.
            </p>
            <Link to="/contact-us" className="btn btn-primary mt-3">Submit Event</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
