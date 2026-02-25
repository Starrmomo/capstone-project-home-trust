import { useNavigate } from "react-router-dom";
import styles from "./Kycverifycation.module.css";

import mainIcon from "../../assets/Icon/main-icon.png";
import preventIcon from "../../assets/Icon/prevent-icon.svg";
import protectIcon from "../../assets/Icon/protect-icon.svg";
import trustedIcon from "../../assets/Icon/trusted-icon.svg";

export default function Kycverification() {
  const navigate = useNavigate();

  // 🔥 CHANGE THIS ROUTE TO YOUR OWN NEXT PAGE IF NEEDED
  const NEXT_PAGE_ROUTE = "/selfie-verification";

  const handleSkip = () => {
    navigate(NEXT_PAGE_ROUTE);
  };

  const handleStartVerification = () => {
    navigate(NEXT_PAGE_ROUTE);
  };

  const handleBack = () => {
    navigate(-1); // goes back to previous page
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <button 
            className={styles.backBtn}
            onClick={handleBack}
          >
            ←
          </button>

          <button
            className={styles.skipBtn}
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressTop}>
            <span>Step 4 of 4</span>
            <span>100% Completed</span>
          </div>

          <div className={styles.progressSegments}>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
          </div>
        </div>

        <div className={styles.iconWrapper}>
          <img
            src={mainIcon}
            alt="Verification Icon"
            className={styles.icon}
          />
        </div>

        <h1 className={styles.title}>Verify Your Identity</h1>

        <p className={styles.subtitle}>
          To maintain a secure community for everyone, we need to verify that you are really you.
          It only takes 2 minutes.
        </p>

        <div className={styles.cardItem}>
          <div className={styles.iconCircle}>
            <img src={preventIcon} alt="Prevent Scams Icon" />
          </div>
          <div>
            <h3>Prevent scams</h3>
            <p>We verify every user to keep fake agents out.</p>
          </div>
        </div>

        <div className={styles.cardItem}>
          <div className={styles.iconCircle}>
            <img src={protectIcon} alt="Protect Deposits Icon" />
          </div>
          <div>
            <h3>Protect deposits</h3>
            <p>Secure identity ensures your money is safe.</p>
          </div>
        </div>

        <div className={styles.cardItem}>
          <div className={styles.iconCircle}>
            <img src={trustedIcon} alt="Ensure Trusted Rentals Icon" />
          </div>
          <div>
            <h3>Ensure trusted rentals</h3>
            <p>Build credibility with landlords instantly.</p>
          </div>
        </div>

        <button
          className={styles.primaryBtn}
          onClick={handleStartVerification}
        >
          Start Verification
        </button>

        <button className={styles.linkBtn}>
          Why is this required?
        </button>

      </div>
    </div>
  );
}