import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Uploadhouselisting.module.css";
import { FiCamera, FiX, FiInfo, FiPlus } from "react-icons/fi";
import { API } from "../../config"; // ✅ added API import from config
import Cover from "../../assets/Icon/SetCover.svg?react";
import Verify from "../../assets/Icon/Verification.svg?react";

// Limits to avoid 413 Payload Too Large (backend may have a lower limit)
const MAX_IMAGE_SIZE_MB = 2;
const MAX_UTILITY_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const MAX_UTILITY_SIZE_BYTES = MAX_UTILITY_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_SIZE_MB = 15;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

export default function AddPropertyCombined() {
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Receive all previous pages data (Fee Breakdown + earlier pages)
  const previousFormData = location.state?.formData || {};

  // -------------------------
  // States
  // -------------------------
  const [images, setImages] = useState([]);
  const [utilityBillFile, setUtilityBillFile] = useState(null);
  const [checklist, setChecklist] = useState({
    clearLighting: true,
    ownershipVerification: true,
    exteriorShot: false,
  });
  const [status, setStatus] = useState("idle"); // idle | pending | verified | error
  const [fileSizeWarning, setFileSizeWarning] = useState("");

  // -------------------------
  // Image Handlers
  // -------------------------
  const handleImageClick = () => imageInputRef.current.click();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFileSizeWarning("");
    setImages((prev) => {
      const updated = [...prev];
      let skipped = 0;
      files.forEach((file) => {
        if (updated.length >= 6) return;
        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          skipped++;
          return;
        }
        updated.push(file);
      });
      if (skipped > 0) {
        setFileSizeWarning(`Some images were skipped (max ${MAX_IMAGE_SIZE_MB}MB per image).`);
      }
      return updated;
    });
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFileSizeWarning("");
  };

  // -------------------------
  // Utility Bill Handler
  // -------------------------
  const handleUtilityChange = (e) => {
    const file = e.target.files?.[0];
    setFileSizeWarning("");
    if (!file) return;
    if (file.size > MAX_UTILITY_SIZE_BYTES) {
      setFileSizeWarning(`Utility bill must be under ${MAX_UTILITY_SIZE_MB}MB.`);
      return;
    }
    setUtilityBillFile(file);
  };

  // -------------------------
  // Checklist Handler
  // -------------------------
  const handleChecklistChange = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // -------------------------
  // Submit Handler
  // -------------------------
  const handleSubmit = async () => {
    if (images.length === 0 || !utilityBillFile || !checklist.exteriorShot) return;

    // Check total size to avoid 413 (backend body limit)
    const totalBytes = images.reduce((sum, f) => sum + (f?.size || 0), 0) + (utilityBillFile?.size || 0);
    if (totalBytes > MAX_TOTAL_SIZE_BYTES) {
      setFileSizeWarning(`Total files are too large (max ${MAX_TOTAL_SIZE_MB}MB). Use smaller images (under ${MAX_IMAGE_SIZE_MB}MB each).`);
      alert(`Files are too large. Please keep property images under ${MAX_IMAGE_SIZE_MB}MB each and total under ${MAX_TOTAL_SIZE_MB}MB.`);
      return;
    }

    setStatus("pending");
    setFileSizeWarning("");

    const formData = new FormData();

    // ✅ Append previous pages data (handles arrays correctly)
    Object.entries(previousFormData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    });

    // ✅ Append property images
    images.forEach((imgFile) => formData.append("propertyImages", imgFile));

    // ✅ Append utility bill
    formData.append("utilityBill", utilityBillFile);

    // ✅ Append checklist
    formData.append("checklist", JSON.stringify(checklist));

    try {
      const response = await fetch(
        `${API}/verification/upload`,
        { method: "POST", body: formData }
      );

      if (response.status === 413) {
        setStatus("error");
        alert("Upload rejected: files are too large. Use images under 2MB each and try again.");
        return;
      }

      if (!response.ok) {
        const errText = await response.text();
        let errMsg = "Server error";
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.message || errMsg;
        } catch { /* ignore */ }
        throw new Error(errMsg);
      }

      const result = await response.json();

      if (result.status === "verified") {
        setStatus("verified");
        alert("Listing verified and uploaded successfully!");
        navigate("/landlord/dashboard");
      } else {
        setStatus("error");
        alert(result.message || "Property could not be verified.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      // Network/CORS failure often happens when server returns 413 without CORS headers
      const isNetworkError = error?.name === "TypeError" && (error?.message?.includes("fetch") || error?.message?.includes("network"));
      if (isNetworkError) {
        alert("Upload failed. The server may have rejected the request because files are too large. Please use images under 2MB each and try again.");
      } else {
        alert(error?.message || "Verification failed. Please try again.");
      }
    }
  };

  const isFormComplete =
    images.length > 0 && utilityBillFile && checklist.exteriorShot;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span
          className={styles.backArrow}
          onClick={() => navigate(-1)}
        >
          ←
        </span>
        <h2>Add New Property</h2>
      </div>

      {/* Step */}
      <div className={styles.stepRow}>
        <span className={styles.stepText}>Step 4 of 4</span>
        <span className={styles.stepRight}>Photo & Utility</span>
      </div>

      {/* Progress Bars */}
      <div className={styles.progressWrapper}>
        <div className={`${styles.progressLine} ${styles.active}`}></div>
        <div className={`${styles.progressLine} ${styles.active}`}></div>
        <div className={`${styles.progressLine} ${styles.active}`}></div>
        <div className={`${styles.progressLine} ${styles.active}`}></div>
      </div>

      {/* Property Photos */}
      <h3 className={styles.sectionTitle}>Property Photos</h3>
      <p className={styles.sectionSub}>
        Upload at least 5 high-quality photos. Listings with clear images get up to 3x more interested renters.
      </p>
      <p className={styles.sectionSub} style={{ marginTop: 4 }}>
        Keep each image under {MAX_IMAGE_SIZE_MB}MB to avoid upload errors.
      </p>
      {fileSizeWarning && (
        <p role="alert" style={{ color: "#c00", fontSize: 14, marginTop: 8 }}>
          {fileSizeWarning}
        </p>
      )}

      <div className={styles.coverFrame} onClick={handleImageClick}>
        <Cover />
        <div className={styles.coverContent}>
          <div className={styles.cameraCircle}>
            <FiCamera size={26} />
          </div>
          <p className={styles.coverText}>Set Cover Image</p>
          <span className={styles.coverSub}>PNG, JPG up to {MAX_IMAGE_SIZE_MB}MB each</span>
        </div>
      </div>

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        multiple
        hidden
        onChange={handleImageChange}
      />

      {/* Image Grid */}
      <div className={styles.imageGrid}>
        {images.map((file, index) => (
          <div key={index} className={styles.imageBox}>
            <img src={URL.createObjectURL(file)} alt="property" />
            <button
              className={styles.removeBtn}
              onClick={() => handleRemove(index)}
            >
              <FiX size={14} />
            </button>
          </div>
        ))}

        {[...Array(6 - images.length)].map((_, i) => (
          <div
            key={i}
            className={styles.emptyBox}
            onClick={handleImageClick}
          >
            <FiPlus size={18} />
          </div>
        ))}
      </div>

      {/* Utility Section */}
      <h3 className={styles.sectionTitle}>Upload Utility Bill</h3>
      <p className={styles.sectionSub}>
        Upload a recent utility bill to verify your listing. Verified listings attract more renters and boost trust.
      </p>
      <p className={styles.sectionSub}  >Document Scan</p>
      <div
        className={styles.uploadFrame}
        onClick={() => fileInputRef.current.click()}
      >
        {utilityBillFile ? (
          <img
            src={URL.createObjectURL(utilityBillFile)}
            alt="Utility"
          />
        ) : (
          <>
            <div className={styles.cameraIcon}> <FiCamera size={26} /></div>
            <p className={styles.uploadText}>
              Tap to upload utility bill
            </p>
            <p className={styles.uploadSubText}>
              or upload from gallery
            </p>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleUtilityChange}
        />
      </div>

      <div className={styles.note}>
        <FiInfo size={26} />   Ensure all details are clear, readable, and not cropped.
        Avoid glare and dark shadows for faster verification.
      </div>

      <div className={styles.utilityhead} ><Verify />  Verification Checklist</div>
      <div className={styles.checklistContainer}>
        <label className={styles.checklistItem}>
          <div> <input type="checkbox" /></div>
          <div>
            <h4>Clear Lighting </h4>

            <p>Photos should be bright and taken during daytime.</p>
          </div>
        </label>

        <label className={styles.checklistItem}>
          <div><input type="checkbox" /></div>
          <div>
            <h4>Ownership Verification</h4>
            <p>Property documents must be uploaded for our team to review.</p>
          </div>

        </label>

        <label className={styles.checklistItem}>

          <input
            type="checkbox"
            checked={checklist.exteriorShot}
            onChange={() => handleChecklistChange("exteriorShot")}
          />
          <div><h4>Exterior Shot</h4>
            <p>At least one photo of the building facade is required.</p>
          </div>

        </label>



      </div>

<div className={styles.border} ></div>

      <button 
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!isFormComplete || status === "pending"}
      >
        {status === "pending"
          ? "Pending Verification..."
          : "Submit Listing for Verification →"}
      </button>

      {status === "verified" && (
        <div className={styles.successMessage}>
          ✅ Your listing has been verified and uploaded!
        </div>
      )}

      {status === "error" && (
        <div className={styles.errorMessage}>
          ❌ Verification failed. Please try again.
        </div>
      )}
    </div>
  );
}






































































// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./Uploadhouselisting.module.css";
// import { FiCamera, FiX } from "react-icons/fi";
// import { API } from "../../config"; // ✅ added API import from config

// export default function AddPropertyCombined() {
//   const imageInputRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Receive all previous pages data (Fee Breakdown + earlier pages)
//   const previousFormData = location.state?.formData || {};

//   // -------------------------
//   // States
//   // -------------------------
//   const [images, setImages] = useState([]);
//   const [utilityBillFile, setUtilityBillFile] = useState(null);
//   const [checklist, setChecklist] = useState({
//     clearLighting: true,
//     ownershipVerification: true,
//     exteriorShot: false,
//   });
//   const [status, setStatus] = useState("idle"); // idle | pending | verified | error

//   // -------------------------
//   // Image Handlers
//   // -------------------------
//   const handleImageClick = () => imageInputRef.current.click();

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prev) => {
//       const updated = [...prev];
//       files.forEach((file) => {
//         if (updated.length < 6) updated.push(file);
//       });
//       return updated;
//     });
//   };

//   const handleRemove = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // -------------------------
//   // Utility Bill Handler
//   // -------------------------
//   const handleUtilityChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setUtilityBillFile(file);
//   };

//   // -------------------------
//   // Checklist Handler
//   // -------------------------
//   const handleChecklistChange = (key) => {
//     setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // -------------------------
//   // Submit Handler
//   // -------------------------
//   const handleSubmit = async () => {
//     if (images.length === 0 || !utilityBillFile || !checklist.exteriorShot) return;

//     setStatus("pending");

//     const formData = new FormData();

//     // ✅ Append previous pages data (handles arrays correctly)
//     Object.entries(previousFormData).forEach(([key, value]) => {
//       if (Array.isArray(value)) {
//         value.forEach((item) => formData.append(`${key}[]`, item));
//       } else {
//         formData.append(key, value);
//       }
//     });

//     // ✅ Append property images
//     images.forEach((imgFile) => formData.append("propertyImages", imgFile));

//     // ✅ Append utility bill
//     formData.append("utilityBill", utilityBillFile);

//     // ✅ Append checklist
//     formData.append("checklist", JSON.stringify(checklist));

//     try {
//       const response = await fetch(
//         "https://hometrust-backend.duckdns.org/api/verification/upload",
//         { method: "POST", body: formData }
//       );

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const result = await response.json();

//       if (result.status === "verified") {
//         setStatus("verified");
//         alert("Listing verified and uploaded successfully!");
//         navigate("/landlord/dashboard");
//       } else {
//         setStatus("error");
//         alert(result.message || "Property could not be verified.");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus("error");
//       alert("Verification failed. Please try again.");
//     }
//   };

//   const isFormComplete =
//     images.length > 0 && utilityBillFile && checklist.exteriorShot;

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <div className={styles.header}>
//         <span
//           className={styles.backArrow}
//           onClick={() => navigate(-1)}
//         >
//           ←
//         </span>
//         <h2>Add New Property</h2>
//       </div>

//       {/* Step */}
//       <div className={styles.stepRow}>
//         <span className={styles.stepText}>Step 4 of 4</span>
//         <span className={styles.stepRight}>Photo & Utility</span>
//       </div>

//       {/* Progress Bars */}
//       <div className={styles.progressWrapper}>
//         <div className={styles.progressLine}></div>
//         <div className={styles.progressLine}></div>
//         <div className={styles.progressLine}></div>
//         <div className={`${styles.progressLine} ${styles.active}`}></div>
//       </div>

//       {/* Property Photos */}
//       <h3 className={styles.sectionTitle}>Property Photos</h3>
//       <p className={styles.sectionSub}>
//         Upload at least 5 high-quality photos. Listings with clear images get up to 3x more interested renters.
//       </p>

//       <div className={styles.coverFrame} onClick={handleImageClick}>
//         <div className={styles.coverContent}>
//           <div className={styles.cameraCircle}>
//             <FiCamera size={26} />
//           </div>
//           <p className={styles.coverText}>Set Cover Image</p>
//           <span className={styles.coverSub}>PNG, JPG up to 10MB</span>
//         </div>
//       </div>

//       <input
//         type="file"
//         ref={imageInputRef}
//         accept="image/*"
//         multiple
//         hidden
//         onChange={handleImageChange}
//       />

//       {/* Image Grid */}
//       <div className={styles.imageGrid}>
//         {images.map((file, index) => (
//           <div key={index} className={styles.imageBox}>
//             <img src={URL.createObjectURL(file)} alt="property" />
//             <button
//               className={styles.removeBtn}
//               onClick={() => handleRemove(index)}
//             >
//               <FiX size={14} />
//             </button>
//           </div>
//         ))}

//         {[...Array(6 - images.length)].map((_, i) => (
//           <div
//             key={i}
//             className={styles.emptyBox}
//             onClick={handleImageClick}
//           >
//             <FiCamera size={18} />
//           </div>
//         ))}
//       </div>

//       {/* Utility Section */}
//       <h3 className={styles.sectionTitle}>Upload Utility Bill</h3>
//       <p className={styles.sectionSub}>
//         Upload a recent utility bill to verify your listing. Verified listings attract more renters and boost trust.
//       </p>

//       <div
//         className={styles.uploadFrame}
//         onClick={() => fileInputRef.current.click()}
//       >
//         {utilityBillFile ? (
//           <img
//             src={URL.createObjectURL(utilityBillFile)}
//             alt="Utility"
//           />
//         ) : (
//           <>
//             <div className={styles.cameraIcon}>📷</div>
//             <p className={styles.uploadText}>
//               Tap to upload utility bill
//             </p>
//             <p className={styles.uploadSubText}>
//               or upload from gallery
//             </p>
//           </>
//         )}

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleUtilityChange}
//         />
//       </div>

