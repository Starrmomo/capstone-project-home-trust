import { useNavigate } from "react-router-dom";
import styles from "./Banktransferdetail.module.css";

export default function BankTransferDetails() {
  const navigate = useNavigate();

  // 🔙 Back → Secure Checkout
  const handleBack = () => {
    navigate("/securecheckout"); // ✅ change if your route name is different
  };

  // ✅ I’ve Made Payment → Payment Success / View Receipt
  const handlePaymentDone = () => {
    navigate("/paymentsucess"); // ✅ put your payment success route here
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <span 
            className={styles.backArrow}
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          >
            ←
          </span>
          <h2>Payment Details</h2>
        </div>

        {/* Info Alert */}
        <div className={styles.infoBox}>
          <div className={styles.infoIcon}>i</div>
          <div>
            <p>
              Transfer exactly <strong>₦3,250,000</strong> to the account below.
            </p>
            <span>Use your Transaction ID as the reference.</span>
          </div>
        </div>

        {/* Bank Card */}
        <div className={styles.bankCard}>
          
          <div className={styles.bankRow}>
            <div>
              <label>Bank Name</label>
              <h3>HomeTrust Bank</h3>
            </div>
            <div className={styles.copyIcon}></div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.bankRow}>
            <div>
              <label>Account Number</label>
              <h2>0123456789</h2>
            </div>
            <div className={styles.copyIcon}></div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.bankRow}>
            <div>
              <label>Account Name</label>
              <h3>HomeTrust Escrow</h3>
            </div>
            <div className={styles.copyIcon}></div>
          </div>

        </div>

        {/* Expiry */}
        <div className={styles.expiry}>
          <span className={styles.clock}></span>
          This account expires in <span className={styles.timer}>29:45</span> minutes
        </div>

        {/* Button */}
        <button 
          className={styles.primaryButton}
          onClick={handlePaymentDone}
        >
          I’ve Made Payment
        </button>

        <p 
          className={styles.cancel}
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        >
          Cancel Payment
        </p>

      </div>
    </div>
  );
}