
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.log("Login Failed:", error);
      setError("Failed to Login, try again!");
    }
  };

  return (
    <div className="login-page">

      <wired-card className="login-card" elevation="3">

        <h2 className="login-title">Welcome Back!</h2>

        <p className="login-subtitle">
          Login to continue your journey.
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email Address</label>

            <wired-input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <wired-input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <div className="login-submit">
            <wired-button
              elevation="2"
              onClick={handleLogin}
            >
              Login
            </wired-button>
          </div>

        </form>

        <wired-divider></wired-divider>

        <p className="register-text">
          New user?
          <span onClick={() => navigate("/signup")}>
            Register here
          </span>
        </p>

      </wired-card>

    </div>
  );
}

export default Login;
