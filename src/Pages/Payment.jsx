
const upiId = "vel8124688-2@okhdfcbank";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function UpiPayment() {
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  const name = "Sakthi";
  const note = "Payment for Order - Cricket";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

  const handleGenerateQR = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setShowQR(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>UPI Payment</h2>

      <input
        type="number"
        placeholder="Enter Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          width: "200px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <br />
      <button
        onClick={handleGenerateQR}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate QR
      </button>

      {showQR && (
        <div style={{ marginTop: "30px" }}>
          <h3>Scan & Pay ₹{amount}</h3>
          <QRCodeCanvas value={upiUrl} size={200} />
          <p style={{ marginTop: "10px" }}>UPI ID: {upiId}</p>
          <a
            href={upiUrl}
            style={{ display: "block", marginTop: "10px", color: "#007bff" }}
          >
            Or click to pay directly
          </a>
        </div>
      )}
    </div>
  );
}
