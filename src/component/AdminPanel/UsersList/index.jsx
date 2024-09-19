import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to get tag style based on the signup method
  const getTagStyle = (platform) => {
    switch (platform) {
      case "google":
        return { backgroundColor: "#4285F4", color: "white" }; // Google's blue
      case "facebook":
        return { backgroundColor: "#4267B2", color: "white" }; // Facebook's blue
      default:
        return {};
    }
  };

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Users List
                      </h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Signup Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.email}</td>
                              <td>{user.contactNumber}</td>
                              <td>
                                {user.google && (
                                  <span
                                    className="badge"
                                    style={getTagStyle("google")}
                                  >
                                    Google Signed Up
                                  </span>
                                )}
                                {user.facebook && (
                                  <span
                                    className="badge ml-2"
                                    style={getTagStyle("facebook")}
                                  >
                                    Facebook Signed Up
                                  </span>
                                )}
                                {!user.google && !user.facebook && "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
