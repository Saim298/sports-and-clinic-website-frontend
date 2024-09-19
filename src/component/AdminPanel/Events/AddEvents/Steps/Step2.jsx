import React, { useContext, useState } from "react";
import { EventContext } from "../../../../../context/EventContext";

const Step2 = ({ previousStep, nextStep }) => {
  const { formData, updateFormData } = useContext(EventContext);
  const [mediaImages, setMediaImages] = useState([]);
  const [mediaVideos, setMediaVideos] = useState([]);
  const [coachProfiles, setCoachProfiles] = useState(formData.coachProfiles);
  const [reviews, setReviews] = useState(formData.reviews);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setMediaImages([...files]);
    } else if (name === "videos") {
      setMediaVideos([...files]);
    }
  };

  const handleAddCoachProfile = () => {
    setCoachProfiles([...coachProfiles, { name: "", bio: "", experience: "" }]);
  };

  const handleCoachProfileChange = (index, key, value) => {
    const updatedProfiles = [...coachProfiles];
    updatedProfiles[index][key] = value;
    setCoachProfiles(updatedProfiles);
  };

  const handleAddReview = () => {
    setReviews([...reviews, { user: "", review: "", rating: 1 }]);
  };

  const handleReviewChange = (index, key, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][key] = value;
    setReviews(updatedReviews);
  };

  const handleNext = () => {
    updateFormData("images", mediaImages);
    updateFormData("videos", mediaVideos);
    updateFormData("coachProfiles", coachProfiles);
    updateFormData("reviews", reviews);
    nextStep();
  };

  return (
    <div className="container">
      <h2>Step 2: Media and Additional Information</h2>
      <form>
        <div className="form-group">
          <label>Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Upload Videos</label>
          <input
            type="file"
            name="videos"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label>Coach Profiles</label>
          {coachProfiles.map((profile, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name}
                    onChange={(e) =>
                      handleCoachProfileChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    className="form-control"
                    value={profile.bio}
                    onChange={(e) =>
                      handleCoachProfileChange(index, "bio", e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.experience}
                    onChange={(e) =>
                      handleCoachProfileChange(
                        index,
                        "experience",
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
            onClick={handleAddCoachProfile}
          >
            Add Coach Profile
          </button>
        </div>
        <div className="form-group">
          <label>Reviews</label>
          {reviews.map((review, index) => (
            <div key={index} className="card mb-2">
              <div className="card-body">
                <div className="form-group">
                  <label>User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={review.user}
                    onChange={(e) =>
                      handleReviewChange(index, "user", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Review</label>
                  <textarea
                    className="form-control"
                    value={review.review}
                    onChange={(e) =>
                      handleReviewChange(index, "review", e.target.value)
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="5"
                    value={review.rating}
                    onChange={(e) =>
                      handleReviewChange(index, "rating", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddReview}
          >
            Add Review
          </button>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={previousStep}
        >
          Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Step2;
    