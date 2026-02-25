import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { API } from "../../config"; // ✅ uses API from config.js

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 300; // 5 minutes

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const inputsRef = useRef([]);

  // Automatically request verification code when component mounts
  useEffect(() => {
    const requestVerificationCode = async () => {
      if (!email) {
        setErrorMessage("Email is required. Please go back and sign up again.");
        return;
      }

      // Check if API is configured
      if (!API) {
        console.error("API base URL is not configured. Please set VITE_API_BASE_URL in your .env file.");
        setErrorMessage("Configuration error. Please contact support.");
        return;
      }

      setIsSendingCode(true);
      try {
        // Try the send endpoint first
        const sendUrl = `${API}/phone-verification/send`;
        console.log("Requesting verification code from:", sendUrl);
        
        const response = await fetch(sendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
          // If send endpoint doesn't exist (404), try resend endpoint as fallback
          if (response.status === 404) {
            console.log("Send endpoint not found, trying resend endpoint...");
            const resendUrl = `${API}/phone-verification/resend`;
            const resendResponse = await fetch(resendUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            
            if (!resendResponse.ok) {
              const resendData = await resendResponse.json();
              setErrorMessage(resendData.message || "Failed to send verification code. Please try resending.");
            } else {
              console.log("Verification code sent successfully via resend endpoint");
            }
          } else {
            setErrorMessage(data.message || "Failed to send verification code. Please try resending.");
          }
        } else {
          console.log("Verification code sent successfully");
        }
      } catch (err) {
        console.error("Send code error:", err);
        console.error("Error details:", {
          message: err.message,
          API: API,
          email: email
        });
        // Don't show error immediately - code might have been sent during signup
        // User can use resend button if needed
      } finally {
        setIsSendingCode(false);
      }
    };

    requestVerificationCode();
  }, [email]);

  useEffect(() => {
    setIsComplete(otp.every((digit) => digit !== ""));
  }, [otp]);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      setIsExpired(true);
      setErrorMessage("OTP has expired. Please request a new one.");
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

  const handleResend = async () => {
    if (!canResend) return;
    
    setErrorMessage("");
    setIsSendingCode(true);
    
    try {
      const response = await fetch(`${API}/phone-verification/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtp(Array(OTP_LENGTH).fill(""));
        setTimer(COUNTDOWN_SECONDS);
        setCanResend(false);
        setIsExpired(false);
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerify = async () => {
    if (!isComplete || isExpired) return;
    const code = otp.join("");

    if (!API) {
      setErrorMessage("Configuration error. Please contact support.");
      return;
    }

    setErrorMessage("");
    
    try {
      const verifyUrl = `${API}/phone-verification/verify`;
      console.log("Verifying code with:", verifyUrl);
      
      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) localStorage.setItem("token", data.token);
        navigate("/selfie-verification");
      } else {
        setErrorMessage(data.message || "Invalid or expired code.");
      }
    } catch (err) {
      console.error("Verify error:", err);
      console.error("Error details:", {
        message: err.message,
        API: API,
        email: email
      });
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

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

        <h2 className={styles.title}>Verify Your Email</h2>
        <p className={styles.subtitle}>
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>
        {isSendingCode && (
          <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
            Sending verification code...
          </p>
        )}

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
              disabled={isExpired}
            />
          ))}
        </div>

        {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}

        <p className={styles.resendText}>
          {isExpired
            ? "Code expired."
            : `Resend in ${minutes}:${seconds.toString().padStart(2, "0")}`}
        </p>

        <button
          className={styles.resendBtn}
          onClick={handleResend}
          disabled={!canResend || isSendingCode}
        >
          {isSendingCode ? "Sending..." : canResend ? "Resend Code" : "Wait..."}
        </button>

        <button
          disabled={!isComplete || isExpired}
          onClick={handleVerify}
          className={`${styles.verifyBtn} ${isComplete && !isExpired ? styles.enabled : ""}`}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}