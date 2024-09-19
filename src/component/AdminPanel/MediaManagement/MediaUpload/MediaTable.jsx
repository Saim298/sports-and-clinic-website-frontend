import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MediaTable = ({ mediaList, isLoading }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    main_page_main_text: "",
    main_page_para_text: "",
    footer_text: "",
    main_page_image: null, // Image file to be uploaded
    existing_image_url: "", // URL of the existing image
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin-add-media/media/${id}`);
        toast.success("Media deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete media.");
      }
    }
  };

  const handleUpdateClick = (media) => {
    setSelectedMedia(media._id);
    setUpdateFormData({
      main_page_main_text: media.main_page_main_text,
      main_page_para_text: media.main_page_para_text,
      footer_text: media.footer_text,
      main_page_image: null, // Reset the image field
      existing_image_url: media.main_page_image, // Store the existing image URL
    });
    setIsUpdating(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "main_page_image") {
      setUpdateFormData({ ...updateFormData, main_page_image: files[0] });
    } else {
      setUpdateFormData({ ...updateFormData, [name]: value });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("main_page_main_text", updateFormData.main_page_main_text);
    data.append("main_page_para_text", updateFormData.main_page_para_text);
    data.append("footer_text", updateFormData.footer_text);

    if (updateFormData.main_page_image) {
      // Add the new image file if it's provided
      data.append("main_page_image", updateFormData.main_page_image);
    } else {
      // If no new image is provided, retain the existing image URL
      data.append("main_page_image", updateFormData.existing_image_url);
    }

    try {
      await axios.put(`http://localhost:5000/api/admin-add-media/media/${selectedMedia}`, data);
      toast.success("Media updated successfully!");
      setIsUpdating(false);
      setSelectedMedia(null);
    } catch (error) {
      toast.error("Failed to update media.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isUpdating ? (
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-3">
            <label htmlFor="main_page_main_text" className="form-label">Main Page Main Text</label>
            <input
              type="text"
              className="form-control"
              id="main_page_main_text"
              name="main_page_main_text"
              value={updateFormData.main_page_main_text}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="main_page_para_text" className="form-label">Main Page Paragraph Text</label>
            <textarea
              className="form-control"
              id="main_page_para_text"
              name="main_page_para_text"
              value={updateFormData.main_page_para_text}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="footer_text" className="form-label">Footer Text</label>
            <input
              type="text"
              className="form-control"
              id="footer_text"
              name="footer_text"
              value={updateFormData.footer_text}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="main_page_image" className="form-label">Main Page Image</label>
            <input
              type="file"
              className="form-control"
              id="main_page_image"
              name="main_page_image"
              onChange={handleUpdateChange}
            />
          </div>
          <button type="submit" className="btn btn-success">Update Media</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsUpdating(false)}>Cancel</button>
        </form>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Main Text</th>
              <th>Paragraph Text</th>
              <th>Footer Text</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaList.map((media) => (
              <tr key={media._id}>
                <td>{media.main_page_main_text}</td>
                <td>{media.main_page_para_text}</td>
                <td>{media.footer_text}</td>
                <td>
                  {media.main_page_image && (
                    <img src={media.main_page_image} alt="media" width="100" />
                  )}
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleUpdateClick(media)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(media._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MediaTable;
