import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_ROUTES } from "../../../config/apiRoutes";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(API_ROUTES.ADMIN_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      setLoading(false);
  
      // Check if response was successful
      if (response.ok) {
        // Access the token and adminId from the response data
        if (data.adminToken && data.adminId) {
          localStorage.setItem("admin_token", data.adminToken);
          localStorage.setItem("admin_id", data.adminId);
          toast.success("Login successful!");
          window.location.href = "/admin-dashboard"
          // Redirect or perform additional actions here
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
