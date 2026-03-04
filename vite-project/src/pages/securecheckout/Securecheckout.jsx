import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Securecheckout.module.css";
import Banktransfer from '../../assets/Icon/BankTransfer.svg?react';
import CardPayment from '../../assets/Icon/CardPayment.svg?react';
import Fundsheild from '../../assets/Icon/FundsShield.svg?react';
import Flutterwave from '../../assets/Icon/FlutterWave.svg?react';
import Padlock from '../../assets/Icon/PadlockWhite.svg?react';
import Green from '../../assets/Icon/VerifiedGreen.svg?react';




const SecureCheckout = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const amount = "₦2,550,000";

  // 🔙 Back Arrow (goes to Property Details)
  const handleBack = () => {
    navigate("/propertydetails"); // Change if needed
  };

  // 💳 Pay Button Navigation (DEPENDS ON SELECTION)
  const handlePay = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "bank") {
      navigate("/banktransfer", {
        state: { amount },
      });
    }

    if (selectedMethod === "card") {
      navigate("/paymentdetail", {
        state: { amount },
      });
    }
  };

  // 📄 Terms of Service Navigation
  const handleTerms = () => {
    navigate("/tenantlegalright"); // Replace "/terms" with your actual Terms of Service route
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.back} onClick={handleBack}>
          ←
        </span>
        <h2>Secure Checkout</h2>
        <span className={styles.close}>✕</span>
      </div>

      {/* Amount */}
      <div className={styles.amountSection}>
        <p>Total Amount to Pay</p>
        <h1>{amount}</h1>
        <div className={styles.verified}>
          <span className={styles.dot}></span>
          <Green></Green>    Verified Property
        </div>
      </div>

      {/* Payment Methods */}
      <h4 className={styles.sectionTitle}>Select Payment Method</h4>

      {/* Bank Transfer */}
      <div
        className={`${styles.paymentCard} ${selectedMethod === "bank" ? styles.active : ""
          }`}
        onClick={() => setSelectedMethod("bank")}
      >
        <div className={styles.paymentLeft}>
          <div className={styles.iconBox}><Banktransfer /> </div>
          <div>
            <p>Bank Transfer</p>
            <small>Transfer directly from your bank app</small>
          </div>
        </div>

        <div className={styles.rightSection}>
          <span className={styles.recommended}>Recommended</span>
          <div
            className={`${styles.radio} ${selectedMethod === "bank" ? styles.radioActive : ""
              }`}
          ></div>
        </div>
      </div>

      {/* Card Payment */}
      <div
        className={`${styles.paymentCard} ${selectedMethod === "card" ? styles.active : ""
          }`}
        onClick={() => setSelectedMethod("card")}
      >
        <div className={styles.paymentLeft}>
          <div className={styles.iconBoxGreen}><CardPayment /></div>
          <div>
            <p>Card Payment</p>
            <small>Visa, Mastercard, Verve</small>
          </div>
        </div>

        <div
          className={`${styles.radio} ${selectedMethod === "card" ? styles.radioActive : ""
            }`}
        ></div>
      </div>

      {/* Escrow Info */}
      <div className={styles.escrowBox}>
        <div className={styles.escrowimg} >
          <Fundsheild />
          <h4> FUNDS HELD IN ESCROW</h4>
        </div>

        <p>
          Your payment is securely held by HomeTrust and only released to the
          landlord after you've moved in.
        </p>
      </div>

      {/* Secured By */}
      <div className={styles.securedBy}>
        <small>SECURED BY</small>
        <div className={styles.escrowimg} >
          <Flutterwave />
          <p>Flutterwave</p>
        </div>

      </div>

      {/* Pay Button */}
      <button
        className={`${styles.payButton} ${selectedMethod ? styles.payActive : ""
          }`}
        disabled={!selectedMethod}
        onClick={handlePay}
      >
        <Padlock />Pay {amount}
      </button>

      {/* Terms of Service */}
      <p className={styles.terms}>
        By clicking pay, you agree to HomeTrust's{" "}
        <span className={styles.termsLink} onClick={handleTerms}>
          Terms of Service
        </span>
      </p>
    </div>
  );
};

export default SecureCheckout;