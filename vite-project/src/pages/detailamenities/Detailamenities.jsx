import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Detailamenities.module.css";

const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive previous step data
  const { formData: prevData } = location.state || {};

  // Step 2 states
  const [bedrooms, setBedrooms] = useState(prevData?.bedrooms || 2);
  const [bathrooms, setBathrooms] = useState(prevData?.bathrooms || 2);
  const [description, setDescription] = useState(prevData?.description || "");
  const [amenities, setAmenities] = useState(prevData?.amenities || {
    power: true,
    water: true,
    wifi: false,
    security: true,
  });

  const toggleAmenity = (key) => {
    setAmenities({ ...amenities, [key]: !amenities[key] });
  };

  // Form valid if description is filled
  const isFormValid = description.trim().length > 0;

  // Continue button handler
  const handleContinue = () => {
    if (!isFormValid) return;

    // Merge previous step data with current step
    const updatedFormData = {
      ...prevData,
      bedrooms,
      bathrooms,
      description,
      amenities,
    };

    navigate("/feebreakdown", {
      state: { formData: updatedFormData },
    });
  };

  // Back button handler
  const handleBack = () => {
    navigate("/basicinfo", { state: { formData: prevData } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.backArrow} onClick={handleBack}>←</span>
        <h2>Add New Property</h2>
      </div>

      {/* Step Section */}
      <div className={styles.stepSection}>
        <p className={styles.stepText}>Step 2 of 4</p>
        <p className={styles.stepTitle}>Details & Amenities</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>

      {/* Property Basics */}
      <h4 className={styles.sectionTitle}>Property Basics</h4>
      <div className={styles.card}>
        <div className={styles.row}>
          <div className={styles.iconBox}>🛏</div>
          <span>Bedrooms</span>
          <div className={styles.counter}>
            <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}>−</button>
            <span>{bedrooms}</span>
            <button onClick={() => setBedrooms(bedrooms + 1)}>+</button>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.iconBox}>🛁</div>
          <span>Bathrooms</span>
          <div className={styles.counter}>
            <button onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}>−</button>
            <span>{bathrooms}</span>
            <button onClick={() => setBathrooms(bathrooms + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <h4 className={styles.sectionTitle}>Common Amenities</h4>
      <div className={styles.card}>
        {Object.entries({
          power: { icon: "⚡", name: "24/7 Power Supply", desc: "Generator or Solar Backup" },
          water: { icon: "💧", name: "Borehole Water", desc: "Treated constant water" },
          wifi: { icon: "📶", name: "High-speed WiFi", desc: "Fiber optics available" },
          security: { icon: "🛡", name: "24/7 Gated Security", desc: "CCTV and Uniformed Guards" },
        }).map(([key, val]) => (
          <div className={styles.amenityRow} key={key}>
            <div className={styles.iconBox}>{val.icon}</div>
            <div>
              <p>{val.name}</p>
              <small>{val.desc}</small>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={amenities[key]}
                onChange={() => toggleAmenity(key)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>

      {/* Location / Description */}
      <h4 className={styles.sectionTitle}>Location</h4>
      <textarea
        className={styles.textarea}
        placeholder="Describe your property's unique features, neighborhood vibe or any specific rules..."
        maxLength={500}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.charCount}>{description.length}/500 characters</div>
      <p className={styles.helperText}>A detailed description helps attract quality tenants faster</p>

      {/* Footer Buttons */}
      <div className={styles.footerButtons}>
        <button className={styles.backBtn} onClick={handleBack}>Back</button>
        <button
          className={`${styles.continueBtn} ${isFormValid ? styles.activeBtn : ""}`}
          disabled={!isFormValid}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddProperty;