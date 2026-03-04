import React from "react";
import styles from "./Paymentsucess.module.css";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const handleViewReceipt = () => {
    navigate("/paymentreceipt"); // change to your receipt route
  };

  const handleDone = () => {
    navigate("/landingpage"); // change to where "Done" should go
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <div  className={styles.iconCircle2}>
            ✓
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className={styles.title}>Payment Successful</h2>

        {/* Description */}
        <p className={styles.description}>
          Your payment of <strong>₦2,550,000</strong> has been received and
          processed successfully
        </p>

        {/* Buttons */}
        <button
          className={styles.primaryBtn}
          onClick={handleViewReceipt}
        >
          View Receipt
        </button>

        <button
          className={styles.secondaryBtn}
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}