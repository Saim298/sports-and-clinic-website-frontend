import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { Line, Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js components
import axios from "axios";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const AdminDashboard = () => {
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchEventData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event/registration/creation/events');
        const data = response.data;
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchUserData();
    fetchEventData();
  }, []);

  // Helper function to get month-year format
  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Prepare month-wise data
  const monthWiseData = userData.reduce((acc, user) => {
    const monthYear = getMonthYear(user.createdAt);
    if (!acc[monthYear]) {
      acc[monthYear] = { total: 0, google: 0, facebook: 0, nonSocial: 0 };
    }
    acc[monthYear].total += 1;
    if (user.google) acc[monthYear].google += 1;
    if (user.facebook) acc[monthYear].facebook += 1;
    if (!user.google && !user.facebook) acc[monthYear].nonSocial += 1;
    return acc;
  }, {});

  const months = Object.keys(monthWiseData);
  const googleCounts = months.map(month => monthWiseData[month].google);
  const facebookCounts = months.map(month => monthWiseData[month].facebook);
  const nonSocialCounts = months.map(month => monthWiseData[month].nonSocial);

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Google Registered Users',
        data: googleCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Facebook Registered Users',
        data: facebookCounts,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Non-Social Users',
        data: nonSocialCounts,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  const pieData = {
    labels: ['Google Registered', 'Facebook Registered', 'Non-Social Registered'],
    datasets: [
      {
        data: [
          userData.filter(user => user.google).length,
          userData.filter(user => user.facebook).length,
          userData.length - userData.filter(user => user.google).length - userData.filter(user => user.facebook).length
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Process data for charts
  const processChartData = () => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth - 1;

    const thisMonthEvents = eventData.filter(event => new Date(event.date).getMonth() === currentMonth).length;
    const lastMonthEvents = eventData.filter(event => new Date(event.date).getMonth() === lastMonth).length;

    return {
      lineChartData: {
        labels: ['This Month', 'Last Month'],
        datasets: [
          {
            label: 'Events Registered',
            data: [thisMonthEvents, lastMonthEvents],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          }
        ],
      },
      pieChartData: {
        labels: ['This Month', 'Last Month'],
        datasets: [
          {
            data: [thisMonthEvents, lastMonthEvents],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          }
        ],
      },
    };
  };

  const { lineChartData, pieChartData } = processChartData();

  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        <Sidebar />
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" class="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <Navbar />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div class="container-fluid">
              {/* <!-- Page Heading --> */}
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              
              </div>

              {/* <!-- Content Row --> */}
              <div class="row">
                 {/* <!-- Total Users Card Example --> */}
                 <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Registered Users
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {userData.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Total Events Card Example --> */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Total Registered Events
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {eventData.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar-alt fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div></div>
              </div>

              {/* <!-- Content Row --> */}

              <div className="row">
      {/* Area Chart */}
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Events Registered</h6>
            <div className="dropdown no-arrow">
              <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                <div className="dropdown-header">Dropdown Header:</div>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-area">
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary"></h6>
            <div className="dropdown no-arrow">
              <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                <div className="dropdown-header">Dropdown Header:</div>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="chart-pie pt-4 pb-2">
              <Pie data={pieChartData} />
            </div>
            <div className="mt-4 text-center small">
              <span className="mr-2"><i className="fas fa-circle text-primary"></i> This Month</span>
              <span className="mr-2"><i className="fas fa-circle text-success"></i> Last Month</span>
            </div>
          </div>
        </div>
      </div>
    </div>

             
    <div className="row">
      {/* Bar Chart for Monthly Registrations */}
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">User Registrations by Month</h6>
          </div>
          <div className="card-body">
            <div className="chart-bar">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart for Registration Status */}
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Overall Registration Status</h6>
          </div>
          <div className="card-body">
            <div className="chart-pie">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>

            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper --> */}

    </div>
  );
};

export default AdminDashboard;
