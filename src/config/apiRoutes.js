// Base URL for the API
export const BASE_URL = "http://localhost:5000";

// API Routes
export const API_ROUTES = {
  // AUTH
  GOOGLE_AUTH: `${BASE_URL}/api/auth/google`,
  FACEBOOK_AUTH: `${BASE_URL}/api/auth/facebook`,
  AUTH_REGISTER: `${BASE_URL}/api/auth/register`,
  AUTH_LOGIN: `${BASE_URL}/api/auth/login`,
  AUTH_USER_BY_ID: `${BASE_URL}/api/auth/user`,
  API_UPDATE_USER_PROFILE: `${BASE_URL}/api/auth/user`,
  API_UPDATE_USER_PASSWORD: `${BASE_URL}/api/auth/user/password`,
  // Event get 
  API_GET_EVENT: `${BASE_URL}/api/event/registration/creation/events`,
  API_GET_EVENT_PAYMENT_PLANS: `${BASE_URL}/api/event/registration/creation/event/plan`,

  // Admin Routes
  ADMIN_LOGIN: `${BASE_URL}/api/admin/login`,
  ADMIN_EVENT_CREATION: `${BASE_URL}/api/event/registration/creation/events`,
};
