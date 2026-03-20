import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Homeicon from '../../assets/Icon/properties.svg?react';
import Listingicon from '../../assets/Icon/listicon.svg?react';
export default function Home() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedRole) return;

    // ✅ Save role permanently
    localStorage.setItem("userRole", selectedRole);

    // Move to signup
    navigate("/signup");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <div className={styles.topRow}>
          <span className={styles.backArrow}>←</span>
        </div>

        <div className={styles.progressRow}>
          <span className={styles.step}>Step 1 of 4</span>
          <span className={styles.completed}>0% Completed</span>
        </div>

        <div className={styles.progressBar}></div>

        <h3 className={styles.title}>
          How do you want to use HomeTrust?
        </h3>

        <p className={styles.subtitle}>
          Choose your role to get started
          <br />
          with verified listings.
        </p>

        <div
          className={`${styles.option} ${selectedRole === "tenant" ? styles.active : ""
            }`}
          onClick={() => setSelectedRole("tenant")}
        >
          <div className={styles.iconCircle}><Listingicon width="20px" height="20px"   /></div>
          <h3>I am a Tenant</h3>
          <p>Find verified homes and pay securely.</p>
        </div>

        <div
          className={`${styles.option} ${selectedRole === "landlord" ? styles.active : ""
            }`}
          onClick={() => setSelectedRole("landlord")}
        >
          <div className={styles.iconCircle}><Homeicon/></div>
          <h3>I am a Landlord</h3>
          <p>List properties and find verified tenants.</p>
        </div>

        <button
          className={styles.continueBtn}
          disabled={!selectedRole}
          onClick={handleContinue}
        >
          Continue
        </button>

        <p className={styles.terms}>
          By continuing, you agree to our{" "}
          <Link to="/termsandcondition" className={styles.link}>
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link to="/termsandcondition" className={styles.link}>
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
}









