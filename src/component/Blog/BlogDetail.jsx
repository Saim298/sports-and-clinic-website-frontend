import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { Helmet } from "react-helmet";

const BlogDetail = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin-add-blog/blogs/${blogid}`
        );
        setBlog(response.data);
        incrementView(); // Increment the view count after fetching the blog details
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };

    const incrementView = async () => {
      try {
        await axios.put(
          `http://localhost:5000/api/admin-add-blog/blogs/${blogid}/increment-view`
        );
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    fetchBlogDetail();
  }, [blogid]);

  if (!blog) return <div>Loading...</div>;

  // Strip HTML tags from description for meta description preview
  const stripHtml = (html) => {
    return html.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <div>
      <Navbar />
      <Helmet>
        <title>{blog.blogName}</title>
        <meta
          name="description"
          content={stripHtml(blog.description).substring(0, 150)}
        />
        <meta name="keywords" content={blog.keywords.join(", ")} />
        {blog.metaTags.map((tag, index) => (
          <meta key={index} name={`meta-tag-${index}`} content={tag} />
        ))}
      </Helmet>
      <div className="container blog-detail-container my-4">
        <h1 className="blog-detail-title text-center mb-5">{blog.blogName}</h1>
        <img
          src={blog.blogImage}
          alt={blog.blogName}
          className="img-fluid blog-detail-image mb-3"
        />
        <p className="blog-detail-date">
          <strong>Created At:</strong>{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div
          className="blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
