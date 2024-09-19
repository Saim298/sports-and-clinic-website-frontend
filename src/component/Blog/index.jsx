import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin-add-blog/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to strip HTML tags and limit the text to 100 characters
  const stripHtmlAndLimit = (html, limit) => {
    const strippedText = html.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    return strippedText.length > limit
      ? strippedText.substring(0, limit) + "..."
      : strippedText;
  };

  // Function to handle blog card click
  const handleBlogClick = (blogId) => {
    history(`/blog-detail/${blogId}`);
  };

  // Filter blogs based on the search input
  const filteredBlogs = blogs.filter((blog) =>
    blog.blogName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="blog-page">
      <Navbar />
      <div className="container my-5">
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control blog-search-input"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Check if there are no blogs to show */}
        {filteredBlogs.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <h3>No Blogs Found</h3>
          </div>
        ) : (
          <div className="row">
            {filteredBlogs.map((blog) => (
              <div className="col-md-4 mb-4" key={blog._id}>
                <div
                  className="card blog-card"
                  onClick={() => handleBlogClick(blog._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={blog.blogImage}
                    className="card-img-top"
                    alt={blog.blogName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="blog-card-title">{blog.blogName}</h5>
                    <p className="blog-card-text">
                      {stripHtmlAndLimit(blog.description, 100)}
                    </p>
                    <p className="blog-card-text">
                      <small className="blog-text-muted">Views: {blog.views}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
