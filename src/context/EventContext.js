import React, { createContext, useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../config/apiRoutes";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: {
      coordinates: [],
      address: "",
    },
    images: [],
    videos: [],
    coachProfiles: [],
    reviews: [],
    ageGroups: [],
    category: "",
    recurring: {
      isRecurring: false,
      recurrenceRule: "",
    },
    isActive: true,
    briefCampIntro: "",
    athleticsInfo: {
      governingBody: "",
      division: "",
      conference: "",
      campWebsite: "",
      recruitingQuestionnaire: "",
    },
    socialNetworks: {
      instagram: "",
      x: "",
      facebook: "",
      threads: "",
    },
    tags: [],
    endDate: "",
    campWebsiteLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitEvent = async () => {
    const form = new FormData();
  
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("time", formData.time);
    form.append("location", JSON.stringify(formData.location));
  
    formData.images.forEach((image) => {
      form.append("images", image);
    });
  
    formData.videos.forEach((video) => {
      form.append("videos", video);
    });
  
    form.append("coachProfiles", JSON.stringify(formData.coachProfiles));
    form.append("reviews", JSON.stringify(formData.reviews));
    form.append("ageGroups", JSON.stringify(formData.ageGroups));
    form.append("tags", JSON.stringify(formData.tags));
    form.append("socialNetworks", JSON.stringify(formData.socialNetworks));
    form.append("athleticsInfo", JSON.stringify(formData.athleticsInfo));
    form.append("recruitingQuestionnaire", formData.recruitingQuestionnaire);
  
    form.append("category", formData.category);
    form.append("recurring", JSON.stringify(formData.recurring));
    form.append("isActive", formData.isActive);
    form.append("briefCampIntro", formData.briefCampIntro);
  
    // Ensure endDate is properly formatted
    form.append("endDate", formData.endDate); // Ensure format is correct
  
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.post(API_ROUTES.ADMIN_EVENT_CREATION, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Event submitted successfully:", response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error submitting event:", error);
      setLoading(false);
      if (error.response) {
        console.error("Response error:", error.response.data);
        setError(error.response.data.error || "Failed to submit event.");
        throw new Error(error.response.data.error || "Failed to submit event.");
      } else if (error.request) {
        console.error("Request error:", error.request);
        setError("No response received from server.");
        throw new Error("No response received from server.");
      } else {
        console.error("Axios setup error:", error.message);
        setError("Error setting up request: " + error.message);
        throw new Error("Error setting up request: " + error.message);
      }
    }
  };
  

  return (
    <EventContext.Provider
      value={{ formData, updateFormData, submitEvent, loading, error }}
    >
      {children}
    </EventContext.Provider>
  );
};
