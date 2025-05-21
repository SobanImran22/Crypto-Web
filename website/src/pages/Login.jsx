import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, password })
});

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful");
        localStorage.setItem("token", data.token);
        // Navigate to dashboard or home
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Server error");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to USA-Trader</h2>
      <br />
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "golden" }}>{message}</p>}

      <p className="signup-redirect">
        Don't have an account? <Link to="/signup">Sign up now</Link>
      </p>
    </div>
  );
};

export default Login;
