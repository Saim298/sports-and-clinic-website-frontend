import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const UserPlans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    title: "",
    price: { monthly: "", yearly: "" },
    duration: "monthly", // Default to monthly
    coupons: "",
    discount: "",
    subHeading: "",
    points: [""],
    enhancedFeatures: false,
    exportBookmarks: false,
    personalizedNotifications: false,
    exclusiveContent: false,
    accessSchoolInfo: false,
    accessCampInfo: false,
    canLeaveReviews: false,
    renewsMonthly: false,
    adFreeViewing: false,
    support24_7: false,
  });
  const [editPlan, setEditPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/plan/plans");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      price: {
        ...prevPlan.price,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: checked,
    }));
  };

  const handlePointsChange = (index, value) => {
    const updatedPoints = [...newPlan.points];
    updatedPoints[index] = value;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      points: updatedPoints,
    }));
  };

  const addPointField = () => {
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      points: [...prevPlan.points, ""],
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleEditPriceChange = (e) => {
    const { name, value } = e.target;
    setEditPlan((prevPlan) => ({
      ...prevPlan,
      price: {
        ...prevPlan.price,
        [name]: value,
      },
    }));
  };

  const handleEditCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditPlan((prevPlan) => ({
      ...prevPlan,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/plan/plans", newPlan);
      setNewPlan({
        title: "",
        price: { monthly: "", yearly: "" },
        duration: "monthly",
        coupons: "",
        discount: "",
        subHeading: "",
        points: [""],
        enhancedFeatures: false,
        exportBookmarks: false,
        personalizedNotifications: false,
        exclusiveContent: false,
        accessSchoolInfo: false,
        accessCampInfo: false,
        canLeaveReviews: false,
        renewsMonthly: false,
        adFreeViewing: false,
        support24_7: false,
      });
      fetchPlans();
    } catch (error) {
      console.error("Error adding new plan:", error);
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/plan/plans/${id}`, editPlan);
      setEditPlan(null);
      fetchPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
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
              <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Report
              </a>
            </div>

            {/* Add New Plan Form */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Add New Plan
                </h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Plan Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={newPlan.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="monthly">Monthly Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="monthly"
                      name="monthly"
                      value={newPlan.price.monthly}
                      onChange={handlePriceChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="yearly">Yearly Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="yearly"
                      name="yearly"
                      value={newPlan.price.yearly}
                      onChange={handlePriceChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <select
                      className="form-control"
                      id="duration"
                      name="duration"
                      value={newPlan.duration}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="coupons">Coupons</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coupons"
                      name="coupons"
                      value={newPlan.coupons}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="discount">Discount (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="discount"
                      name="discount"
                      value={newPlan.discount}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subHeading">Sub Heading</label>
                    <textarea
                      className="form-control"
                      id="subHeading"
                      name="subHeading"
                      value={newPlan.subHeading}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Points Fields */}
                  <div className="form-group">
                    <label>Points</label>
                    {newPlan.points.map((point, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control mb-2"
                        value={point}
                        onChange={(e) =>
                          handlePointsChange(index, e.target.value)
                        }
                      />
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={addPointField}
                    >
                      Add Point
                    </button>
                  </div>

                  {/* Boolean Fields */}
                  <div className="form-group">
                    <label>Features</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="enhancedFeatures"
                        name="enhancedFeatures"
                        checked={newPlan.enhancedFeatures}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="enhancedFeatures"
                      >
                        Enhanced Features
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exportBookmarks"
                        name="exportBookmarks"
                        checked={newPlan.exportBookmarks}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exportBookmarks"
                      >
                        Export Bookmarks
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="personalizedNotifications"
                        name="personalizedNotifications"
                        checked={newPlan.personalizedNotifications}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="personalizedNotifications"
                      >
                        Personalized Notifications
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exclusiveContent"
                        name="exclusiveContent"
                        checked={newPlan.exclusiveContent}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exclusiveContent"
                      >
                        Exclusive Content
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="accessSchoolInfo"
                        name="accessSchoolInfo"
                        checked={newPlan.accessSchoolInfo}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="accessSchoolInfo"
                      >
                        Access School Info
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="accessCampInfo"
                        name="accessCampInfo"
                        checked={newPlan.accessCampInfo}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="accessCampInfo"
                      >
                        Access Camp Info
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="canLeaveReviews"
                        name="canLeaveReviews"
                        checked={newPlan.canLeaveReviews}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="canLeaveReviews"
                      >
                        Can Leave Reviews
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="renewsMonthly"
                        name="renewsMonthly"
                        checked={newPlan.renewsMonthly}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="renewsMonthly"
                      >
                        Renews Monthly
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="adFreeViewing"
                        name="adFreeViewing"
                        checked={newPlan.adFreeViewing}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="adFreeViewing"
                      >
                        Ad-Free Viewing
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="support24_7"
                        name="support24_7"
                        checked={newPlan.support24_7}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="support24_7">
                        24/7 Support
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Plan
                  </button>
                </form>
              </div>
            </div>

            {/* Display Existing Plans */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Existing Plans
                </h6>
              </div>
              <div className="card-body">
                {plans.map((plan) => (
                  <div key={plan.id} className="mb-4">
                    <h5>{plan.title}</h5>
                    <p>
                      Price: Monthly - {plan.price.monthly}, Yearly -{" "}
                      {plan.price.yearly}
                    </p>
                    <p>Sub Heading: {plan.subHeading}</p>
                    <p>Points:</p>
                    <ul>
                      {plan.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    <p>
                      Enhanced Features: {plan.enhancedFeatures ? "Yes" : "No"}
                    </p>
                    <p>
                      Export Bookmarks: {plan.exportBookmarks ? "Yes" : "No"}
                    </p>
                    <p>
                      Personalized Notifications:{" "}
                      {plan.personalizedNotifications ? "Yes" : "No"}
                    </p>
                    <p>
                      Exclusive Content: {plan.exclusiveContent ? "Yes" : "No"}
                    </p>
                    <p>
                      Access School Info: {plan.accessSchoolInfo ? "Yes" : "No"}
                    </p>
                    <p>
                      Access Camp Info: {plan.accessCampInfo ? "Yes" : "No"}
                    </p>
                    <p>
                      Can Leave Reviews: {plan.canLeaveReviews ? "Yes" : "No"}
                    </p>
                    <p>Renews Monthly: {plan.renewsMonthly ? "Yes" : "No"}</p>
                    <p>Ad-Free Viewing: {plan.adFreeViewing ? "Yes" : "No"}</p>
                    <p>24/7 Support: {plan.support24_7 ? "Yes" : "No"}</p>

                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => setEditPlan(plan)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Plan Modal */}
            {editPlan && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Plan</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setEditPlan(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="editTitle">Plan Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="editTitle"
                            name="title"
                            value={editPlan.title}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="editMonthly">Monthly Price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="editMonthly"
                            name="monthly"
                            value={editPlan.price.monthly}
                            onChange={handleEditPriceChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="editYearly">Yearly Price</label>
                          <input
                            type="number"
                            className="form-control"
                            id="editYearly"
                            name="yearly"
                            value={editPlan.price.yearly}
                            onChange={handleEditPriceChange}
                            required
                          />
                        </div>

                        {/* Edit Boolean Fields */}
                        <div className="form-group">
                          <label>Features</label>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editEnhancedFeatures"
                              name="enhancedFeatures"
                              checked={editPlan.enhancedFeatures}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editEnhancedFeatures"
                            >
                              Enhanced Features
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editExportBookmarks"
                              name="exportBookmarks"
                              checked={editPlan.exportBookmarks}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editExportBookmarks"
                            >
                              Export Bookmarks
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editPersonalizedNotifications"
                              name="personalizedNotifications"
                              checked={editPlan.personalizedNotifications}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editPersonalizedNotifications"
                            >
                              Personalized Notifications
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editExclusiveContent"
                              name="exclusiveContent"
                              checked={editPlan.exclusiveContent}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editExclusiveContent"
                            >
                              Exclusive Content
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editAccessSchoolInfo"
                              name="accessSchoolInfo"
                              checked={editPlan.accessSchoolInfo}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editAccessSchoolInfo"
                            >
                              Access School Info
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editAccessCampInfo"
                              name="accessCampInfo"
                              checked={editPlan.accessCampInfo}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editAccessCampInfo"
                            >
                              Access Camp Info
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editCanLeaveReviews"
                              name="canLeaveReviews"
                              checked={editPlan.canLeaveReviews}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editCanLeaveReviews"
                            >
                              Can Leave Reviews
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editRenewsMonthly"
                              name="renewsMonthly"
                              checked={editPlan.renewsMonthly}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editRenewsMonthly"
                            >
                              Renews Monthly
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editAdFreeViewing"
                              name="adFreeViewing"
                              checked={editPlan.adFreeViewing}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editAdFreeViewing"
                            >
                              Ad-Free Viewing
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="editSupport24_7"
                              name="support24_7"
                              checked={editPlan.support24_7}
                              onChange={handleEditCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="editSupport24_7"
                            >
                              24/7 Support
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditPlan(null)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={()=>handleEditSubmit(editPlan._id)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlans;
