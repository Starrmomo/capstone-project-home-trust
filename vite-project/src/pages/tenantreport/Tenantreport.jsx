import styles from "./Tenantreport.module.css";

export default function ConditionReport() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.back}>←</span>
        <h2>Condition Report</h2>
        <span className={styles.save}>Save Draft</span>
      </div>

      {/* Progress Section */}
      <div className={styles.progressSection}>
        <div className={styles.progressTop}>
          <span>2 of 4 rooms completed</span>
          <span>50% Complete</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={styles.activeTab}>Move-in Photos</button>
        <button className={styles.inactiveTab}>Move-out Photos</button>
      </div>

      {/* Info Card */}
      <div className={styles.infoCard}>
        <h4>Protect your deposit</h4>
        <p>
          Photos are used to protect your caution deposit from unfair claims.
          Ensure rooms are well lit.
        </p>
      </div>

      {/* Image Grid */}
      <div className={styles.grid}>
        {/* Uploaded Item */}
        <div className={styles.uploadedCard}>
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
            alt="bathroom"
          />
          <div className={styles.overlay}>
            <span>Bathroom</span>
            <small>Uploaded</small>
          </div>
          <div className={styles.close}>×</div>
        </div>

        <div className={styles.uploadedCard}>
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
            alt="kitchen"
          />
          <div className={styles.overlay}>
            <span>Kitchen</span>
            <small>Uploaded</small>
          </div>
          <div className={styles.close}>×</div>
        </div>

        {/* Empty Upload Boxes */}
        <div className={styles.uploadBox}>
          <div className={styles.cameraIcon}>📷</div>
          <p>Living Room</p>
          <small>Tap to upload</small>
        </div>

        <div className={styles.uploadBox}>
          <div className={styles.cameraIcon}>📷</div>
          <p>Bedroom</p>
          <small>Tap to upload</small>
        </div>
      </div>

      {/* Add Another Room */}
      <button className={styles.addRoom}>
        + Add Another Room
      </button>

      {/* Submit Button */}
      <button className={styles.submitBtn}>
        Submit Report →
      </button>
    </div>
  );
}