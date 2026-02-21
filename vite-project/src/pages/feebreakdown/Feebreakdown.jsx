import React, { useState, useMemo } from "react";
import styles from "./Feebreakdown.module.css";
import { FiArrowLeft, FiInfo } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function TransparentFees() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive all previous steps data
  const {
    title,
    type,
    locationText,
    latitude,
    longitude,
    bedrooms,
    bathrooms,
    amenities,
    description
  } = location.state || {};

  // Step 3 states
  const [annualRent, setAnnualRent] = useState(2500000);
  const [cautionFee, setCautionFee] = useState(250000);
  const [legalFee, setLegalFee] = useState(125000);
  const [agencyFee, setAgencyFee] = useState(125000);

  const total = useMemo(() => {
    return (
      Number(annualRent || 0) +
      Number(cautionFee || 0) +
      Number(legalFee || 0) +
      Number(agencyFee || 0)
    );
  }, [annualRent, cautionFee, legalFee, agencyFee]);

  const monthlyEstimate = useMemo(() => Math.round(total / 12), [total]);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-NG").format(num);

  // Form validation: all fields must have a value
  const isFormValid =
    annualRent > 0 &&
    cautionFee >= 0 &&
    legalFee >= 0 &&
    agencyFee >= 0;

  const handleBack = () => {
    // Go back to Detail & Amenities with all previous data
    navigate("/detail-amenities", {
      state: {
        title,
        type,
        locationText,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        amenities,
        description
      }
    });
  };

  const handleContinue = () => {
    if (!isFormValid) return;

    // Send all data to next page (Photos)
    navigate("/addproperty", {
      state: {
        title,
        type,
        locationText,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        amenities,
        description,
        annualRent,
        cautionFee,
        legalFee,
        agencyFee,
        total,
        monthlyEstimate
      }
    });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FiArrowLeft className={styles.backIcon} onClick={handleBack} />
        <h2>Add New Property</h2>
      </div>

      {/* Step */}
      <div className={styles.stepRow}>
        <span className={styles.stepText}>Step 3 of 4</span>
        <span className={styles.breakdown}>Fee Breakdown</span>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressActive}></div>
        <div className={styles.progressActive}></div>
        <div className={styles.progressActive}></div>
        <div></div>
      </div>

      <p className={styles.description}>
        Be transparent about costs to help tenants decide faster and build trust.
      </p>

      {/* Annual Rent */}
      <div className={styles.inputGroup}>
        <label>
          Annual Rent <FiInfo className={styles.infoIcon} />
        </label>
        <div className={styles.inputWrapper}>
          <span>₦</span>
          <input
            type="number"
            value={annualRent}
            onChange={(e) => setAnnualRent(e.target.value)}
          />
        </div>
      </div>

      {/* Caution Fee */}
      <div className={styles.inputGroup}>
        <label>
          Caution Fee Deposit (Refundable) <FiInfo className={styles.infoIcon} />
        </label>
        <div className={styles.inputWrapper}>
          <span>₦</span>
          <input
            type="number"
            value={cautionFee}
            onChange={(e) => setCautionFee(e.target.value)}
          />
        </div>
      </div>

      {/* Legal + Agency */}
      <div className={styles.row}>
        <div className={styles.half}>
          <label>Legal Fee</label>
          <div className={styles.inputWrapper}>
            <span>₦</span>
            <input
              type="number"
              value={legalFee}
              onChange={(e) => setLegalFee(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.half}>
          <label>Agency Fee</label>
          <div className={styles.inputWrapper}>
            <span>₦</span>
            <input
              type="number"
              value={agencyFee}
              onChange={(e) => setAgencyFee(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Total Preview */}
      <div className={styles.previewCard}>
        <p className={styles.previewTitle}>Total Preview</p>
        <p className={styles.previewSub}>Tenant’s Initial Total</p>

        <h1 className={styles.total}>₦ {formatCurrency(total)}</h1>

        <div className={styles.previewBottom}>
          <div>
            <p>Move-In Cost</p>
            <strong>₦{formatCurrency(total)}</strong>
          </div>
          <div>
            <p>Monthly Est.</p>
            <strong>₦{formatCurrency(monthlyEstimate)}/mo</strong>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className={styles.notice}>
        HomeTrust ensures these fees are clearly explained to tenants.
      </div>

      {/* Button */}
      <button
        className={`${styles.button} ${isFormValid ? styles.activeBtn : ""}`}
        disabled={!isFormValid}
        onClick={handleContinue}
      >
        Continue to Photos →
      </button>
    </div>
  );
}