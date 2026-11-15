
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("User registered:", res.user);

      navigate("/home");
    } catch (error) {
      console.log("Registration failed:", error);
      setError("Failed to register. Please try again!");
    }
  };

  return (
    <div className="signup-page">

      <wired-card className="signup-card" elevation="3">

        <h2 className="signup-title">Create Account</h2>

        <p className="signup-subtitle">
          Join us and get started!
        </p>

        <form onSubmit={handleSubmit}>

          <div className="signup-field">
            <label>Email Address</label>

            <wired-input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label>Password</label>

            <wired-input
              type="password"
              placeholder="Create a password"
              value={password}
              required
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label>Confirm Password</label>

            <wired-input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              required
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="signup-error">{error}</p>
          )}

          <div className="signup-submit">
            <wired-button
              elevation="2"
              onClick={handleSubmit}
            >
              Register
            </wired-button>
          </div>

        </form>

        <wired-divider></wired-divider>

        <p className="signup-login">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>

      </wired-card>

    </div>
  );
}

export default Signup;
