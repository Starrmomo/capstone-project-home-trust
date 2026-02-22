import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import styles from "./Signup.module.css";

// ✅ PUT YOUR SIGNUP API URL HERE
const SIGNUP_API = "https://hometrust-backend.duckdns.org/api/auth/signup";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const role = searchParams.get("role") || "tenant";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isPasswordValid = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.password &&
    termsAccepted &&
    isPasswordValid(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage(
        "Please complete all fields correctly. Password must have uppercase, lowercase, number, special character, and at least 6 characters."
      );
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://hometrust-backend.duckdns.org/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/verify-phone", { state: { phone: formData.phone } });
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
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

        <div className={styles.progressRow}>
          <span className={styles.step}>Step 2 of 4</span>
          <span className={styles.completed}>25% Completed</span>
        </div>
        <div className={styles.progressBar}></div>

        <h3 className={styles.title}>Create Your Account</h3>

        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.group}>
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

          <div className={styles.group}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <span
                className={styles.toggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <small className={styles.passwordCriteria}>
              Password must be at least 6 characters, include uppercase,
              lowercase, number, and special character.
            </small>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <div className={styles.checkboxWrapper}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              I agree to the{" "}
              <span
                className={styles.linkText}
                onClick={() => navigate("/termsandcondition")}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span className={styles.linkText}>Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={styles.button}
          >
            {loading
              ? "Creating Account..."
              : role === "tenant"
              ? "Create Tenant Account"
              : "Create Landlord Account"}
          </button>
        </form>

        <p className={styles.link}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}