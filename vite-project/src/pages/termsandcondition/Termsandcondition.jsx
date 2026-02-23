import { useState } from "react";
import styles from "./Termsandcondition.module.css";

export default function Termsandcondition() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.back}>←</span>
          <h3>Privacy Policy & Terms of Service</h3>
          <div style={{ width: "20px" }} />
        </div>

        {/* Shield */}
        <div className={styles.iconContainer}>
          <div className={styles.shield}>🛡️</div>
        </div>

        <h1 className={styles.title}>Privacy Policy</h1>

        <p className={styles.text}>
          This document outlines how HomeTrust collects, uses, processes,
          and protects your personal data in compliance with relevant data
          protection laws.
        </p>

        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.number}>1</div>
            <h4>Information We Collect</h4>
          </div>

          <p className={styles.text}>
            We collect personal information such as name, email, phone number,
            bank details, transaction history, and verification documents
            required for KYC compliance.
          </p>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.number}>2</div>
            <h4>Why We Collect Your Data</h4>
          </div>
        </div>

        {/* Checkbox */}
        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span>I have read and understand the policies</span>
        </div>

        {/* Button */}
        <button
          className={`${styles.button} ${checked ? styles.active : ""}`}
          disabled={!checked}
        >
          Accept & Continue
        </button>

      </div>
    </div>
  );
}