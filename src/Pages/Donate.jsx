import React from "react";

const Donation = () => {
  const showMessage = () => {
    alert(
      "Using Email you can send money through Quick Pay / Zelle Pay to:\ninfo@annamalai-foundation.com"
    );
  };

  return (
    <body style={{		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		backgroundColor: "#f9f9f9",
		textAlign: "center" }}>
    <div className="donation-container">
      {/* Quote Section */}
      <div className="quote-container">
        <p className="quote-text">
          "Your greatness is not what you have, but in what you give."
          <br />
          Support Our Work by donating through PayPal or Zelle
        </p>
      </div>

      {/* PayPal Section */}
      <div className="donation-box">
        <a
          href="https://tinyurl.com/AFUSAdonate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/img/donate/paypal.webp"
            alt="Donate with PayPal"
          />
        </a>
        <p>Up to 3% – service charge (Login to PayPal and donate).</p>
      </div>

      {/* Zelle Section */}
      <div className="donation-box">
        <button
          type="button"
          onClick={showMessage}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img
            src="/src/assets/img/donate/Zelle.webp"
            alt="Donate with Zelle"
          />
        </button>
        <p>
          0% – service charge. Please login with your Bank account and kindly send
          money to info@annamalai-foundation.com email address.
        </p>
      </div>
    </div>
    </body>
  );
};

export default Donation;
