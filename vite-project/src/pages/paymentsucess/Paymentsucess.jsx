import React from "react";
import styles from "./Paymentsucess.module.css";

const PaymentSuccess = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.closeIcon}>✕</span>
          <h2>Payment Success</h2>
        </div>

        {/* Success Icon */}
        <div className={styles.successIconWrapper}>
          <div className={styles.successIcon}>✓</div>
        </div>

        <h3 className={styles.title}>
          Payment Successful & Secured
        </h3>

        <p className={styles.subtitle}>
          Your <strong>₦2,550,000</strong> is now held in HomeTrust Escrow.
        </p>

        {/* Property Card */}
        <div className={styles.propertyCard}>
          <div className={styles.imageWrapper}>
            <img
              src="https://via.placeholder.com/400x200"
              alt="property"
              className={styles.propertyImage}
            />
            <span className={styles.reservedTag}>● RESERVED</span>
          </div>

          <div className={styles.propertyInfo}>
            <h4>Greenview Estate, Lekki</h4>
            <p className={styles.location}>
              📍 Lekki Phase 1, Lagos
            </p>
          </div>

          <div className={styles.protectionBox}>
            <span className={styles.shieldIcon}>🛡</span>
            <div>
              <h5>Caution Deposit Protected</h5>
              <p>
                Your caution deposit of ₦2,550,000 is fully
                protected by HomeTrust Escrow.
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className={styles.summary}>
          <h4>Transaction Summary</h4>

          <div className={styles.row}>
            <span>Transaction ID</span>
            <span>HT-9823418</span>
          </div>

          <div className={styles.row}>
            <span>Payment Date</span>
            <span>Oct 24, 2023 · 14:32</span>
          </div>

          <div className={styles.row}>
            <span>Payment Method</span>
            <span>🏦 Bank Transfer</span>
          </div>

          <div className={`${styles.row} ${styles.totalRow}`}>
            <span>Total Amount</span>
            <span className={styles.totalAmount}>
              ₦2,550,000
            </span>
          </div>
        </div>

        {/* Buttons */}
        <button className={styles.primaryButton}>
          Manage Tenancy
        </button>

        <button className={styles.secondaryButton}>
          View Receipt
        </button>

      </div>
    </div>
  );
};

export default PaymentSuccess;