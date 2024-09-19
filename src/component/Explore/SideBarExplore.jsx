import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useEvent } from "../../context/GetEventContext";
import "./SideBarExplore.css";

const SideBarExplore = ({ show, onHide }) => {
  const {
    filterParams,
    updateFilterParams,
    categories,
    filterEventsByCategory,
  } = useEvent();
  const [category, setCategory] = useState(filterParams.category || "");
  const [dateRange, setDateRange] = useState(filterParams.dateRange || "");
  const [search, setSearch] = useState(filterParams.search || "");
  const [sort, setSort] = useState(filterParams.sort || "");
  const [customDate, setCustomDate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeTab, setActiveTab] = useState("filter");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDateRangeChange = (range) => {
    if (range === "pickDate") {
      setCustomDate(true);
      setDateRange("");
    } else {
      setCustomDate(false);
      setDateRange(range);
    }
  };

  const handleApplyFilters = () => {
    const finalDateRange = customDate ? { startDate, endDate } : dateRange;
    updateFilterParams({
      category,
      dateRange: finalDateRange,
      search,
      sort,
    });
    onHide();
    setMobileMenuOpen(false);
  };

  const handleClearFilters = () => {
    setCategory("");
    setDateRange("");
    setSearch("");
    setSort("");
    setCustomDate(false);
    setStartDate("");
    setEndDate("");
    updateFilterParams({
      category: "",
      dateRange: "",
      search: "",
      sort: "",
    });
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <button
        className="mobile-menu-btn d-md-none"
        onClick={handleMobileMenuToggle}
        style={{
          backgroundColor: "black",
          borderRadius: "8px",
          padding: "5px 8px",
          zIndex: "99999",
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`sidebar1 bg-light ${
          mobileMenuOpen ? "d-block" : "d-none"
        } d-md-block ${show ? "full-screen" : ""} pt-3`}
        style={{ overflowY: "auto" }}
      >
        <div className="tabs1 d-flex justify-content-around border-bottom">
          <div
            className={`tab1 ${
              activeTab === "filter" ? "border-bottom border-primary" : ""
            }`}
            onClick={() => setActiveTab("filter")}
          >
            Filter
          </div>
          <div
            className={`tab1 ${
              activeTab === "categories" ? "border-bottom border-primary" : ""
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </div>
        </div>
        <div className="content p-3">
          {activeTab === "filter" ? (
            <>
              <h4>Show events from</h4>
              {customDate ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="row">
                  <button
                    className="col-6 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("any")}
                  >
                    Any Day
                  </button>
                  <button
                    className="col-5 ms-2 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("today")}
                  >
                    Today
                  </button>
                  <button
                    className="col-6 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("weekend")}
                  >
                    Weekend
                  </button>
                  <button
                    className="col-5 ms-2 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("thisWeek")}
                  >
                    This Week
                  </button>
                  <button
                    className="col-6 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("nextWeek")}
                  >
                    Next Week
                  </button>
                  <button
                    className="col-5 ms-2 btn btn-outline-primary mb-2"
                    onClick={() => handleDateRangeChange("pickDate")}
                  >
                    Pick Date
                  </button>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="search" className="form-label">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search events..."
                />
              </div>
              <select
                className="form-select mb-3"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="date">Date</option>
                <option value="latest">Latest</option>
                <option value="topRated">Top Rated</option>
                <option value="mostReviews">Most Reviews</option>
                <option value="random">Random</option>
              </select>
              <button
                className="btn btn-primary mb-2 w-100"
                onClick={handleApplyFilters}
              >
                <FaSearch /> Search
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={handleClearFilters}
              >
                <MdRefresh /> Reset Filters
              </button>
              <div className="no-results text-center mt-4">
                <span className="emoji">😞</span>
                <p>There are no listings matching your search.</p>
                <button className="btn btn-secondary">
                  <MdRefresh /> Reset Filters
                </button>
              </div>
            </>
          ) : (
            <div className="categories-content">
              <h3>Categories</h3>
              <div className="category-card-container">
                {categories.map((cat) => (
                  <div
                    className="card category-card mb-2 me-4"
                    key={cat.category}
                    style={{ width: "18rem" }}
                    onClick={() => filterEventsByCategory(cat.category)}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title category-title">
                        {cat.category}
                      </h5>
                      <p className="card-text category-count">
                        {cat.count} events
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 me-2 mt-2 d-md-none"
          aria-label="Close"
          onClick={() => setMobileMenuOpen(false)}
        ></button>
      </div>
    </>
  );
};

export default SideBarExplore;
