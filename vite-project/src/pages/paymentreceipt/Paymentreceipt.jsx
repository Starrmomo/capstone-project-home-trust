import React from "react";
import styles from "./PaymentReceipt.module.css";

const PaymentReceipt = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.backIcon}>←</span>
          <h2>Payment Receipt</h2>
          <span className={styles.downloadIcon}>⬇</span>
        </div>

        {/* Success Banner */}
        <div className={styles.successBanner}>
          <div className={styles.successCircle}>✓</div>
          <h3>Payment Successful</h3>
          <p>Your transaction has been processed securely.</p>
        </div>

        {/* Property Info */}
        <div className={styles.propertyCard}>
          <img
            src="https://via.placeholder.com/60"
            alt="apartment"
            className={styles.propertyImage}
          />
          <div>
            <h4>3-Bedroom Apartment</h4>
            <p className={styles.location}>📍 Lekki Phase 1, Lagos</p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className={styles.details}>
          <div className={styles.rowBetween}>
            <div>
              <span className={styles.label}>Transaction ID</span>
              <p className={styles.value}>#TRX-8839201</p>
            </div>
            <div>
              <span className={styles.label}>Date</span>
              <p className={styles.value}>Oct 24, 2023, 10:30 AM</p>
            </div>
          </div>

          <div className={styles.rowBetween}>
            <div>
              <span className={styles.label}>Payment Method</span>
              <p className={styles.value}>💳 Mastercard **** 4242</p>
            </div>
            <div>
              <span className={styles.label}>Status</span>
              <span className={styles.paidBadge}>Paid</span>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className={styles.breakdown}>
          <h4>Payment Breakdown</h4>

          <div className={styles.row}>
            <span>Annual Rent</span>
            <span>₦12,000.00</span>
          </div>

          <div className={styles.row}>
            <span>
              Caution Deposit
              <span className={styles.escrowTag}>● Held in Escrow</span>
            </span>
            <span>₦1,000.00</span>
          </div>

          <div className={styles.row}>
            <span>Legal Fee (5%)</span>
            <span>₦500.00</span>
          </div>

          <div className={styles.row}>
            <span>Agency Fee (5%)</span>
            <span>₦500.00</span>
          </div>
        </div>

        {/* Total */}
        <div className={styles.totalBox}>
          <span>Total Amount Paid</span>
          <span className={styles.totalAmount}>₦14,000.00</span>
        </div>

        {/* Support Text */}
        <p className={styles.supportText}>
          ℹ Issues with this transaction? Contact <span>Support</span> within 24 hours.
        </p>

        {/* Download Button */}
        <button className={styles.downloadButton}>
          ⬇ Download PDF Receipt
        </button>

      </div>
    </div>
  );
};

export default PaymentReceipt;