import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom"; // Assuming you are using react-router for route params
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";

const EventRegistrant = () => {
  const [registrants, setRegistrants] = useState([]);
  const { event_id } = useParams(); // Get event_id from route parameters

  useEffect(() => {
    // Fetch registrant data from API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/registration/event/events/registrants/${event_id}`
        );
        setRegistrants(response.data);
      } catch (error) {
        console.error("Error fetching registrant data:", error);
      }
    };

    fetchData();
  }, [event_id]);

  // Function to handle downloading Excel file
  const downloadExcel = () => {
    // Prepare data to include specific user details
    const dataForExcel = registrants.map((registrant) => ({
      "First Name": registrant.user.firstName,
      "Last Name": registrant.user.lastName,
      Email: registrant.user.email,
      "Contact Number": registrant.user.contactNumber,
      "Emergency Contact Name": registrant.emergencyContact.name,
      "Emergency Contact Relation": registrant.emergencyContact.relation,
      "Emergency Contact Phone": registrant.emergencyContact.phone,
      "Age Group": registrant.ageGroup,
      "Special Requirements": registrant.specialRequirements,
      "Payment Status": registrant.paymentStatus,
      "Registered At": new Date(registrant.registeredAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrants");
    XLSX.writeFile(workbook, "Event_Registrants.xlsx");
  };

  return (
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
                      Event Registrant List
                    </h6>
                  </div>
                  <div className="card-body">
                    <button
                      className="btn btn-success mb-3"
                      onClick={downloadExcel}
                    >
                      Download Excel
                    </button>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Contact Number</th>
                          <th>Emergency Contact Name</th>
                          <th>Emergency Contact Relation</th>
                          <th>Emergency Contact Phone</th>
                          <th>Age Group</th>
                          <th>Special Requirements</th>
                          <th>Payment Status</th>
                          <th>Registered At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrants.map((registrant) => (
                          <tr key={registrant._id}>
                            <td>{registrant.user.firstName}</td>
                            <td>{registrant.user.lastName}</td>
                            <td>{registrant.user.email}</td>
                            <td>{registrant.user.contactNumber}</td>
                            <td>{registrant.emergencyContact.name}</td>
                            <td>{registrant.emergencyContact.relation}</td>
                            <td>{registrant.emergencyContact.phone}</td>
                            <td>{registrant.ageGroup}</td>
                            <td>{registrant.specialRequirements}</td>
                            <td>
                              <span
                                className={`badge ${
                                  registrant.paymentStatus === "pending"
                                    ? "badge-warning"
                                    : "badge-success"
                                }`}
                              >
                                {registrant.paymentStatus}
                              </span>
                            </td>
                            <td>
                              {new Date(
                                registrant.registeredAt
                              ).toLocaleDateString()}
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
  );
};

export default EventRegistrant;
