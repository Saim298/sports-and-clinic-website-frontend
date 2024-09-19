import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact-us/contacts");
        if (response.data.success) {
          setContacts(response.data.data);
        } else {
          console.error("Failed to fetch contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Function to get tag style based on subscription status
  const getSubscriptionTagStyle = (hasSubscription) => {
    return {
      backgroundColor: hasSubscription ? "#28a745" : "#dc3545", // Green for true, red for false
      color: "white",
      padding: "0.2rem 0.6rem",
      borderRadius: "0.25rem",
    };
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
                <h1 className="h3 mb-0 text-gray-800">Contact List</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Contacts
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
                            <th>Message</th>
                            <th>Subscription</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((contact, index) => (
                            <tr key={contact._id}>
                              <td>{index + 1}</td>
                              <td>{contact.firstName}</td>
                              <td>{contact.lastName}</td>
                              <td>{contact.email}</td>
                              <td>{contact.message}</td>
                              <td>
                                <span
                                  className="badge"
                                  style={getSubscriptionTagStyle(contact.hasSubscription)}
                                >
                                  {contact.hasSubscription ? "Subscribed" : "Not Subscribed"}
                                </span>
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

export default ContactList;
