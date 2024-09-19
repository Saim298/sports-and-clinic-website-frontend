import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTES } from "../config/apiRoutes";

// Create a context for the event data
const GetEventContext = createContext();

// Custom hook to use the GetEventContext
export const useEvent = () => {
  return useContext(GetEventContext);
};

// GetEventProvider component to wrap the app and provide event data
export const GetEventProvider = ({ children }) => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({
    category: "",
    dateRange: "",
    search: "",
    sort: "", // Add sort criteria (e.g., "top-rated", "most-reviews", "latest")
  });
  const [categories, setCategories] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Fetch event data from an API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_ROUTES.API_GET_EVENT); // Replace with your actual API endpoint
        if (response.data && response.data.length > 0) {
          console.log(response.data);

          setEvent(response.data);
          processCategories(response.data);
          applyFilters(response.data);
        } else {
          toast.info("No events found.");
        }
      } catch (error) {
        setError(error);
        if (error.response && error.response.status === 404) {
          toast.error("Events not found.");
        } else {
          toast.error("An error occurred while fetching events.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterParams]); // Add filterParams as a dependency to re-apply filters on change

  // Method to update filterParams
  const updateFilterParams = (newFilters) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      ...newFilters,
    }));
  };

  // Process categories from events and count occurrences
  const processCategories = (events) => {
    const categoryCount = {};

    events.forEach((event) => {
      if (event.category) {
        if (!categoryCount[event.category]) {
          categoryCount[event.category] = 0;
        }
        categoryCount[event.category] += 1;
      }
    });

    // Convert categoryCount object into an array of category objects
    const categoryArray = Object.keys(categoryCount).map((category) => ({
      category,
      count: categoryCount[category],
    }));

    setCategories(categoryArray);
  };

  // Apply filters based on filterParams
  const applyFilters = (events) => {
    let filtered = [...events];

    if (filterParams.category) {
      filtered = filtered.filter((e) => e.category === filterParams.category);
    }

    if (filterParams.dateRange && Array.isArray(filterParams.dateRange)) {
      const [startDate, endDate] = filterParams.dateRange;
      filtered = filtered.filter((e) => {
        const eventDate = new Date(e.date);
        return (
          eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
        );
      });
    }

    if (filterParams.search) {
      filtered = filtered.filter((e) => {
        const eventName = e.name ? e.name.toLowerCase() : ""; // Check if name exists
        return eventName.includes(filterParams.search.toLowerCase());
      });
    }

    if (filterParams.sort) {
      if (filterParams.sort === "top-rated") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (filterParams.sort === "most-reviews") {
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
      } else if (filterParams.sort === "latest") {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }

    setFilteredEvents(filtered);
  };

  // Additional method to sort by Top Rated, Most Reviews, or Latest
  const sortEvents = (criteria) => {
    updateFilterParams({ sort: criteria });
  };

  return (
    <GetEventContext.Provider
      value={{
        event,
        loading,
        error,
        filterParams,
        setFilterParams,
        updateFilterParams,
        categories,
        filteredEvents,
        filterEventsByCategory: (category) => updateFilterParams({ category }),
        sortEvents, // Expose the sortEvents method to components
      }}
    >
      {children}
    </GetEventContext.Provider>
  );
};
