import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import auth from "../config/firebase";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [likingId, setLikingId] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Unable to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAdmin(user?.uid === "2kqyEWLe76VHcMIYKfAp1Xd3uV02");
    });

    return () => unsubscribe();
  }, [fetchBlogs]);

  const handleLike = async (blogId) => {
    if (likingId) return;

    setLikingId(blogId);
    try {
      const response = await axios.patch(`${API_URL}/like/${blogId}`);
      if (response.status === 200) {
        await fetchBlogs();
      }
    } catch (err) {
      console.error("Error liking blog:", err);
      setError("Could not register your like. Please try again.");
    } finally {
      setLikingId(null);
    }
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      await axios.post(API_URL, {
        newTitle: newTitle.trim(),
        date,
        newContent: newContent.trim(),
        likes: 0,
      });

      setNewTitle("");
      setNewContent("");
      await fetchBlogs();
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="blogs-page">
      <section className="blogs-header">
        <span className="blogs-kicker">A LITTLE SPACE FOR IDEAS</span>
        <p className="section-label">EXPLORE • READ • DISCOVER</p>
        <h1>
          Notes from <span>my desk</span>
          <span className="blogs-header-doodle" aria-hidden="true">✳</span>
        </h1>
        <p className="blogs-subtitle">
          Thoughts, things I’m learning, and experiences worth sharing.
        </p>
        <div className="blogs-header-underline" aria-hidden="true">
          <span />
        </div>
      </section>

      {admin && (
        <section className="blog-creation-section">
          <div className="blog-creation-card">
            <div className="creation-heading-row">
              <div>
                <p className="blog-eyebrow">YOUR WRITING CORNER</p>
                <h2>Put an idea on paper <span>✎</span></h2>
                <p className="creation-description">
                  Share something you’ve learned with the community.
                </p>
              </div>
              <div className="creation-stamp" aria-hidden="true">
                <span>MAKE</span>
                <strong>✦</strong>
                <span>AND SHARE</span>
              </div>
            </div>

            <form onSubmit={handleNewBlogSubmit}>
              <div className="blog-form-field">
                <label htmlFor="blog-title">Blog title</label>
                <wired-input
                  id="blog-title"
                  placeholder="Give your idea a title..."
                  value={newTitle}
                  required
                  onInput={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="blog-form-field">
                <label htmlFor="blog-content">Your thoughts</label>
                <wired-textarea
                  id="blog-content"
                  placeholder="Start writing here..."
                  rows="6"
                  value={newContent}
                  required
                  onInput={(e) => setNewContent(e.target.value)}
                />
              </div>

              <div className="blog-submit">
                <span className="form-note">A good thought deserves to be shared.</span>
                <button className="blog-button blog-submit-button" type="submit" disabled={submitting}>
                  {submitting ? "Publishing..." : "Publish blog"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {error && (
        <p className="blogs-error" role="alert">
          <span aria-hidden="true">!</span> {error}
        </p>
      )}

      <section className="blogs-list-section">
        <div className="blogs-list-heading">
          <div>
            <p className="blog-eyebrow">THE READING SHELF</p>
            <h2>Latest <span>stories</span></h2>
          </div>
          <span className="blog-count">
            {blogs.length} {blogs.length === 1 ? "POST" : "POSTS"}
          </span>
        </div>

        {loading ? (
          <p className="empty-blogs">Gathering the latest posts...</p>
        ) : blogs.length > 0 ? (
          <div className="blogs-container">
            {blogs.map((blog, index) => (
              <article
                className="blog-post"
                key={blog._id}
              >
                <div className="blog-post-topline">
                  <span className="blog-post-number">NOTE / {String(index + 1).padStart(2, "0")}</span>
                  <span className="blog-post-spark" aria-hidden="true">✳</span>
                </div>

                <h3 className="blog-title">{blog.newTitle}</h3>
                <p className="blog-date">
                  <span aria-hidden="true">✎</span> {blog.date}
                </p>

                <div className="blog-post-rule" aria-hidden="true" />

                <p className="blog-content">{blog.newContent}</p>

                <div className="blog-actions">
                  <button
                    className="blog-button blog-like-button"
                    type="button"
                    onClick={() => handleLike(blog._id)}
                    disabled={likingId === blog._id}
                    aria-label={`Like ${blog.newTitle}`}
                  >
                    <span aria-hidden="true">♡</span>
                    {likingId === blog._id ? "Liking..." : "Like this"}
                  </button>
                  <span className="blog-likes">
                    <strong>{blog.likes || 0}</strong> {blog.likes === 1 ? "like" : "likes"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-blogs">
            <span className="empty-doodle" aria-hidden="true">✎</span>
            <h3>The page is still blank.</h3>
            <p>New thoughts will show up here soon.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default Blogs;
