import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Tenantlegalright.module.css";
import {
  ShieldCheck,
  Volume2,
  Calendar,
  FileText,
  AlertTriangle,
  Receipt,
  CreditCard,
} from "lucide-react";

export default function LegalRights() {
  const navigate = useNavigate();

  // 🔙 Back button navigation
  const handleBack = () => {
    navigate("/search"); // Replace with your desired back link
  };

  // ⬇️ Download button functionality
  const handleDownload = () => {
    // Create a blob with your legal rights content
    const content = `
HomeTrust Tenancy Rights Guide

1. Fundamental Protections
- Exclusive Possession: You have the legal right to exclusive use of the rental premises during your lease period.
- Quiet Enjoyment: Landlords cannot interfere with your peaceful possession and must give reasonable notice before entry.

2. Statutory Notice Periods
- Weekly Tenant: 7 days notice
- Monthly Tenant: 1 month notice
- Half-Yearly Tenant: 3 months notice
- Yearly Tenant: 6 months notice

3. Rent & Receipts
- A landlord is required to issue an official receipt for every rent payment.
- Rent increases must be reasonable and agreed upon before implementation.

4. Fair Hearing & Eviction
- Eviction Warning: Your landlord cannot forcefully evict you without a valid court order.
`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "HomeTrust_Legal_Rights.txt"; // file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ➡️ Proceed to Secure Checkout
  const handleProceedToPayment = () => {
    navigate("/securecheckout"); // Replace with your SecureCheckout route
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          ←
        </button>
        <h3>Your Legal Rights</h3>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          ⤓
        </button>
      </header>

      {/* Intro */}
      <div className={styles.intro}>
        <div className={styles.iconWrapper}>
          <ShieldCheck size={28} />
        </div>
        <h1>HomeTrust Tenancy Rights Guide</h1>
        <p>
          Empowering Nigerian tenants with essential legal knowledge to ensure
          fair treatment, security, and peace of mind in every home.
        </p>
      </div>

      {/* Section 1 */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>1</span>
          <h2>Fundamental Protections</h2>
        </div>

        <div className={styles.card}>
          <ShieldCheck size={20} />
          <div>
            <h4>Exclusive Possession</h4>
            <p>
              You have the legal right to exclusive use of the rental premises
              during your lease period.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <Volume2 size={20} />
          <div>
            <h4>Quiet Enjoyment</h4>
            <p>
              Landlords cannot interfere with your peaceful possession and must
              give reasonable notice before entry.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>2</span>
          <h2>Statutory Notice Periods</h2>
        </div>

        <div className={styles.noticeBox}>
          <p>
            Under Nigerian Law (Recovery of Premises Act), the following notice
            periods apply:
          </p>

          <ul>
            <li>
              <strong>Weekly Tenant:</strong> 7 days notice
            </li>
            <li>
              <strong>Monthly Tenant:</strong> 1 month notice
            </li>
            <li>
              <strong>Half-Yearly Tenant:</strong> 3 months notice
            </li>
            <li>
              <strong>Yearly Tenant:</strong> 6 months notice
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3 */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>3</span>
          <h2>Rent & Receipts</h2>
        </div>

        <div className={styles.simpleItem}>
          <Receipt size={18} />
          <p>
            A landlord is required to issue an official receipt for every rent
            payment.
          </p>
        </div>

        <div className={styles.simpleItem}>
          <FileText size={18} />
          <p>
            Rent increases must be reasonable and agreed upon before
            implementation.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>4</span>
          <h2>Fair Hearing & Eviction</h2>
        </div>

        <div className={styles.warningBox}>
          <AlertTriangle size={20} />
          <div>
            <h4>Eviction Warning</h4>
            <p>
              Your landlord cannot forcefully evict you without a valid court
              order.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Button */}
      <div className={styles.bottom}>
        <button
          className={styles.paymentBtn}
          onClick={handleProceedToPayment}
        >
          <CreditCard size={18} />
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}