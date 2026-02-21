import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./VerifyPhone.module.css";

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 30; // code expiry

export default function VerifyPhone() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "+234 000••••00"; // dynamic phone from signup
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);

  // Replace with your backend info
  const BASE_URL = "https://your-backend.com";
  const VERIFY_ENDPOINT = "/api/auth/verify-phone";

  // Focus and verify logic
  useEffect(() => {
    setIsComplete(otp.every((digit) => digit !== ""));
  }, [otp]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimer(COUNTDOWN_SECONDS);
    setCanResend(false);
    // TODO: Call backend to resend OTP
    console.log("Resend code to", phone);
  };

  const handleVerify = async () => {
    if (!isComplete) return;
    const code = otp.join("");
    try {
      const response = await fetch(`${BASE_URL}${VERIFY_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/selfie-verification"); // next step after successful verification
      } else {
        alert(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      console.error("Verify error:", err);
    }
  };

  // Mask phone: +234 812••••98
  const maskedPhone = phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 $2••••$4");

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.backArrow} onClick={() => navigate(-1)}>←</span>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressTop}>
            <span>Step 3 of 4</span>
            <span>75% Completed</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        <h2 className={styles.title}>Verify Your Phone Number</h2>
        <p className={styles.subtitle}>
          Enter the 6-digit code we sent to {maskedPhone}
        </p>

        <div className={styles.otpWrapper}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${styles.otpInput} ${digit ? styles.activeInput : ""}`}
            />
          ))}
        </div>

        <p className={styles.resendText}>
          Didn’t receive the code? {canResend ? "" : `Resend in 00:${timer.toString().padStart(2,"0")}s`}
        </p>

        <button className={styles.resendBtn} onClick={handleResend} disabled={!canResend}>
          {canResend ? "Resend Code" : "Wait..."}
        </button>

        <button
          disabled={!isComplete}
          onClick={handleVerify}
          className={`${styles.verifyBtn} ${isComplete ? styles.enabled : ""}`}
        >
          Verify Phone Number
        </button>
      </div>
    </div>
  );
}