import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const Invoice = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/registration/creation/orders/${userId}`
        );
        setOrders(response.data.orders);
        setUser(response.data.user); // Assuming user data comes from this endpoint
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const generatePDF = () => {
    const input = document.getElementById("invoice");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(`invoice_${user?.name}.pdf`);
    });
  };

  return (
    <div className="invoice-container">
      <div id="invoice" className="invoice">
        <div className="invoice-header">
          <h1>INVOICE</h1>
          <div className="invoice-info">
            <div>
              <strong>{user?.user.firstName} {user?.user.lastName}</strong>
              <p>{user?.address}</p>
              <p>{user?.city}, {user?.state} {user?.zipcode}</p>
            </div>
            <div>
              <p>Invoice #: {orders?.[0]?._id}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="invoice-body">
          <table>
            <thead>
              <tr>
                <th>QTY</th>
                <th>DESCRIPTION</th>
                <th>UNIT PRICE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>1</td>
                  <td>{order.event.title}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Subtotal</td>
                <td>
                  ${orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="3">Sales Tax 5%</td>
                <td>
                  ${(orders.reduce((acc, order) => acc + order.amount, 0) * 0.05).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td>
                  <strong>
                    $
                    {(
                      orders.reduce((acc, order) => acc + order.amount, 0) * 1.05
                    ).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="invoice-footer">
          <p>Payment is due within 15 days</p>
          <p>Name of Bank</p>
          <p>Account number: 1234567890</p>
          <p>Routing: 098765432</p>
        </div>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default Invoice;