//       <div className={styles.note}>
//         Ensure all details are clear, readable, and not cropped.
//         Avoid glare and dark shadows for faster verification.
//       </div>

//       <div>Verification Checklist</div>
//       <div className={styles.checklist}>
//         <label>
//           Clear Lighting – Photos should be bright and taken during daytime.
//         </label>

//         <label>
//           Ownership Verification – Property documents must be uploaded for our team to review.
//         </label>

//         <label>
//           <input
//             type="checkbox"
//             checked={checklist.exteriorShot}
//             onChange={() => handleChecklistChange("exteriorShot")}
//           />
//           Exterior Shot – At least one photo of the building facade is required.
//         </label>
//       </div>

//       <button
//         className={styles.submitButton}
//         onClick={handleSubmit}
//         disabled={!isFormComplete || status === "pending"}
//       >
//         {status === "pending"
//           ? "Pending Verification..."
//           : "Submit Listing for Verification →"}
//       </button>

//       {status === "verified" && (
//         <div className={styles.successMessage}>
//           ✅ Your listing has been verified and uploaded!
//         </div>
//       )}

//       {status === "error" && (
//         <div className={styles.errorMessage}>
//           ❌ Verification failed. Please try again.
//         </div>
//       )}
//     </div>
//   );
// }

















































































































































// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./Uploadhouselisting.module.css";
// import { FiCamera, FiX } from "react-icons/fi";

// export default function AddPropertyCombined() {
//   const imageInputRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Receive previous page data (Fee Breakdown + earlier pages)
//   const previousFormData = location.state?.formData || {};

//   // -------------------------
//   // States
//   // -------------------------
//   const [images, setImages] = useState([]);
//   const [utilityBillFile, setUtilityBillFile] = useState(null);
//   const [checklist, setChecklist] = useState({
//     clearLighting: true,
//     ownershipVerification: true,
//     exteriorShot: false,
//   });
//   const [status, setStatus] = useState("idle"); // idle | pending | verified | error

//   // -------------------------
//   // Image Handlers
//   // -------------------------
//   const handleImageClick = () => imageInputRef.current.click();

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prev) => {
//       const updated = [...prev];
//       files.forEach((file) => {
//         if (updated.length < 6) updated.push(file);
//       });
//       return updated;
//     });
//   };

//   const handleRemove = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // -------------------------
//   // Utility Bill Handler
//   // -------------------------
//   const handleUtilityChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setUtilityBillFile(file);
//   };

//   // -------------------------
//   // Checklist Handler
//   // -------------------------
//   const handleChecklistChange = (key) => {
//     setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // -------------------------
//   // Submit Handler (Dummy Version)
//   // -------------------------
//   const handleSubmit = async () => {
//     if (images.length === 0 || !utilityBillFile || !checklist.exteriorShot) {
//       alert("Please complete all required fields.");
//       return;
//     }

//     setStatus("pending");

//     // Simulate a dummy submit delay
//     setTimeout(() => {
//       setStatus("verified"); // Shows success message
//       alert("✅ Listing submitted successfully! Pending review.");

//       // Navigate to landlord dashboard
//       navigate("/landlorddashboard"); // <-- Paste this link for your dashboard
//     }, 1000); // 1-second delay for realism
//   };

//   const isFormComplete =
//     images.length > 0 && utilityBillFile && checklist.exteriorShot;

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <div className={styles.header}>
//         <span className={styles.backArrow} onClick={() => navigate(-1)}>
//           ←
//         </span>
//         <h2>Add New Property</h2>
//       </div>

//       {/* Step */}
//       <div className={styles.stepRow}>
//         <span className={styles.stepText}>Step 4 of 4</span>
//         <span className={styles.stepRight}>Photo & Utility</span>
//       </div>

//       {/* Progress Bars */}
//       <div className={styles.progressWrapper}>
//         <div className={styles.progressLine}></div>
//         <div className={styles.progressLine}></div>
//         <div className={styles.progressLine}></div>
//         <div className={`${styles.progressLine} ${styles.active}`}></div>
//       </div>

//       {/* Property Photos */}
//       <h3 className={styles.sectionTitle}>Property Photos</h3>
//       <p className={styles.sectionSub}>
//         Upload at least 5 high-quality photos. Listings with clear images get up
//         to 3x more interested renters.
//       </p>

//       <div className={styles.coverFrame} onClick={handleImageClick}>
//         <div className={styles.coverContent}>
//           <div className={styles.cameraCircle}>
//             <FiCamera size={26} />
//           </div>
//           <p className={styles.coverText}>Set Cover Image</p>
//           <span className={styles.coverSub}>PNG, JPG up to 10MB</span>
//         </div>
//       </div>

//       <input
//         type="file"
//         ref={imageInputRef}
//         accept="image/*"
//         multiple
//         hidden
//         onChange={handleImageChange}
//       />

//       {/* Image Grid */}
//       <div className={styles.imageGrid}>
//         {images.map((file, index) => (
//           <div key={index} className={styles.imageBox}>
//             <img src={URL.createObjectURL(file)} alt="property" />
//             <button
//               className={styles.removeBtn}
//               onClick={() => handleRemove(index)}
//             >
//               <FiX size={14} />
//             </button>
//           </div>
//         ))}

//         {[...Array(6 - images.length)].map((_, i) => (
//           <div key={i} className={styles.emptyBox} onClick={handleImageClick}>
//             <FiCamera size={18} />
//           </div>
//         ))}
//       </div>

//       {/* Utility Section */}
//       <h3 className={styles.sectionTitle}>Upload Utility Bill</h3>
//       <p className={styles.sectionSub}>
//         Upload a recent utility bill to verify your listing. Verified listings
//         attract more renters and boost trust.
//       </p>

//       <div
//         className={styles.uploadFrame}
//         onClick={() => fileInputRef.current.click()}
//       >
//         {utilityBillFile ? (
//           <img src={URL.createObjectURL(utilityBillFile)} alt="Utility" />
//         ) : (
//           <>
//             <div className={styles.cameraIcon}>📷</div>
//             <p className={styles.uploadText}>Tap to upload utility bill</p>
//             <p className={styles.uploadSubText}>or upload from gallery</p>
//           </>
//         )}

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           hidden
//           onChange={handleUtilityChange}
//         />
//       </div>

//       <div className={styles.note}>
//         Ensure all details are clear, readable, and not cropped. Avoid glare
//         and dark shadows for faster verification.
//       </div>

//       <div>Verification Checklist</div>
//       <div className={styles.checklist}>
//         <label>
//           Clear Lighting – Photos should be bright and taken during daytime.
//         </label>

//         <label>
//           Ownership Verification – Property documents must be uploaded for our
//           team to review.
//         </label>

//         <label>
//           <input
//             type="checkbox"
//             checked={checklist.exteriorShot}
//             onChange={() => handleChecklistChange("exteriorShot")}
//           />
//           Exterior Shot – At least one photo of the building facade is required.
//         </label>
//       </div>

//       <button
//         className={styles.submitButton}
//         onClick={handleSubmit}
//         disabled={!isFormComplete || status === "pending"}
//       >
//         {status === "pending"
//           ? "Pending Verification..."
//           : "Submit Listing for Verification →"}
//       </button>

//       {status === "verified" && (
//         <div className={styles.successMessage}>
//           ✅ Your listing has been verified and uploaded!
//         </div>
//       )}

//       {status === "error" && (
//         <div className={styles.errorMessage}>
//           ❌ Verification failed. Please try again.
//         </div>
//       )}
//     </div>
//   );
// }



