import React, { useState, useEffect } from "react";
import Navbar from "../../Home/Navbar";
import Footer from "../../Home/Footer";
import HeroSectionAccount from "../HeroSectionAccount";
import TabsAccount from "../TabsAccount";
import { FaPrint, FaDownload } from "react-icons/fa";
import axios from "axios";
import generateInvoicePDF from "./generateInvoicePDF"; // Import the PDF generator

const Payment = () => {
  const [invoices, setInvoices] = useState([]);
  const userId = localStorage.getItem("user_id"); // Replace with dynamic userId if needed

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/subscriptions/generate-invoices",
          { userId }
        );
        setInvoices(response.data.invoices);
      } catch (error) {
        console.error("Error fetching invoices", error);
      }
    };

    fetchInvoices();
  }, [userId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async (invoice) => {
    try {
      // Use the generateInvoicePDF function to create and download the PDF
      await generateInvoicePDF(invoice);
    } catch (error) {
      console.error("Error downloading the invoice", error);
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSectionAccount />
      <div className="bg-light">
        <TabsAccount />
        <div className="account-dashboard-content mt-5 mb-5">
          <div className="container">
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <div className="card mb-4" key={index}>
                  <div className="card-header d-flex justify-content-between">
                    <h3>Invoice</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{invoice.user.name}</h5>
                    <p className="card-text">Email: {invoice.user.email}</p>
                    <p className="card-text">
                      Amount: ${invoice.subscription.amount.toFixed(2)}
                    </p>
                    <p className="card-text">
                      Payment Method: {invoice.subscription.paymentMethod}
                    </p>
                    <p className="card-text">
                      Start Date:{" "}
                      {new Date(
                        invoice.subscription.startDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Date Generated:{" "}
                      {new Date(invoice.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button onClick={handlePrint} className="btn btn-primary">
                      <FaPrint /> Print Invoice
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(invoice)}
                      className="btn btn-secondary"
                    >
                      <FaDownload /> Download PDF
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No invoices found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default Payment;
