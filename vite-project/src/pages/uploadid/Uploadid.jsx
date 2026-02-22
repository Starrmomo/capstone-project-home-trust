import styles from "./Uploadid.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Uploadid() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [idType, setIdType] = useState("National Identity Number (NIN)");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      setMessage("Please upload an ID image first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("idType", idType);
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://hometrust-backend.duckdns.org/api/verification/verify",
        {
          method: "POST",
          body: formData,
        }
      );

      // Handle non-JSON safely
      if (!response.ok) {
        let errorMessage = "Verification failed.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.status === "success") {
        setMessage("Verification Successful ✅");

        // ✅ Read role from localStorage
        const role = localStorage.getItem("role");

        setTimeout(() => {
          if (role === "tenant") {
            navigate("/tenant/dashboard");
          } else if (role === "landlord") {
            navigate("/landlord/dashboard");
          } else {
            // fallback safety
            navigate("/");
          }
        }, 1500);

      } else {
        setMessage(data.message || "Verification Failed ❌");
      }

    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.back} onClick={() => navigate(-1)}>←</span>
      </div>

      <div className={styles.stepSection}>
        <div className={styles.stepTop}>
          <span>Step 4 of 4</span>
          <span>100% Completed</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>

      <div className={styles.titleSection}>
        <h1>Upload Government ID</h1>
        <p>
          We need to verify your identity to keep your account secure.
        </p>
      </div>

      <div className={styles.formGroup}>
        <label>SELECT ID TYPE</label>
        <div className={styles.selectWrapper}>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option>National Identity Number (NIN)</option>
            <option>Driver’s License</option>
            <option>International Passport</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>DOCUMENT SCAN</label>

        <div className={styles.uploadBox}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {message && <p>{message}</p>}

      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>!</span>
        <p>
          Ensure all details are clear and readable.
        </p>
      </div>

      <div className={styles.encrypted}>
        🔒 END - TO - END ENCRYPTED
      </div>

      <button
        className={styles.continueBtn}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}