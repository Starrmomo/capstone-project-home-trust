import React, { useState } from "react";
import styles from "./SecureCheckout.module.css";

const SecureCheckout = () => {
  const [selectedMethod, setSelectedMethod] = useState("bank");

  const amount = "₦2,550,000";

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.back}>←</span>
        <h2>Secure Checkout</h2>
        <span className={styles.close}>✕</span>
      </div>

      {/* Amount */}
      <div className={styles.amountSection}>
        <p>Total Amount to Pay</p>
        <h1>{amount}</h1>
        <div className={styles.verified}>
          <span className={styles.dot}></span>
          Verified Property
        </div>
      </div>

      {/* Payment Methods */}
      <h4 className={styles.sectionTitle}>Select Payment Method</h4>

      <div
        className={`${styles.paymentCard} ${
          selectedMethod === "bank" ? styles.active : ""
        }`}
        onClick={() => setSelectedMethod("bank")}
      >
        <div className={styles.paymentLeft}>
          <div className={styles.iconBox}>🏦</div>
          <div>
            <p>Bank Transfer</p>
            <small>Transfer directly from your bank app</small>
          </div>
        </div>

        <div className={styles.rightSection}>
          <span className={styles.recommended}>Recommended</span>
          <div
            className={`${styles.radio} ${
              selectedMethod === "bank" ? styles.radioActive : ""
            }`}
          ></div>
        </div>
      </div>

      <div
        className={`${styles.paymentCard} ${
          selectedMethod === "card" ? styles.active : ""
        }`}
        onClick={() => setSelectedMethod("card")}
      >
        <div className={styles.paymentLeft}>
          <div className={styles.iconBoxGreen}>💳</div>
          <div>
            <p>Card Payment</p>
            <small>Visa, Mastercard, Verve</small>
          </div>
        </div>

        <div
          className={`${styles.radio} ${
            selectedMethod === "card" ? styles.radioActive : ""
          }`}
        ></div>
      </div>

      {/* Escrow Info */}
      <div className={styles.escrowBox}>
        <h4>🔒 FUNDS HELD IN ESCROW</h4>
        <p>
          Your payment is securely held by HomeTrust and only released to the
          landlord after you've moved in.
        </p>
      </div>

      {/* Secured By */}
      <div className={styles.securedBy}>
        <small>SECURED BY</small>
        <p>Flutterwave</p>
      </div>

      {/* Pay Button */}
      <button className={styles.payButton}>
        🔒 Pay {amount}
      </button>

      <p className={styles.terms}>
        By clicking pay, you agree to HomeTrust's <span>Terms of Service</span>
      </p>
    </div>
  );
};

export default SecureCheckout;