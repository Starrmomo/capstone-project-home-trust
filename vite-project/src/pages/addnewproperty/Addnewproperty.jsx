import React, { useState } from "react";
import styles from "./Addnewproperty.module.css";

const AddProperty = () => {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [description, setDescription] = useState("");

  const [amenities, setAmenities] = useState({
    power: true,
    water: true,
    wifi: false,
    security: true,
  });

  const toggleAmenity = (key) => {
    setAmenities({ ...amenities, [key]: !amenities[key] });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.backArrow}>←</span>
        <h2>Add New Property</h2>
      </div>

      {/* Step */}
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
            <button onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}>
              −
            </button>
            <span>{bedrooms}</span>
            <button onClick={() => setBedrooms(bedrooms + 1)}>+</button>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.iconBox}>🛁</div>
          <span>Bathrooms</span>
          <div className={styles.counter}>
            <button onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}>
              −
            </button>
            <span>{bathrooms}</span>
            <button onClick={() => setBathrooms(bathrooms + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <h4 className={styles.sectionTitle}>Common Amenities</h4>

      <div className={styles.card}>
        <div className={styles.amenityRow}>
          <div className={styles.iconBox}>⚡</div>
          <div>
            <p>24/7 Power Supply</p>
            <small>Generator or Solar Backup</small>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={amenities.power}
              onChange={() => toggleAmenity("power")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.amenityRow}>
          <div className={styles.iconBox}>💧</div>
          <div>
            <p>Borehole Water</p>
            <small>Treated constant water</small>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={amenities.water}
              onChange={() => toggleAmenity("water")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.amenityRow}>
          <div className={styles.iconBox}>📶</div>
          <div>
            <p>High-speed WiFi</p>
            <small>Fiber optics available</small>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={amenities.wifi}
              onChange={() => toggleAmenity("wifi")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.amenityRow}>
          <div className={styles.iconBox}>🛡</div>
          <div>
            <p>24/7 Gated Security</p>
            <small>CCTV and Uniformed Guards</small>
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={amenities.security}
              onChange={() => toggleAmenity("security")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
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

      <div className={styles.charCount}>
        {description.length}/500 characters
      </div>

      <p className={styles.helperText}>
        A detailed description helps attract quality tenants faster
      </p>

      {/* Buttons */}
      <div className={styles.footerButtons}>
        <button className={styles.backBtn}>Back</button>
        <button
          className={styles.continueBtn}
          disabled={!description}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddProperty;