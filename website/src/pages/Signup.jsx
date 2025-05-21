import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please check your email.");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <br />
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
<input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
<input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
<input type="text" name="number" placeholder="Number" required value={formData.number} onChange={handleChange} />

        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
