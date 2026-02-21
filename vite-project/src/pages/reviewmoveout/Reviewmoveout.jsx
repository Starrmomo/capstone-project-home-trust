import React, { useState } from "react";
import styles from "./Reviewmoveout.module.css";

const ReviewReport = () => {
  const [assessment, setAssessment] = useState("claim");

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn}>←</button>
        <h2>Review Move-out Report</h2>
        <div></div>
      </div>

      {/* Unit Section */}
      <div className={styles.unitHeader}>
        <div>
          <span className={styles.tag}>Inspection</span>
          <h3>Unit 402 - Living Room</h3>
        </div>
        <span className={styles.roomCount}>Room 3 of 5</span>
      </div>

      {/* Photo Evidence */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h4>Photo Evidence</h4>
          <button className={styles.linkBtn}>Compare More</button>
        </div>

        <div className={styles.photoGrid}>
          <div className={styles.photoBox}>
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471"
              alt="move in"
            />
            <span className={styles.photoLabel}>MOVE-IN</span>
          </div>

          <div className={`${styles.photoBox} ${styles.damage}`}>
            <img
              src="https://images.unsplash.com/photo-1582582494700-7d5c5f9f5c06"
              alt="move out"
            />
            <span className={styles.photoLabel}>MOVE-OUT</span>
          </div>
        </div>
      </div>

      {/* Assessment */}
      <div className={styles.card}>
        <h4>Assessment</h4>

        <div className={styles.assessmentRow}>
          <button
            className={`${styles.assessmentBtn} ${
              assessment === "none" ? styles.activeGray : ""
            }`}
            onClick={() => setAssessment("none")}
          >
            No Damages
          </button>

          <button
            className={`${styles.assessmentBtn} ${
              assessment === "claim" ? styles.activeRed : ""
            }`}
            onClick={() => setAssessment("claim")}
          >
            Claim Damages
          </button>
        </div>

        <div className={styles.costRow}>
          <span>Estimated Repair Cost</span>
          <strong>₦150.00</strong>
        </div>

        <div className={styles.commentBox}>
          Deep scratch on hardwood flooring near the entrance. Requires
          professional refinishing for this section.
        </div>
      </div>

      {/* Next Room */}
      <div className={styles.nextRoom}>
        <span>Kitchen</span>
        <span>›</span>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalRow}>
          <span>Total Estimated Deductions</span>
          <strong>₦150.00</strong>
        </div>

        <button className={styles.primaryBtn}>Finalize Review</button>
      </div>
    </div>
  );
};

export default ReviewReport;
