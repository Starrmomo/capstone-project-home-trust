import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./SelfieVerification.module.css";
import selfieImage from "../../../assets/Icon/selfie-placeholder.png";

import babyIcon from "../../../assets/Icon/selfieicon.svg";
import cameraIcon from "../../../assets/Icon/cameraicon.svg";

export default function SelfieVerification() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [error, setError] = useState("");

  // ================================
  // STEP 1: REQUEST VERIFICATION SESSION FROM BACKEND
  // ================================
  const createVerificationSession = async () => {
    try {
      setLoading(true);

      // 🔴 REPLACE THIS WITH YOUR BACKEND URL
      const response = await fetch(
        "https://your-backend.com/api/create-verification-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      // Backend should return:
      // {
      //   token: "...",
      //   sessionId: "...",
      // }

      setSessionToken(data.token);

    } catch (err) {
      setError("Unable to start verification.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // STEP 2: LOAD SMART ID SDK HERE
  // ================================
  useEffect(() => {
    if (!sessionToken) return;

    // 🟡 THIS IS WHERE SMART ID SDK WILL BE INITIALIZED
    // Example structure (your real SDK may differ):

    /*
    SmartID.initialize({
      token: sessionToken,
      container: "#smartid-container",
      onSuccess: handleVerificationSuccess,
      onError: handleVerificationFailure,
    });
    */

  }, [sessionToken]);

  // ================================
  // STEP 3: HANDLE SUCCESS
  // ================================
  const handleVerificationSuccess = async (result) => {

    // result may contain:
    // matchScore
    // liveness
    // verified

    try {
      // 🔴 SEND RESULT TO YOUR BACKEND FOR FINAL VALIDATION
      await fetch("https://your-backend.com/api/confirm-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(result),
      });

      // If backend confirms:
      navigate("/dashboard");

    } catch (err) {
      setError("Verification failed.");
    }
  };

  // ================================
  // STEP 4: HANDLE FAILURE
  // ================================
  const handleVerificationFailure = () => {
    setError("Face verification failed. Please try again.");
  };

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

          <div className={styles.progressSegments}>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
            <span className={`${styles.segment} ${styles.filled}`}></span>
          </div>
        </div>

        <div className={styles.badge}>
          <img
            src={babyIcon}
            alt="Selfie icon"
            className={styles.badgeIcon}
          />
          <span>Selfie Verification</span>
        </div>

        <h1 className={styles.title}>Let's verify your identity</h1>

        <div className={styles.cameraWrapper}>
          <div className={styles.cameraFrame}>

            {/* 🔴 SMART ID SDK WILL RENDER CAMERA HERE */}
            <div id="smartid-container" style={{ width: "100%", height: "100%" }}>
              {!sessionToken && (
                <img
                  src={selfieImage}
                  alt="Selfie Preview"
                  className={styles.selfieImage}
                />
              )}
            </div>

            <div className={styles.overlay}></div>
          </div>
        </div>

        <p className={styles.instruction}>
          Align your face within the frame
        </p>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>✓</span>
          <span>This helps prevent identity theft</span>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className={styles.captureBtn}
          onClick={createVerificationSession}
          disabled={loading}
        >
          <img
            src={cameraIcon}
            alt="Camera"
            className={styles.cameraIcon}
          />
          {loading ? "Starting..." : "Capture Photo"}
        </button>

      </div>
    </div>
  );
}