import React, { useState } from "react";

const Withdraw = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    amount: "",
    method: "",
    wallet: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Withdrawal request submitted successfully.");
        setFormData({
          name: "",
          number: "",
          amount: "",
          method: "",
          wallet: "",
        });
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Funds</h2>
      <form onSubmit={handleSubmit} className="withdraw-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (USD)"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="method"
          value={formData.method}
          onChange={handleChange}
          required
        >
          <option value="">Select Method</option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="USDT">USDT</option>
        </select>
        <input
          type="text"
          name="wallet"
          placeholder="Wallet Address"
          value={formData.wallet}
          onChange={handleChange}
          required
        />

        {/* ✅ ADDED PARAGRAPH HERE */}
        <p style={{ color: "#fcb618", fontWeight: "bold" }}>
          The fee of withdrawal is $800
        </p>

        <button type="submit">Withdraw Now</button>
      </form>
      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Withdraw;
