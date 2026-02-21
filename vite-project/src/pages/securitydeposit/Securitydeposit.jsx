import styles from "./Securitydeposit.module.css";

export default function SecurityDeposit() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.back}>←</span>
        <h2>Security Deposit & Inspection</h2>
      </div>

      {/* Blue Escrow Card */}
      <div className={styles.escrowCard}>
        <div className={styles.escrowTop}>
          <span>Current Escrow Balance</span>
          <div className={styles.protected}>🛡 Protected</div>
        </div>

        <h1 className={styles.amount}>₦250,000</h1>

        <div className={styles.divider}></div>

        <p className={styles.held}>🏦 Held by HomeTrust for Unit 4B</p>
      </div>

      {/* Refund Eligibility */}
      <div className={styles.refundCard}>
        <div className={styles.refundHeader}>
          <h3>Refund Eligibility</h3>
          <span className={styles.completed}>Move-out Complete</span>
        </div>

        <div className={styles.progressLabels}>
          <span>Lease</span>
          <span>Move-Out</span>
          <span>Refund</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        <p className={styles.refundText}>
          Your move-out inspection is complete. You can now request your refund.
        </p>
      </div>

      {/* History */}
      <div className={styles.historySection}>
        <div className={styles.historyHeader}>
          <h3>History</h3>
          <span className={styles.viewAll}>View All</span>
        </div>

        <div className={styles.historyItem}>
          <div className={`${styles.icon} ${styles.green}`}>↓</div>
          <div>
            <p className={styles.title}>Initial Deposit Received</p>
            <small>Jan 12, 2023 • Bank Transfer</small>
          </div>
          <span className={styles.positive}>+₦250,000</span>
        </div>

        <div className={styles.historyItem}>
          <div className={`${styles.icon} ${styles.orange}`}>🛠</div>
          <div>
            <p className={styles.title}>Maintenance Hold</p>
            <small>Aug 05, 2023 • Pending Review</small>
          </div>
          <span className={styles.negative}>-₦5,000</span>
        </div>

        <div className={styles.historyItem}>
          <div className={styles.icon}>📄</div>
          <div>
            <p className={styles.title}>Escrow Service Fee</p>
            <small>Jan 12, 2023 • Annual</small>
          </div>
          <span className={styles.negative}>-₦2,500</span>
        </div>
      </div>

      {/* Request Refund Button */}
      <button className={styles.requestBtn}>
        Request Refund →
      </button>

      <p className={styles.footerNote}>
        Your funds are held in a regulated escrow account. Bank-grade security enabled.
      </p>
    </div>
  );
}