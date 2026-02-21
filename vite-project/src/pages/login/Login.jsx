import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import eyeIcon from "../../assets/Icon/eyeicon.svg";

// ✅ Set your backend URLs here
const BASE_URL = "https://your-backend.com"; // ← replace with your base URL
const LOGIN_ENDPOINT = "/api/auth/login"; // ← replace with your login endpoint

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update form values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  // ✅ Password validation rules
  const passwordRules = {
    minLength: 6,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*]/,
  };

  const isPasswordValid = (password) => {
    return (
      password.length >= passwordRules.minLength &&
      passwordRules.hasUpperCase.test(password) &&
      passwordRules.hasLowerCase.test(password) &&
      passwordRules.hasNumber.test(password) &&
      passwordRules.hasSpecialChar.test(password)
    );
  };

  // ✅ Button enabled only if email exists and password is valid
  const isFormValid = formData.email && isPasswordValid(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage(
        "Please enter a valid email and password. Password must have uppercase, lowercase, number, and at least 6 characters."
      );
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      // ✅ API CALL
      const response = await fetch(`${BASE_URL}${LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token for protected routes
        localStorage.setItem("token", data.token);
        navigate("/selfie-verification"); // Navigate to next page
      } else {
        setErrorMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.backArrow} onClick={() => navigate(-1)}>
            ←
          </span>
        </div>

        <h2 className={styles.title}>Log In</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <img
                src={eyeIcon}
                alt="Toggle Password Visibility"
                className={styles.eyeIcon}
                onClick={togglePassword}
              />
            </div>

            {/* Password criteria info */}
            <small className={styles.passwordCriteria}>
              Password must be at least 6 characters, include uppercase,
              lowercase, number, and special character.
            </small>
          </div>

          {/* Error message */}
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Forgot Password link */}
        <p className={styles.linkText}>
          <Link to="/reset-password">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
}