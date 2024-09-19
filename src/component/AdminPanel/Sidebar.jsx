import React from "react";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
      style={{ order: "0", padding: "0px", height: "100%" }}
    >
      {/* <!-- Sidebar - Brand --> */}
      <Link
        to="/admin-dashboard"
        class="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Admin</div>
      </Link>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li class="nav-item active">
        <Link to="/admin-dashboard" class="nav-link">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div class="sidebar-heading">Management</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li class="nav-item">
        <a
          class="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-fw fa-cog"></i>
          <span>Events</span>
        </a>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Event Management:</h6>
            <Link class="collapse-item" to="/admin-add-events">
              Add Event
            </Link>
            <Link to="/admin-events-list" class="collapse-item">
              See Events
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Utilities Collapse Menu --> */}
      <li class="nav-item">
        <a
          class="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-fw fa-wrench"></i>
          <span>Blogs</span>
        </a>
        <div
          id="collapseUtilities"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Blogs Details:</h6>
            <Link to="/admin-add-blogs" class="collapse-item">
              Add Blogs
            </Link>
            <Link to="/admin-blogs-list" class="collapse-item">
              Blogs List
            </Link>
          </div>
        </div>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div class="sidebar-heading">Management</div>

      {/* <!-- Nav Item - Pages Collapse Menu --> */}
      <li class="nav-item">
        <a
          class="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapsePages"
          aria-expanded="true"
          aria-controls="collapsePages"
        >
          <i class="fas fa-fw fa-folder"></i>
          <span>Users</span>
        </a>
        <div
          id="collapsePages"
          class="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Users:</h6>
            <Link class="collapse-item" to="/admin-user-list">
              Users List
            </Link>
            
          </div>
        </div>
      </li>

      {/* <!-- Nav Item - Charts --> */}
      <li class="nav-item">
        <Link class="nav-link" to="/admin-faqs">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Faqs</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      <li class="nav-item">
        <Link to="/admin-all-media-upload" class="nav-link">
          <i class="fas fa-fw fa-table"></i>
          <span>Media Uplaod</span>
        </Link>
      </li>
      {/* <!-- Nav Item - Tables --> */}
      <li class="nav-item">
        <Link to="/admin-plans" class="nav-link">
          <i class="fas fa-fw fa-table"></i>
          <span>Plans</span>
        </Link>
      </li>
      {/* <!-- Nav Item - Tables --> */}
      <li class="nav-item">
        <Link to="/admin-contact-us" class="nav-link">
          <i class="fas fa-fw fa-table"></i>
          <span>Contact List</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/admin-invoice-template" class="nav-link">
        <FaFileInvoiceDollar />
          <span>Invoice Template</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider d-none d-md-block" />

    </ul>
  );
};

export default Sidebar;
