import axios from "axios";
import { API_ROUTES } from "../../../config/apiRoutes";

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(
      `${API_ROUTES.API_UPDATE_USER_PROFILE}/${userId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

export const updateUserPassword = async (userId, passwords) => {
  try {
    const response = await axios.put(
      `${API_ROUTES.API_UPDATE_USER_PASSWORD}/${userId}`,
      passwords
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};
