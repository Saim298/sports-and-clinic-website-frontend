import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../config/apiRoutes";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_ROUTES.AUTH_USER_BY_ID}/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
