import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const [log, setLog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLog(Boolean(user));
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="navbar-logo" to="/home" onClick={closeMenu}>
        SHERWIN<span>.</span>
      </Link>

      <button
        className="navbar-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div className={`navbar-links${menuOpen ? " is-open" : ""}`}>
        <Link to="/home" onClick={closeMenu}>Home</Link>
        <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>

        {log ? (
          <button className="navbar-auth-button" type="button" onClick={logout}>
            Logout <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <button
            className="navbar-auth-button"
            type="button"
            onClick={() => {
              closeMenu();
              navigate("/login");
            }}
          >
            Login <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
