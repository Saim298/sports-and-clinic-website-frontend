import React, { useContext, useState } from "react";
import { EventContext } from "../../../../../context/EventContext";
import { toast } from "react-toastify";

const Step3 = ({ previousStep }) => {
  const {
    formData,
    updateFormData,
    submitEvent,
    loading,
    error,
  } = useContext(EventContext);

  const [ageGroups, setAgeGroups] = useState(formData.ageGroups);
  const [category, setCategory] = useState(formData.category);
  const [recurring, setRecurring] = useState(formData.recurring);
  const [briefCampIntro, setBriefCampIntro] = useState(formData.briefCampIntro || "");
  const [athleticsInfo, setAthleticsInfo] = useState(formData.athleticsInfo || {
    governingBody: "",
    division: "",
    conference: "",
    campWebsite: "",
    recruitingQuestionnaire: "",
  });
  const [socialNetworks, setSocialNetworks] = useState(formData.socialNetworks || {
    instagram: "",
    x: "",
    facebook: "",
    threads: "",
  });
  const [tags, setTags] = useState(formData.tags || []);

  const handleAddAgeGroup = () => {
    setAgeGroups([...ageGroups, { ageGroup: "", maxParticipants: 0 }]);
  };

  const handleAgeGroupChange = (index, key, value) => {
    const updatedGroups = [...ageGroups];
    updatedGroups[index][key] = value;
    setAgeGroups(updatedGroups);
  };

  const handleNext = async () => {
    // Update context with current data
    updateFormData("ageGroups", ageGroups);
    updateFormData("category", category);
    updateFormData("recurring", recurring);
    updateFormData("briefCampIntro", briefCampIntro);
    updateFormData("athleticsInfo", athleticsInfo);
    updateFormData("socialNetworks", socialNetworks);
    updateFormData("tags", tags);

    try {
      await submitEvent();
      toast.success("Event submitted successfully");
    } catch (error) {
      toast.error(
        "Submission failed: " + (error.message || "An error occurred")
      );
    }
  };

  const handleAthleticsInfoChange = (key, value) => {
    setAthleticsInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSocialNetworksChange = (key, value) => {
    setSocialNetworks((prev) => ({ ...prev, [key]: value }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };

  return (
    <div className="container">
      <h2>Step 3: Final Details</h2>
      <form>
        {/* Age Groups Section */}
        <div className="form-group">
          <label>Age Groups</label>
          {ageGroups.map((group, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <div className="form-group">
                  <label>Age Group</label>
                  <input
                    type="text"
                    className="form-control"
                    value={group.ageGroup}
                    onChange={(e) =>
                      handleAgeGroupChange(index, "ageGroup", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Max Participants</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    value={group.maxParticipants}
                    onChange={(e) =>
                      handleAgeGroupChange(
                        index,
                        "maxParticipants",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddAgeGroup}
          >
            Add Age Group
          </button>
        </div>

        {/* Category Section */}
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Recurring Section */}
        <div className="form-group">
          <label>Recurring</label>
          <div>
            <input
              type="checkbox"
              checked={recurring.isRecurring}
              onChange={() =>
                setRecurring((prev) => ({
                  ...prev,
                  isRecurring: !prev.isRecurring,
                }))
              }
            />
            <label>Is Recurring</label>
          </div>
          {recurring.isRecurring && (
            <div>
              <div className="form-group">
                <label>Recurrence Rule</label>
                <input
                  type="text"
                  className="form-control"
                  value={recurring.recurrenceRule}
                  onChange={(e) =>
                    setRecurring((prev) => ({
                      ...prev,
                      recurrenceRule: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={recurring.endDate || ""}
                  onChange={(e) =>
                    setRecurring((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Brief Camp Intro Section */}
        <div className="form-group">
          <label>Brief Camp Intro</label>
          <textarea
            className="form-control"
            value={briefCampIntro}
            onChange={(e) => setBriefCampIntro(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        {/* Athletics Info Section */}
        <div className="form-group">
          <label>Athletics Info</label>
          <input
            type="text"
            className="form-control"
            placeholder="Governing Body"
            value={athleticsInfo.governingBody}
            onChange={(e) =>
              handleAthleticsInfoChange("governingBody", e.target.value)
            }
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Division"
            value={athleticsInfo.division}
            onChange={(e) =>
              handleAthleticsInfoChange("division", e.target.value)
            }
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Conference"
            value={athleticsInfo.conference}
            onChange={(e) =>
              handleAthleticsInfoChange("conference", e.target.value)
            }
          />
          <input
            type="url"
            className="form-control mt-2"
            placeholder="Camp Website"
            value={athleticsInfo.campWebsite}
            onChange={(e) =>
              handleAthleticsInfoChange("campWebsite", e.target.value)
            }
          />
          <textarea
            className="form-control mt-2"
            placeholder="Recruiting Questionnaire"
            value={athleticsInfo.recruitingQuestionnaire}
            onChange={(e) =>
              handleAthleticsInfoChange("recruitingQuestionnaire", e.target.value)
            }
            rows="3"
          ></textarea>
        </div>

        {/* Social Networks Section */}
        <div className="form-group">
          <label>Social Networks</label>
          <input
            type="url"
            className="form-control"
            placeholder="Instagram URL"
            value={socialNetworks.instagram}
            onChange={(e) =>
              handleSocialNetworksChange("instagram", e.target.value)
            }
          />
          <input
            type="url"
            className="form-control mt-2"
            placeholder="X URL"
            value={socialNetworks.x}
            onChange={(e) =>
              handleSocialNetworksChange("x", e.target.value)
            }
          />
          <input
            type="url"
            className="form-control mt-2"
            placeholder="Facebook URL"
            value={socialNetworks.facebook}
            onChange={(e) =>
              handleSocialNetworksChange("facebook", e.target.value)
            }
          />
          <input
            type="url"
            className="form-control mt-2"
            placeholder="Threads URL"
            value={socialNetworks.threads}
            onChange={(e) =>
              handleSocialNetworksChange("threads", e.target.value)
            }
          />
        </div>

        {/* Tags Section */}
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags separated by commas"
            value={tags.join(", ")}
            onChange={handleTagsChange}
          />
        </div>

        {/* Is Active Section */}
        <div className="form-group">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={() => updateFormData("isActive", !formData.isActive)}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={previousStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>

      {error && <p className="text-danger mt-3">Error: {error}</p>}
    </div>
  );
};

export default Step3;
