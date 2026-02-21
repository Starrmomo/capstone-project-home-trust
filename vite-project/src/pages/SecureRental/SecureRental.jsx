import { useNavigate } from "react-router-dom";
import styles from "./SecureRental.module.css";

import shieldIcon from "../../assets/Icon/shield.png";

export default function SecureRental() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.imageWrapper}>
            <img
              src={shieldIcon}
              alt="Security Shield"
              className={styles.image}
            />
          </div>

          <h1 className={styles.title}>
            Secure Your Rental
            <br />
            From Start to Finish
          </h1>

          <p className={styles.subtitle}>
            Verified users, protected deposits, and safe transactions all in one place
          </p>
        </div>

        <div className={styles.bottomSection}>
          <button
            className={styles.nextBtn}
            onClick={() => navigate("/trust-verification")}
          >
            Next
          </button>

          <div className={styles.pagination}>
            <span className={`${styles.dot} ${styles.activeDot}`}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
