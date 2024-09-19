import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../Sidebar";
import Navbar from "../../Navbar";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    blogName: "",
    description: "",
    keywords: "",
    metaTags: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin-add-blog/blogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs.");
    }
  };

  const handleEdit = async (id) => {
    console.log(id);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin-add-blog/blogs/${id}`
      );
      setSelectedBlog(response.data);
      setFormData({
        blogName: response.data.blogName,
        description: response.data.description,
        keywords: response.data.keywords,
        metaTags: response.data.metaTags,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      toast.error("Failed to fetch blog details.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { _id } = selectedBlog;
    try {
      await axios.put(
        `http://localhost:5000/api/admin-add-blog/blogs/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Blog updated successfully!");
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin-add-blog/blogs/${id}`
      ); // Replace with your API URL
      // Remove the deleted blog from the state
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete the blog");
    }
  };

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Blogs List
                      </h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Blog Name</th>
                            <th>Description</th>
                            <th>Keywords</th>
                            <th>Meta Tags</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog, index) => (
                            <tr key={blog._id}>
                              <td>{index + 1}</td>
                              <td>{blog.blogName}</td>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: blog.description,
                                }}
                              ></td>
                              <td>{blog.keywords}</td>
                              <td>{blog.metaTags}</td>
                              <td className="d-flex ">
                                <button
                                  className="btn btn-primary btn-sm mx-2"
                                  onClick={() => handleEdit(blog._id)}
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleDelete(blog._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Blog</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Blog Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.blogName}
                      onChange={(e) =>
                        setFormData({ ...formData, blogName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Keywords</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.keywords}
                      onChange={(e) =>
                        setFormData({ ...formData, keywords: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Meta Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.metaTags}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTags: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsList;
