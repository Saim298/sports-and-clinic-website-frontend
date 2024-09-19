import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MediaTable from "./MediaTable";

const MediaUpload = () => {
  const [formData, setFormData] = useState({
    main_page_main_text: "",
    main_page_para_text: "",
    footer_text: "",
    main_page_image: null,
  });

  const [showMedia, setShowMedia] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "main_page_image") {
      setFormData({ ...formData, main_page_image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("main_page_main_text", formData.main_page_main_text);
    data.append("main_page_para_text", formData.main_page_para_text);
    data.append("footer_text", formData.footer_text);
    if (formData.main_page_image) {
      data.append("main_page_image", formData.main_page_image);
    } else {
      toast.error("Please select an image before submitting.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/admin-add-media/media", data);
      toast.success("Media uploaded successfully!");
      setFormData({
        main_page_main_text: "",
        main_page_para_text: "",
        footer_text: "",
        main_page_image: null,
      });
    } catch (error) {
      toast.error("Failed to upload media.");
    }
  };
  

  const fetchMediaList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin-add-media/media");
      setMediaList(response.data);
    } catch (error) {
      toast.error("Failed to fetch media.");
    }
    setIsLoading(false);
  };

  const handleShowMedia = () => {
    if (!showMedia) {
      fetchMediaList();
    }
    setShowMedia(!showMedia);
  };

  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Manage Media</h1>
                <button className="btn btn-primary" onClick={handleShowMedia}>
                  {showMedia ? "Add Media" : "Show Media"}
                </button>
              </div>

              {showMedia ? (
                <MediaTable mediaList={mediaList} isLoading={isLoading} />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="main_page_main_text" className="form-label">Main Page Main Text</label>
                    <input
                      type="text"
                      className="form-control"
                      id="main_page_main_text"
                      name="main_page_main_text"
                      value={formData.main_page_main_text}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="main_page_para_text" className="form-label">Main Page Paragraph Text</label>
                    <textarea
                      className="form-control"
                      id="main_page_para_text"
                      name="main_page_para_text"
                      value={formData.main_page_para_text}
                      onChange={handleChange}
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
                      value={formData.footer_text}
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-success">Upload Media</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
