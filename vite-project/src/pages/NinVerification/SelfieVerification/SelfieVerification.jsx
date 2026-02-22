import { useNavigate } from "react-router-dom";
import styles from "./SelfieVerification.module.css";

import selfieImage from "../../../assets/Icon/selfie-placeholder.png";
import babyIcon from "../../../assets/Icon/selfieicon.svg";
import cameraIcon from "../../../assets/Icon/cameraicon.svg";

export default function SelfieVerification() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressTop}>
            <span>Step 4 of 4</span>
            <span>100% Completed</span>
          </div>
        </div>

        <div className={styles.badge}>
          <img src={babyIcon} alt="Selfie icon" className={styles.badgeIcon}/>
          <span>Selfie Verification</span>
        </div>

        <h1 className={styles.title}>Let's verify your identity</h1>

        <div className={styles.cameraWrapper}>
          <div className={styles.cameraFrame}>
            <img
              src={selfieImage}
              alt="Selfie Preview"
              className={styles.selfieImage}
            />
          </div>
        </div>

        <p className={styles.instruction}>
          You will upload your ID on the next screen
        </p>

        <button
          className={styles.captureBtn}
          onClick={() => navigate("/uploadid")}
        >
          <img src={cameraIcon} alt="Camera" className={styles.cameraIcon}/>
          Continue
        </button>

      </div>
    </div>
  );
}