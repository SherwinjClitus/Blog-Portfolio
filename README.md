# Blog Portfolio

A full-stack personal portfolio with an integrated blogging system. The single repository contains a React portfolio frontend and an Express/MongoDB API for publishing and browsing blog posts.

## Live Demo

| Service | Link |
| --- | --- |
| Frontend portfolio | [https://blog-project-starter-frontend-livid.vercel.app](https://blog-project-starter-frontend-livid.vercel.app) |
| Backend API | [https://blog-portfolio-8ydk.onrender.com](https://blog-portfolio-8ydk.onrender.com) |

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation and Local Setup](#installation-and-local-setup)
- [Environment Variables](#environment-variables)
- [Backend API](#backend-api)
- [Database](#database)
- [Authentication and Admin Access](#authentication-and-admin-access)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Project Overview

This project brings a personal developer portfolio and a small blog application together in one repository. The home page presents an introduction, technology skills, services and project examples, and a link into the blog. Blog entries are loaded from the backend and stored in MongoDB.

The visual direction is sketchbook-inspired: paper-like surfaces, ruled notebook lines, hand-drawn accents, and Wired Elements give the UI a playful, neo-brutalist feel. The palette uses dark ink and warm paper with muted blue/red notebook lines and a small accent color.

## Features

- Portfolio home page with an introduction, technology/skills list, project cards with live and GitHub links, services/statistics, and a blog call-to-action.
- Responsive navigation between Home and Blogs, with login/logout actions and a collapsible menu. The navigation also includes an About link, but the current router does not define an `/about` route; the About component is a placeholder and is not mounted by the router.
- Blog listing fetched dynamically from the REST API, including loading, empty, and error states.
- Blog cards display a title, date, content, and like count; visitors can increment likes.
- Firebase email/password sign-up and login, plus logout.
- Blog creation form displayed in the UI for the configured admin account.
- Sketch-inspired presentation using notebook-paper styling, SVG doodles, Rough.js helpers, and Wired Elements.
- A small backend health-check endpoint at `/`.

> **Authorization note:** The current frontend decides whether to show the blog creation form using Firebase client-side auth state. The Express `POST /api/blogs` endpoint does not verify a Firebase token or enforce an admin role, so this UI check is not server-side authorization. Add backend token verification and authorization before treating blog creation as protected in a public deployment.

## Tech Stack

### Frontend

- **React 19** — component-based portfolio and blog UI.
- **Vite** — frontend development server and production bundler.
- **JavaScript, HTML5, CSS3** — application logic, markup, and visual styling.
- **Tailwind CSS 3** — utility CSS support, alongside the project's custom component stylesheets.
- **React Router DOM** — client-side routes for `/home`, `/blogs`, `/login`, and `/signup`.
- **Axios** — HTTP requests from the frontend to the blog API.
- **Wired Elements** — hand-drawn-style inputs, cards, buttons, and dividers.
- **Rough.js** — sketch-style drawing helpers used by the UI.

### Backend

- **Node.js** — JavaScript runtime.
- **Express 4** — HTTP server and REST API routes.
- **Mongoose 8** — MongoDB connection, schema, and model operations.
- **CORS** — allows browser requests from configured client origins.
- **dotenv** — loads backend environment variables from `.env`.

### Database and authentication

- **MongoDB** — stores blog documents; MongoDB Atlas can provide the hosted database.
- **Firebase Authentication** — client-side email/password account registration and sign-in.

### Deployment and development tools

- **Vercel** — frontend hosting.
- **Render** — backend hosting.
- **MongoDB Atlas** — managed MongoDB hosting when using the cloud database.
- **Git, GitHub, VS Code, and npm** — source control and development workflow.

## Project Structure

The frontend and backend are maintained as separate applications inside the same Git repository:

```text
Blog-Portfolio/
├── README.md
├── package-lock.json                 # Root lockfile; apps install from their own directories
├── blog-project-starter-frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                    # Frontend route definitions
│       ├── main.jsx                   # React entry point; loads Wired Elements
│       ├── index.css                  # Global and notebook-paper styling
│       ├── config/firebase.js         # Firebase client initialization
│       ├── assets/                    # Portfolio and project images
│       └── components/
│           ├── Home.jsx               # Skills, services, projects, and blog intro
│           ├── Blogs.jsx              # Blog listing, likes, and admin creation UI
│           ├── Login.jsx
│           ├── Signup.jsx
│           ├── About.jsx              # Placeholder component (not currently routed)
│           ├── Contact.jsx             # Placeholder component
│           ├── ServicesSection.jsx
│           └── common/                # Navbar, footer, sketch and skill helpers
└── blog-project-starter-backend/
    ├── .gitignore
    ├── package.json
    ├── index.js                       # Express app, CORS, API routes, DB startup
    └── models/
        └── Blog.js                    # Mongoose blog schema and model
```

## Installation and Local Setup

### Requirements

Use **Node.js 22.12 or newer** and npm. Node 22.12+ is the version recommended by the frontend project for its Vite toolchain. Install dependencies separately from each application directory.

### 1. Clone the repository

```bash
git clone https://github.com/SherwinJClitus/Blog-Portfolio.git
cd Blog-Portfolio
```

### 2. Configure and install the backend

Create `blog-project-starter-backend/.env` using the template in [Environment Variables](#environment-variables), and provide a MongoDB connection string.

```bash
cd blog-project-starter-backend
npm install
npm run dev
```

The backend listens on port `5000` by default. `npm run dev` uses Node's built-in watch mode; `npm start` starts the server without watch mode.

### 3. Configure and install the frontend

In a second terminal, from the repository root:

```bash
cd blog-project-starter-frontend
cp .env.example .env
```

Set `VITE_API_BASE_URL` in the new `.env` as shown below, then install and run Vite:

```bash
npm install
npm run dev
```

Vite serves the frontend at [http://localhost:5173](http://localhost:5173). The backend's default CORS origin is also `http://localhost:5173`.

For a production build, run `npm run build` in the frontend directory. The generated static files are written to `dist/`; `npm run preview` serves that build locally.

## Environment Variables

### Frontend: `blog-project-starter-frontend/.env`

```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

The value is the backend origin, without `/api/blogs` at the end. The application adds that path itself. Vite variables prefixed with `VITE_` are included in browser code and must not contain private credentials.

### Backend: `blog-project-starter-backend/.env`

```dotenv
PORT=5000
MONGO_URI=<your MongoDB connection string>
CLIENT_URL=http://localhost:5173
```

`CLIENT_URL` accepts a comma-separated list of allowed origins, for example the local frontend origin and the deployed Vercel origin. `PORT` defaults to `5000` if omitted; `MONGO_URI` is required.

The frontend directory already includes a safe `.env.example` template. The backend currently does not include one; the template above shows the required local settings. Keep actual `.env` files out of source control. The backend `.gitignore` excludes environment files. Never commit database credentials, passwords, private keys, Firebase service-account credentials, or tokens. Firebase web configuration is initialized in `src/config/firebase.js`; it is client-side configuration, not a place for service-account secrets. Restrict and secure the Firebase project using Firebase's own configuration and rules.

## Backend API

The API base URL in production is `https://blog-portfolio-8ydk.onrender.com`. JSON is used for request and response bodies.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health check; returns `{ "message": "Blog API is running!" }`. |
| `GET` | `/api/blogs` | Returns all blog documents as a JSON array. |
| `POST` | `/api/blogs` | Creates a blog document. |
| `PATCH` | `/api/blogs/like/:id` | Increments a blog's `likes` value by one and returns the updated document. |

### Create a blog

Request body (the schema requires `newTitle` and `newContent`; `date` and `likes` are optional):

```json
{
  "newTitle": "A sample post",
  "newContent": "Notes about something I learned.",
  "date": "November 15, 2026",
  "likes": 0
}
```

Example success response: **201 Created**, with the saved document (including its MongoDB `_id`):

```json
{
  "_id": "<generated MongoDB document id>",
  "newTitle": "A sample post",
  "newContent": "Notes about something I learned.",
  "date": "November 15, 2026",
  "likes": 0
}
```

If `date` is omitted, the Mongoose schema supplies an ISO timestamp. If `likes` is omitted, it defaults to `0`. Invalid documents return **400** with a JSON `message`.

### Like a blog

```http
PATCH /api/blogs/like/<blog-id>
```

On success the API returns **200 OK** and the updated blog document. A missing blog returns **404** with `{ "message": "Blog not found" }`; an invalid ID or other update error returns **400** with a JSON `message`. The endpoint does not currently require a signed-in user and does not prevent repeated likes.

## Database

The backend connects to MongoDB using `MONGO_URI` and Mongoose. Configure this URI to point to a database you control, such as a MongoDB Atlas cluster. Mongoose's `Blog` model is defined in `blog-project-starter-backend/models/Blog.js` with `newTitle`, `newContent`, `date`, and `likes` fields. MongoDB collection naming follows Mongoose's model naming convention (the `Blog` model maps to the pluralized `blogs` collection by default).

The source code does not hard-code a database name such as `blogDB`; the database name is selected by the database path in your connection URI. Choose the desired database name in your own MongoDB connection string.

## Authentication and Admin Access

Firebase Authentication is initialized in `blog-project-starter-frontend/src/config/firebase.js`. The login and registration pages use Firebase email/password authentication, and the navigation reflects signed-in state and offers logout. The blog page checks the authenticated Firebase user's identity in the browser to decide whether to render the post creation form.

This is currently a frontend-only admin UI check. The backend does not verify Firebase ID tokens or implement roles, so the blog creation endpoint is not protected against direct API requests. Do not rely on hiding the form as a security boundary; server-side Firebase token verification and an explicit authorization policy are recommended before using this as a secure admin workflow.

## Deployment

The deployed architecture is split across three services:

- **Frontend:** Vercel, using `blog-project-starter-frontend/` as the project root.
- **Backend:** Render, using `blog-project-starter-backend/` as the service root.
- **Database:** MongoDB Atlas (or another MongoDB deployment), connected by the backend's `MONGO_URI`.

The repository itself does not contain Vercel or Render deployment configuration files, so confirm the settings in each hosting provider's project dashboard.

### Vercel frontend settings

- **Root directory:** `blog-project-starter-frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** `VITE_API_BASE_URL=https://blog-portfolio-8ydk.onrender.com`

### Render backend settings

- **Root directory:** `blog-project-starter-backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:** `PORT` (Render provides the service port), `MONGO_URI` (your private MongoDB URI), and `CLIENT_URL` (the exact Vercel origin, such as `https://blog-project-starter-frontend-livid.vercel.app`).

The backend CORS middleware allows requests only when their `Origin` is in `CLIENT_URL` (or when there is no Origin header). Set the deployed Vercel origin exactly in Render's `CLIENT_URL`, including the scheme and without a trailing path, or browser requests from the frontend will be rejected. Multiple allowed origins can be comma-separated. The local development origin defaults to `http://localhost:5173` when `CLIENT_URL` is unset.

## Screenshots

Add screenshots of the deployed application to this section when available. No screenshot links are included yet.

- **Portfolio home:** _Add screenshot here._
- **Blog listing:** _Add screenshot here._
- **Login / blog editor:** _Add screenshot here._

## Future Improvements

- Verify Firebase ID tokens in the backend and restrict blog creation to an authorized admin role.
- Add blog editing and deletion endpoints and corresponding admin controls.
- Add validation, pagination, sorting, and more structured API error handling.
- Prevent duplicate or automated likes, for example with per-user tracking and rate limiting.
- Add automated tests for React components and API routes.
- Complete or remove the placeholder About and Contact components and ensure all navigation links resolve to implemented routes or page sections.
- Move Firebase web configuration into documented public environment variables if desired, while keeping server-only credentials out of the frontend.

## Author

**Sherwin J. Clitus** — [GitHub profile](https://github.com/SherwinJClitus)
