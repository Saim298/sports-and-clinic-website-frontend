import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill CSS
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";

const AddBlog = () => {
  const [blogName, setBlogName] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaTags, setMetaTags] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("blogName", blogName);
    formData.append("description", description);
    formData.append("keywords", keywords);
    formData.append("metaTags", metaTags);
    formData.append("blogImage", blogImage);

    try {
      await axios.post(
        "http://localhost:5000/api/admin-add-blog/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Blog created successfully!");
    } catch (error) {
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };
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
                <a
                  href="#"
                  class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                  <i class="fas fa-download fa-sm text-white-50"></i> Generate
                  Report
                </a>
              </div>

              <div class="row">
                {/* <!-- Area Chart --> */}
                <div class="col-xl-12 col-lg-7">
                  <div id="content">
                    <div className="container-fluid">
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Add New Blog</h1>
                      </div>
                      <div className="row">
                        <div className="col-xl-12 col-lg-7">
                          <div className="card shadow mb-4">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                Blog Details
                              </h6>
                            </div>
                            <div className="card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                  <label htmlFor="blogName">Blog Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="blogName"
                                    value={blogName}
                                    onChange={(e) =>
                                      setBlogName(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="blogImage">Blog Image</label>
                                  <input
                                    type="file"
                                    className="form-control-file"
                                    id="blogImage"
                                    onChange={handleImageChange}
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="description">
                                    Description
                                  </label>
                                  <ReactQuill
                                    value={description}
                                    onChange={setDescription}
                                    className="react-quill-editor"
                                    theme="snow"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="keywords">Keywords</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="keywords"
                                    value={keywords}
                                    onChange={(e) =>
                                      setKeywords(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="metaTags">Meta Tags</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="metaTags"
                                    value={metaTags}
                                    onChange={(e) =>
                                      setMetaTags(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  disabled={loading}
                                >
                                  {loading ? "Saving..." : "Save Blog"}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
