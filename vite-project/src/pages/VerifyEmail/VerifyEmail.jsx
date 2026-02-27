// // import { useState, useRef, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import styles from "./VerifyEmail.module.css";
// // import { API } from "../../config"; // ✅ uses API from config.js

// // const OTP_LENGTH = 6;
// // const COUNTDOWN_SECONDS = 300; // 5 minutes

// // export default function VerifyEmail() {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const email = location.state?.email || "";

// //   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
// //   const [isComplete, setIsComplete] = useState(false);
// //   const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
// //   const [canResend, setCanResend] = useState(false);
// //   const [isExpired, setIsExpired] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const inputsRef = useRef([]);

// //   useEffect(() => {
// //     setIsComplete(otp.every((digit) => digit !== ""));
// //   }, [otp]);

// //   useEffect(() => {
// //     if (timer === 0) {
// //       setCanResend(true);
// //       setIsExpired(true);
// //       setErrorMessage("OTP has expired. Please request a new one.");
// //       return;
// //     }
// //     const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
// //     return () => clearInterval(interval);
// //   }, [timer]);

// //   const handleChange = (value, index) => {
// //     if (!/^\d?$/.test(value)) return;
// //     const newOtp = [...otp];
// //     newOtp[index] = value;
// //     setOtp(newOtp);
// //     if (value && index < OTP_LENGTH - 1) inputsRef.current[index + 1].focus();
// //   };

// //   const handleKeyDown = (e, index) => {
// //     if (e.key === "Backspace" && !otp[index] && index > 0) {
// //       inputsRef.current[index - 1].focus();
// //     }
// //   };

// //   const handleResend = async () => {
// //     if (!canResend) return;
// //     try {
// //       await fetch(`${API}/phone-verification/resend`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       });

// //       setOtp(Array(OTP_LENGTH).fill(""));
// //       setTimer(COUNTDOWN_SECONDS);
// //       setCanResend(false);
// //       setIsExpired(false);
// //       setErrorMessage("");
// //     } catch (err) {
// //       console.error("Resend error:", err);
// //       setErrorMessage("Failed to resend OTP. Try again.");
// //     }
// //   };

// //   const handleVerify = async () => {
// //     if (!isComplete || isExpired) return;
// //     const code = otp.join("");

// //     try {
// //       const response = await fetch(`${API}/phone-verification/verify`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, code }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         if (data.token) localStorage.setItem("token", data.token);
// //         navigate("/selfie-verification");
// //       } else {
// //         setErrorMessage(data.message || "Invalid or expired code.");
// //       }
// //     } catch (err) {
// //       console.error("Verify error:", err);
// //       setErrorMessage("Something went wrong. Please try again.");
// //     }
// //   };

// //   const minutes = Math.floor(timer / 60);
// //   const seconds = timer % 60;

// //   return (
// //     <div className={styles.wrapper}>
// //       <div className={styles.card}>
// //         <div className={styles.topRow}>
// //           <span className={styles.backArrow} onClick={() => navigate(-1)}>←</span>
// //         </div>

// //         <div className={styles.progressWrapper}>
// //           <div className={styles.progressTop}>
// //             <span>Step 3 of 4</span>
// //             <span>75% Completed</span>
// //           </div>
// //           <div className={styles.progressBar}>
// //             <div className={styles.progressFill}></div>
// //           </div>
// //         </div>

// //         <h2 className={styles.title}>Verify Your Email</h2>
// //         <p className={styles.subtitle}>
// //           Enter the 6-digit code sent to <strong>{email}</strong>
// //         </p>

// //         <div className={styles.otpWrapper}>
// //           {otp.map((digit, index) => (
// //             <input
// //               key={index}
// //               type="text"
// //               maxLength="1"
// //               value={digit}
// //               ref={(el) => (inputsRef.current[index] = el)}
// //               onChange={(e) => handleChange(e.target.value, index)}
// //               onKeyDown={(e) => handleKeyDown(e, index)}
// //               className={`${styles.otpInput} ${digit ? styles.activeInput : ""}`}
// //               disabled={isExpired}
// //             />
// //           ))}
// //         </div>

// //         {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}

// //         <p className={styles.resendText}>
// //           {isExpired
// //             ? "Code expired."
// //             : `Resend in ${minutes}:${seconds.toString().padStart(2, "0")}`}
// //         </p>

// //         <button
// //           className={styles.resendBtn}
// //           onClick={handleResend}
// //           disabled={!canResend}
// //         >
// //           {canResend ? "Resend Code" : "Wait..."}
// //         </button>

// //         <button
// //           disabled={!isComplete || isExpired}
// //           onClick={handleVerify}
// //           className={`${styles.verifyBtn} ${isComplete && !isExpired ? styles.enabled : ""}`}
// //         >
// //           Verify Email
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }











// import { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import styles from "./VerifyEmail.module.css";
// import Kycverification from "../verifyidentity/Kycverifycation";

// const OTP_LENGTH = 6;
// const COUNTDOWN_SECONDS = 300; // 5 minutes

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || "example@email.com";

//   // 🔥 CHANGE THIS IF YOU WANT TO NAVIGATE SOMEWHERE ELSE
//   const NEXT_PAGE_ROUTE = "/kycverifycation";

