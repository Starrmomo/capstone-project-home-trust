import React from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./Paymentreceipt.module.css";
import { FiInfo } from "react-icons/fi";
import Security from '../../assets/Icon/FundsShield.svg?react';
import Location from '../../assets/Icon/location.svg?react';
import CardPayment from '../../assets/Icon/CardPayment.svg?react';





const PaymentReceipt = () => {
  const navigate = useNavigate();

  // 🔹 Back Navigation (Change route if needed)
  const handleBack = () => {
    navigate("/paymentreceipt"); // <-- Change this if needed
  };

  // 🔹 Done → Go Home
  const handleDone = () => {
    navigate("/landingpage"); // <-- Change to your home route
  };

  // 🔹 Download as Image
  const handleDownload = async () => {
    const element = document.getElementById("receiptCard");
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = data;
    link.download = "payment-receipt.png";
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} id="receiptCard">
        <div className={styles.firstcard} >
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.backIcon} onClick={handleBack}>←</span>
            <h2>Payment Receipt</h2>
          </div>

          {/* 🔥 HOUSE IMAGE (Top Banner) */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="House"
            className={styles.bannerImage}
          />

          {/* Property Name */}
          <div className={styles.propertyHeader}>
            <h3>Greenview Estate, Lekki</h3>
            <p className={styles.location}><Location /> Lekki Phase 1, Lagos</p>
          </div>

          {/* 🔥 Caution Deposit Protected Box */}
          <div className={styles.protectedBox}>
            <span className={styles.shield}></span>
            <div className={styles.text}  >
              <div className={styles.shieldimg}  > <Security /> <h4>Caution Deposit Protected</h4></div>

              <p>
                Your caution deposit of ₦250,000 is fully protected by HomeTrust Escrow.
              </p>
            </div>
          </div>
        </div>
        {/* Property Card With Small Image */}

        <div className={styles.propertyCard}>
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            alt="Apartment"
            className={styles.propertyThumb}
          />
          <div>
            <h4>3‑Bedroom Apartment</h4>
            <p className={styles.location}><Location /> Lekki Phase 1, Lagos</p>
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
              <p className={styles.value}> <CardPayment className={styles.icon} /> Mastercard **** 4242</p>
            </div>
            <div className={styles.rowBetween2} >
              <span className={styles.label}>Status</span>
              <span className={styles.paidBadge}>Paid</span>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className={styles.breakdown}>
          <div className={styles.row}>
            <span className={styles.rowBetween2}>
              Caution Deposit
              <span className={styles.escrowTag}>● Held in Escrow</span>
            </span>
            <span>₦1,000.00</span>
          </div>

          <div className={styles.row}>
            <span>Service Fee (7%)</span>
            <span>₦500.00</span>
          </div>

          <div className={styles.row}>
            <span>Agency Fee (5%)</span>
            <span>₦500.00</span>
          </div>
        </div>

        {/* Total */}
        <div className={styles.totalBox}>
          <span className={styles.totalAmount2}>Total Amount Paid</span>
          <span className={styles.totalAmount}>₦14,000.00</span>
        </div>



        {/* Buttons At Bottom */}
        <button
          className={styles.primaryButton}
          onClick={handleDownload}
        >
          ⬇ Download PDF Receipt
        </button>

        <button
          className={styles.secondaryButton}
          onClick={handleDone}
        >
          Done
        </button>
        
        <p className={styles.lasttext} > <FiInfo/> Issues with this transaction? Contact<span>Support</span>within 24
          hours.</p>

      </div>
    </div>
  );
};

export default PaymentReceipt;