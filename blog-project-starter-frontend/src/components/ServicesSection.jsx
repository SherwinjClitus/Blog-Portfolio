import React from "react";
import { SketchUnderline, SketchArrow } from "./common/Sketch";
import "./ServicesSection.css";

function ServicesSection() {
  return (
    <section className="services-section doodle-services">
      <div className="services-sketch services-sketch--circle" aria-hidden="true">
        <svg viewBox="0 0 180 180">
          <path d="M91 8 C137 9 169 43 169 88 C171 132 139 169 91 171 C45 174 10 139 9 92 C7 47 43 10 91 8Z" />
          <path d="M86 14 C133 12 163 48 163 91 C162 135 128 164 85 164 C43 164 15 131 15 88 C16 46 47 15 86 14Z" />
        </svg>
      </div>

      <div className="services-sketch services-sketch--star" aria-hidden="true">
        <svg viewBox="0 0 60 60">
          <path d="M30 3 L32 23 L54 30 L32 33 L29 56 L26 33 L5 29 L26 25Z" />
          <path d="M30 9 L31 24 L48 30 L31 32 L29 49 L27 32 L11 29 L27 26Z" />
        </svg>
      </div>

      <div className="services-sketch services-sketch--arrow" aria-hidden="true">
        <SketchArrow width={125} height={75} seed={2} />
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">10+</div>
          <p>Projects Completed</p>
          <span className="stat-card__scribble" aria-hidden="true" />
        </div>

        <div className="stat-card">
          <div className="stat-number">6</div>
          <p>Months of Experience</p>
          <span className="stat-card__scribble" aria-hidden="true" />
        </div>
      </div>

      <div className="services-content">
        <p className="section-label">WHAT I OFFER</p>

        <h2>
          My Awesome
          <span>
            <SketchUnderline seed={2}>Services</SketchUnderline>
          </span>
        </h2>

        <p className="services-description">
          I enjoy turning ideas into interactive digital experiences.
          Explore my work and get to know what I can build for you.
        </p>

        <a
          href="/Sherwin-Resume.pdf"
          download
          className="cv-download-link"
        >
          <span>Download CV</span>
          <span className="cv-download-icon" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

export default ServicesSection;
