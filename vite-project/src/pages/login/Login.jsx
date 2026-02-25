import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginAsync, clearError } from "../../store/slices/authSlice";
import styles from "./Login.module.css";
import eyeIcon from "../../assets/Icon/eyeicon.svg";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  // Clear errors when component mounts or form changes
  useEffect(() => {
    dispatch(clearError());
    setLocalError("");
  }, [dispatch]);

  // Navigate on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/selfie-verification");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (localError || error) {
      setLocalError("");
      dispatch(clearError());
    }
  };
  
  const togglePassword = () => setShowPassword(!showPassword);

  const passwordRules = {
    minLength: 6,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*]/,
  };

  const isPasswordValid = (password) =>
    password.length >= passwordRules.minLength &&
    passwordRules.hasUpperCase.test(password) &&
    passwordRules.hasLowerCase.test(password) &&
    passwordRules.hasNumber.test(password) &&
    passwordRules.hasSpecialChar.test(password);

  const isFormValid = formData.email && isPasswordValid(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setLocalError(
        "Please enter a valid email and password. Password must have uppercase, lowercase, number, and at least 6 characters."
      );
      return;
    }

    setLocalError("");
    dispatch(clearError());

    // Dispatch login action
    const result = await dispatch(loginAsync(formData));
    
    // Check if login was successful
    if (loginAsync.fulfilled.match(result)) {
      // Navigation will happen automatically via useEffect when isAuthenticated becomes true
    } else if (loginAsync.rejected.match(result)) {
      // Error is already set in Redux state, no need to set local error
      setLocalError(result.payload || "Login failed. Please try again.");
    }
  };

  // Combine Redux error and local error for display
  const errorMessage = error || localError;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.backArrow} onClick={() => navigate(-1)}>←</span>
        </div>

        <h2 className={styles.title}>Log In</h2>

        <form onSubmit={handleSubmit}>
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

            <small className={styles.passwordCriteria}>
              Password must be at least 6 characters, include uppercase, lowercase, number, and special character.
            </small>
          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className={styles.linkText}>
          <Link to="/reset-password">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
}