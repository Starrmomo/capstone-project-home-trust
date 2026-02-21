import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // get token from URL

  const BASE_URL = "https://your-backend-url.com";
  const RESET_ENDPOINT = "/api/auth/reset-password";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const isValid =
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const response = await fetch(`${BASE_URL}${RESET_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        alert(data.message || "Reset failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

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

        <h2 className={styles.title}>Reset Password</h2>

        <p className={styles.subtext}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label className={styles.label}>New Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <span
                className={styles.toggle}
                onClick={() => togglePassword("password")}
              >
                {showPassword.password ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
              />
              <span
                className={styles.toggle}
                onClick={() => togglePassword("confirmPassword")}
              >
                {showPassword.confirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!isValid}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}