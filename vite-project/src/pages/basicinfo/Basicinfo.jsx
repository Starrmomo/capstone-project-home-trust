import React, { useState, useEffect } from "react";
import styles from "./Basicinfo.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const AddProperty = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [locationText, setLocationText] = useState("");
  const [position, setPosition] = useState(null);

  // Get landlord current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  // Map click handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  const isFormValid =
    title.trim() !== "" &&
    type !== "" &&
    locationText.trim() !== "" &&
    position !== null;

  const handleContinue = () => {
    if (!isFormValid) return;

    // Wrap data in formData for consistency
    const formData = {
      title,
      type,
      locationText,
      latitude: position[0],
      longitude: position[1],
    };

    navigate("/detailamenities", { state: { formData } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Add New Property</h2>
      </div>

      <div className={styles.stepRow}>
        <span className={styles.stepActive}>Step 1 of 4</span>
        <span className={styles.stepLabel}>Basic Info</span>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progress}></div>
      </div>

      <div className={styles.content}>
        <h3>Property Basics</h3>
        <p className={styles.subtitle}>
          Start by providing a clear title and location to help tenants find
          your verified listing.
        </p>

        {/* Property Title */}
        <div className={styles.inputGroup}>
          <label>Property Title</label>
          <input
            type="text"
            placeholder="e.g., Modern 2-Bedroom Apartment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Property Type */}
        <div className={styles.inputGroup}>
          <label>Property Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select a type</option>
            <option>Apartment</option>
            <option>Duplex</option>
            <option>Terrace House</option>
            <option>Detached House</option>
          </select>
        </div>

        {/* Location */}
        <div className={styles.inputGroup}>
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter street address or area"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
          />
        </div>

        {/* Map */}
        <div className={styles.mapBox}>
          {position && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          )}
        </div>

        {/* Verification Info */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>✓</div>
          <div>
            <strong>Verification First</strong>
            <p>
              Providing accurate info helps our team verify your listing 2x
              faster.
            </p>
          </div>
        </div>

        <button
          className={`${styles.continueBtn} ${isFormValid ? styles.activeBtn : ""}`}
          disabled={!isFormValid}
          onClick={handleContinue}
        >
          Continue to Details →
        </button>
      </div>
    </div>
  );
};

export default AddProperty;