import styles from "./Uploadid.module.css";

export default function Uploadid() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.back}>←</span>
      </div>

      {/* Step Progress */}
      <div className={styles.stepSection}>
        <div className={styles.stepTop}>
          <span>Step 4 of 4</span>
          <span>100% Completed</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <h1>Upload Government ID</h1>
        <p>
          We need to verify your identity to keep your account secure and
          comply with regulations.
        </p>
      </div>

      {/* Select ID Type */}
      <div className={styles.formGroup}>
        <label>SELECT ID TYPE</label>
        <div className={styles.selectWrapper}>
          <select>
            <option>National Identity Number (NIN)</option>
            <option>Driver’s License</option>
            <option>International Passport</option>
          </select>
        </div>
      </div>

      {/* Document Scan */}
      <div className={styles.formGroup}>
        <label>DOCUMENT SCAN</label>

        <div className={styles.uploadBox}>
          <div className={styles.cameraCircle}>📷</div>
          <h3>Tap to take a photo</h3>
          <p>or upload a file from gallery</p>
        </div>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>!</span>
        <p>
          Ensure all details are clear, readable, and not cropped. Avoid glare
          and dark shadows for faster verification.
        </p>
      </div>

      {/* Encryption Text */}
      <div className={styles.encrypted}>
        🔒 END - TO - END ENCRYPTED
      </div>

      {/* Continue Button */}
      <button className={styles.continueBtn}>Continue</button>
    </div>
  );
}