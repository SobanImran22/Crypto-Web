import React, { useState } from "react";
import usdtQR from "./../assets/usdt.jpg";
import btcQR from "./../assets/btc.jpg";
import ethQR from "./../assets/eth.jpg"; // Add your ETH image

const Deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("USDT");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");

  const getWalletInfo = () => {
    switch (selectedMethod) {
      case "USDT":
        return {
          address: "TUAfRw6qjFQ5EHY41i3KAiTZBAAFpG4e5X",
          qr: usdtQR,
          note: "This address can only accept assets on USDT(TRC20).",
        };
      case "BTC":
        return {
          address: "bc1q4kul0mxgzchstlkhtxp0rsztt6hq58m7swp8tt",
          qr: btcQR,
          note: "This address can only accept assets on BTC(Bitcoin).",
        };
      case "ETH":
        return {
          address: "0x1524cb417aC5De07a835A0A1fFd4E4b618b2aa58",
          qr: ethQR,
          note: "This address can only accept assets on Ethereum (ERC20).",
        };
      default:
        return {};
    }
  };

  const { address, qr, note } = getWalletInfo();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phone: formData.phone,
      method: selectedMethod,
    };

    try {
      const res = await fetch("http://localhost:5000/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Your payment is in process. Our team will contact you soon.");
        setFormData({ name: "", phone: "" }); // Clear form
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="deposit-container">
      <h2>Deposit Funds</h2>
      <form className="deposit-form" onSubmit={handleConfirm}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="method"
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          required
        >
          <option value="USDT">USDT (TRC20)</option>
          <option value="BTC">BTC (Bitcoin)</option>
          <option value="ETH">ETH (Ethereum)</option>
        </select>

        <div className="wallet-info">
          <img src={qr} alt={`${selectedMethod} QR`} />
          <p className="wallet-address">{address}</p>
          <small>{note}</small>
        </div>

        <button type="submit" className="confirm-btn">Confirm</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default Deposit;
