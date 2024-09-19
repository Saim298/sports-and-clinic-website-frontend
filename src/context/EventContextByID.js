import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context
const EventContextByID = createContext();

// Create a provider component
export const EventProviderByID = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch event details by ID
  const fetchEventById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/event/registration/creation/events/${id}`);
      if (!response.ok) {
        throw new Error('Event not found');
      }
      const data = await response.json();
      console.log(data);
      
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContextByID.Provider value={{ event, fetchEventById, loading, error }}>
      {children}
    </EventContextByID.Provider>
  );
};

// Custom hook to use the Event Context
export const useEvent = () => {
  return useContext(EventContextByID);
};
