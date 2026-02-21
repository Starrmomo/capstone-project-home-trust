// src/api/propertyAPI.js
/*
import axios from "axios";

const API_BASE = "https://your-backend-url.com/api";

// Fetch all properties
export const fetchProperties = async () => {
  try {
    const res = await axios.get(`${API_BASE}/properties`);
    return res.data;
  } catch (err) {
    console.error("Error fetching properties", err);
    throw err;
  }
};

// Upload property
export const uploadProperty = async (propertyData, token) => {
  try {
    const res = await axios.post(`${API_BASE}/properties`, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error uploading property", err);
    throw err;
  }
};


import { useState } from "react";
import styles from "./AddProperty.module.css";
import { submitProperty } from "../api/propertyAPI";

export default function AddProperty() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");

  // Open Gallery
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  // Submit to backend
  const handleSubmit = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      setStatus("pending");
      await submitProperty(formData);
      alert("Listing Submitted! Pending Review (24hrs)");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Property Photos</h2>

      <div className={styles.imageGrid}>
        {images.map((img, index) => (
          <div key={index} className={styles.imageBox}>
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
            />
          </div>
        ))}

        {/* Add Image Box */
        /*
        <label className={styles.addBox}>
          +
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            hidden
          />
        </label>
      </div>

      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
      >
        Submit Listing for Verification
      </button>

      {status === "pending" && (
        <p className={styles.pending}>
           Pending Review (24 hours)
        </p>
      )}
    </div>
  );
}

*/

