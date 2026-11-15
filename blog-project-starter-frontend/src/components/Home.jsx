import React from "react";
import "./Home.css";
import { SkillIcon } from "./common/SkillIcon";
import { useNavigate } from "react-router-dom";
import ServicesSection from "./ServicesSection";

import BlogProfileImage from "../assets/Hero img.png";
import P1 from "../assets/p1.png";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";
import BlogImage from "../assets/blogImage.png";

import Footer from "./common/Footer";
import { SketchUnderline, SketchArrow } from "./common/Sketch";

function Home() {
  const navigate = useNavigate();

  const skills = [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "JavaScript",
    "React",
    "React Router DOM",
    "Wired Elements",
    "Node.js",
    "Express",
    "REST APIs",
    "Database",
    "MongoDB",
    "Redux Toolkit",
    "Axios",
    "Git",
    "VS Code",
    "npm",
  ];

  const projects = [
    {
      name: "Bulk Mail App",
      image: P1,
      description:
        "A full-stack application to send bulk emails using Excel recipient lists and track email history.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveUrl: "https://bulk-mail-app-swart-nine-50.vercel.app/",
      githubUrl: "https://github.com/SherwinJClitus/Bulk-Mail-App",
      number: "01",
      previewType: "image",
    },
    {
      name: "Kadhai Neram",
      image: P2,
      description:
        "A comic-inspired login experience with character animations and protected dashboard access.",
      technologies: ["React", "Node.js", "Express", "GSAP"],
      liveUrl: "https://kadhai-neram.vercel.app",
      githubUrl: "https://github.com/SherwinJClitus/Kadhai-Neram",
      number: "02",
      previewType: "image",
    },
    {
      name: "Weather App",
      image: P3,
      description:
        "A modern weather application that fetches real-time weather information for different cities.",
      technologies: ["React", "Vite", "Axios", "API"],
      liveUrl: "https://theweatherapp-woad.vercel.app",
      githubUrl: "https://github.com/SherwinJClitus/theweatherapp",
      number: "03",
      previewType: "image",
    },
    {
      name: "To-Do List",
      image: null,
      description:
        "A simple React application for managing daily tasks, marking completed activities and removing tasks.",
      technologies: ["React", "JavaScript", "CSS"],
      liveUrl: "https://todo-list-indol-five-50.vercel.app",
      githubUrl: "https://github.com/SherwinjClitus/Todo-List",
      number: "04",
      previewType: "todo",
    },
    {
      name: "Random X Counter",
      image: null,
      description:
        "A React utility application combining an interactive counter with a random number generator.",
      technologies: ["React", "Vite", "JavaScript", "CSS"],
      liveUrl: "https://counter-x-randomnumber.vercel.app",
      githubUrl: "https://github.com/SherwinjClitus/Counter-X-Randomnumber",
      number: "05",
      previewType: "counter",
    },
  ];

  return (
    <main className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="section-label">WELCOME TO MY PORTFOLIO</p>

          <h1 className="hero-heading">
            <span className="hero-intro">Hy! I Am</span>
            <span className="hero-name">
              Sherwin
              <svg
                className="name-underline"
                viewBox="0 0 650 45"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M5 19 C65 12 105 25 175 19 S280 14 345 17 S450 10 520 13 S605 9 645 12" />
                <path d="M12 27 C80 31 135 25 205 27 S330 22 395 25 S530 18 640 20" />
                <path d="M25 14 L38 17 L48 15" />
                <path d="M90 31 L105 28 L117 30" />
                <path d="M475 25 L490 22 L503 24" />
                <path d="M590 7 L602 4 L613 7" />
              </svg>
            </span>
          </h1>

          <p className="hero-description">
            I can create stunning websites for your company. Do check my works.
            I won't disappoint you. Try me for 7 Days before you decide
            anything.
          </p>

          <div className="hero-cta">
            <div className="wired-action">
              <wired-button elevation="2">Hire Me</wired-button>
            </div>

            <div className="hero-note">
              <svg
                className="hero-note-arrow"
                viewBox="0 0 170 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M155 100 C135 48 110 10 70 12 C34 13 15 42 15 78"
                  stroke="#171717"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 61 L15 80 L30 65"
                  stroke="#171717"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 66 L18 83"
                  stroke="#171717"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>try me for 7 days!</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={BlogProfileImage} alt="Hand-drawn developer portrait" />
        </div>
      </section>

      <wired-divider class="section-divider"></wired-divider>

      {/* SKILLS */}
      <section className="skills-section">
        <p className="section-label">MY TECHNOLOGY STACK</p>
        <h2 className="section-heading">
          Tools I <SketchUnderline>Work With</SketchUnderline>
        </h2>

        <div className="skills-container">
          {skills.map((skill) => (
            <wired-card className="skill-card" key={skill}>
              <SkillIcon name={skill} size={56} />
              <p>{skill}</p>
            </wired-card>
          ))}
        </div>
      </section>

      <wired-divider class="section-divider"></wired-divider>

      {/* SERVICES AND STATISTICS */}
      <ServicesSection />

      <wired-divider class="section-divider"></wired-divider>

      {/* PROJECTS */}
      <section className="projects-section">
        <p className="section-label">MY PORTFOLIO</p>
        <h2>
          Checkout My Live
          <span>
            <SketchUnderline seed={5}>Projects Here</SketchUnderline>
          </span>
        </h2>

        <p className="projects-intro">
          A collection of things I've designed, developed and brought to life.
        </p>

        <div className="projects-container">
          {projects.map((project) => (
            <wired-card
              className="project-card"
              key={project.name}
              elevation="2"
            >
              <div className="project-card-inner">
                <div className="project-card-top">
                  <span className="project-number">#{project.number}</span>
                  <span className="project-doodle" aria-hidden="true">
                    ✕
                  </span>
                </div>

                <div className="project-image">
                  {project.previewType === "image" ? (
                    <img
                      src={project.image}
                      alt={`${project.name} website screenshot`}
                    />
                  ) : project.previewType === "todo" ? (
                    <div className="mini-preview todo-preview">
                      <div className="mini-preview-heading">
                        My Tasks <span>✎</span>
                      </div>
                      <div className="todo-preview-input">
                        Add a new task... <span>+</span>
                      </div>
                      <div className="todo-preview-task">
                        <span className="fake-checkbox"></span>
                        Complete daily tasks
                      </div>
                      <div className="todo-preview-task">
                        <span className="fake-checkbox checked"></span>
                        Learn React
                      </div>
                      <div className="todo-preview-task">
                        <span className="fake-checkbox"></span>
                        Build a project
                      </div>
                    </div>
                  ) : (
                    <div className="mini-preview counter-preview">
                      <div className="counter-preview-heading">
                        Counter X Random
                      </div>
                      <div className="counter-preview-panel">
                        <span>COUNTER</span>
                        <strong>05</strong>
                        <div className="counter-preview-controls">
                          <span>−</span>
                          <span>+</span>
                        </div>
                      </div>
                      <div className="random-preview-panel">
                        <span>RANDOM NUMBER</span>
                        <strong>42</strong>
                        <small>GENERATE NUMBER</small>
                      </div>
                    </div>
                  )}
                </div>

                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span className="project-tech-chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <wired-divider class="project-divider"></wired-divider>

                <div className="project-links">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`Open ${project.name} live demo`}
                  >
                    <span className="project-button live-demo-button">
                      Live Demo ↗
                    </span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`Open ${project.name} GitHub repository`}
                  >
                    <span className="project-button github-button">
                      GitHub ↗
                    </span>
                  </a>
                </div>
              </div>
            </wired-card>
          ))}
        </div>

        <div className="projects-bottom-note">
          <SketchArrow width={75} height={45} />
          <span>More projects coming soon...</span>
        </div>
      </section>

      <wired-divider class="section-divider"></wired-divider>

      {/* BLOG */}
      <section className="blog-section">
        <div className="blog-image">
          <img src={BlogImage} alt="Blog and technology illustration" />
        </div>

        <div className="blog-content">
          <p className="section-label">SHARE AND LEARN</p>
          <h2>
            I Like to Write
            <span>
              <SketchUnderline seed={9}>Blogs About Tech</SketchUnderline>
            </span>
          </h2>
          <p>
            You can know better about me by reading my blogs here. I share my
            expertise here.
          </p>
          <button
            className="blog-read-button"
            type="button"
            onClick={() => navigate("/blogs")}
          >
            <span>Read My Blogs</span>
            <span className="blog-read-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
