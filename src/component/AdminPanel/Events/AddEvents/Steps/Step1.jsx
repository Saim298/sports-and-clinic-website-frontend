import React, { useContext, useState, useEffect } from "react";
import { EventContext } from "../../../../../context/EventContext";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const customIconUrl =
  "https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_1280.png";

const Step1 = ({ nextStep }) => {
  const { formData, updateFormData } = useContext(EventContext);
  const [location, setLocation] = useState({ coordinates: [], address: "" });
  const [userPosition, setUserPosition] = useState([51.505, -0.09]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        reverseGeocode(latitude, longitude);
      },
      () => {
        console.error("Location access denied.");
        setUserPosition([51.505, -0.09]);
      }
    );
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const address = response.data.display_name;
      setLocation({ coordinates: [lat, lng], address });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setSelectedCoordinates([lat, lng]);
    reverseGeocode(lat, lng);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setMarkerPosition(selectedCoordinates);
    setLocation({
      coordinates: selectedCoordinates,
      address: location.address,
    });
    updateFormData("location", {
      coordinates: selectedCoordinates,
      address: location.address,
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const customIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [25, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const LocationMarker = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    useEffect(() => {
      if (userPosition.length > 0) {
        map.setView(new L.LatLng(userPosition[0], userPosition[1]), 13);
      }
    }, [userPosition, map]);

    return (
      <>
        {markerPosition && (
          <Marker
            position={new L.LatLng(markerPosition[0], markerPosition[1])}
            icon={customIcon}
          >
            <Popup>{location.address}</Popup>
          </Marker>
        )}
        <Marker
          position={new L.LatLng(userPosition[0], userPosition[1])}
          icon={customIcon}
        >
          <Popup>Your Current Location</Popup>
        </Marker>
      </>
    );
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="container">
      <h2>Event Basic Details</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            value={formData.time}
            onChange={(e) => updateFormData("time", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date</label> {/* Add End Date Field */}
          <input
  type="date"
  className="form-control"
  value={formData.endDate}
  onChange={(e) => updateFormData("endDate", e.target.value)}
/>

        </div>
        <div className="form-group">
          <label>Camp Website Link</label> {/* Add Camp Website Link Field */}
          <input
            type="url"
            className="form-control"
            value={formData.campWebsiteLink}
            onChange={(e) => updateFormData("campWebsiteLink", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <div style={{ height: "300px", width: "100%" }}>
            <MapContainer
              center={userPosition}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
          <p>Selected Address: {location.address || "123 Dummy Address"}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </form>

      {modalVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Location</h5>
                <button type="button" className="close" onClick={handleCancel}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to select this location for the event?
                </p>
                <p>
                  <strong>Address:</strong> {location.address}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