//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [isComplete, setIsComplete] = useState(false);
//   const [timer, setTimer] = useState(COUNTDOWN_SECONDS);
//   const [canResend, setCanResend] = useState(false);
//   const [isExpired, setIsExpired] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const inputsRef = useRef([]);

//   useEffect(() => {
//     setIsComplete(otp.every((digit) => digit !== ""));
//   }, [otp]);

//   useEffect(() => {
//     if (timer === 0) {
//       setCanResend(true);
//       setIsExpired(true);
//       return;
//     }
//     const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < OTP_LENGTH - 1) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   // 🔥 Dummy Resend (No API)
//   const handleResend = () => {
//     if (!canResend) return;

//     setOtp(Array(OTP_LENGTH).fill(""));
//     setTimer(COUNTDOWN_SECONDS);
//     setCanResend(false);
//     setIsExpired(false);
//     setErrorMessage("");
//   };

//   // 🔥 Dummy Verify (Always Success if 6 digits entered)
//   const handleVerify = () => {
//     if (!isComplete || isExpired) return;

//     // No API — Always succeed
//     navigate(Kycverification);
//   };

//   const minutes = Math.floor(timer / 60);
//   const seconds = timer % 60;

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <div className={styles.topRow}>
//           <span
//             className={styles.backArrow}
//             onClick={() => navigate(-1)}
//           >
//             ←
//           </span>
//         </div>

//         <div className={styles.progressWrapper}>
//           <div className={styles.progressTop}>
//             <span>Step 3 of 4</span>
//             <span>75% Completed</span>
//           </div>
//           <div className={styles.progressBar}>
//             <div className={styles.progressFill}></div>
//           </div>
//         </div>

//         <h2 className={styles.title}>Verify Your Email</h2>
//         <p className={styles.subtitle}>
//           Enter any 6-digit code sent to <strong>{email}</strong>
//         </p>

//         <div className={styles.otpWrapper}>
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className={`${styles.otpInput} ${
//                 digit ? styles.activeInput : ""
//               }`}
//               disabled={isExpired}
//             />
//           ))}
//         </div>

//         {errorMessage && (
//           <p style={{ color: "red", marginTop: "10px" }}>
//             {errorMessage}
//           </p>
//         )}

//         <p className={styles.resendText}>
//           {isExpired
//             ? "Code expired."
//             : `Resend in ${minutes}:${seconds
//                 .toString()
//                 .padStart(2, "0")}`}
//         </p>

//         <button
//           className={styles.resendBtn}
//           onClick={handleResend}
//           disabled={!canResend}
//         >
//           {canResend ? "Resend Code" : "Wait..."}
//         </button>

//         <button
//           disabled={!isComplete || isExpired}
//           onClick={handleVerify}
//           className={`${styles.verifyBtn} ${
//             isComplete && !isExpired ? styles.enabled : ""
//           }`}
//         >
//           Verify Email
//         </button>
//       </div>
//     </div>
//   );
// }





















// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import styles from "./VerifyEmail.module.css";

// export default function VerifyEmail() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email || "example@email.com";

//   const [otp, setOtp] = useState(Array(6).fill(""));

//   const inputsRef = [];

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < 5) {
//       inputsRef[index + 1].focus();
//     }
//   };

//   const handleVerify = () => {
//     if (otp.some((d) => d === "")) return;

//     // ✅ Navigate to Upload ID
//     navigate("/upload-id");
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <div className={styles.topRow}>
//           <span
//             className={styles.backArrow}
//             onClick={() => navigate(-1)}
//           >
//             ←
//           </span>
//         </div>

//         <div className={styles.progressWrapper}>
//           <div className={styles.progressTop}>
//             <span>Step 3 of 4</span>
//             <span>75% Completed</span>
//           </div>
//           <div className={styles.progressBar}>
//             <div className={styles.progressFill}></div>
//           </div>
//         </div>

//         <h2 className={styles.title}>Verify Your Email</h2>
//         <p className={styles.subtitle}>
//           Enter any 6-digit code sent to <strong>{email}</strong>
//         </p>

//         <div className={styles.otpWrapper}>
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               className={`${styles.otpInput} ${digit ? styles.activeInput : ""}`}
//             />
//           ))}
//         </div>

//         <button
//           className={styles.verifyBtn}
//           onClick={handleVerify}
//         >
//           Verify Email
//         </button>
//       </div>
//     </div>
//   );
// }





import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./VerifyEmail.module.css";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "example@email.com";

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]); // persist input references

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input automatically
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // move back if cleared
    if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.some((d) => d === "")) return;

    // ✅ Navigate to your KYC page
    navigate("/kycverifycation"); // make sure this route exists in your router
  };

  const isComplete = otp.every((d) => d !== ""); // active button if all filled

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span
            className={styles.backArrow}
            onClick={() => navigate(-1)}
          >
            ←
          </span>
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
          Enter any 6-digit code sent to <strong>{email}</strong>
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
              className={`${styles.otpInput} ${digit ? styles.activeInput : ""}`}
            />
          ))}
        </div>

        <button
          className={`${styles.verifyBtn} ${isComplete ? styles.activeBtn : ""}`}
          onClick={handleVerify}
          disabled={!isComplete} // only clickable when all digits entered
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}