import React from "react";
import "./Footer.css";

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <p className="footer-kicker">END OF THE PAGE</p>
            <h2>SHERWIN<span>.</span></h2>
            <p className="footer-description">
              Building useful things for the web, one line of code at a time.
            </p>
          </div>

          <button
            className="footer-top-button"
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            BACK TO TOP <span aria-hidden="true">↑</span>
          </button>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sherwin. All rights reserved.</p>
          <p className="footer-note">Made with code & creativity ✏️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
