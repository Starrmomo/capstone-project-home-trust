import styles from "./Tenantlegalright.module.css";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { FiBellOff } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

//import Homeicon from '../../assets/Icon/properties.svg?react';
import Judge from '../../assets/Icon/judge.svg?react';
//import Homeicon from '../../assets/Icon/properties.svg?react';

export default function LegalRights() {

  const pageRef = useRef();
  const navigate = useNavigate();

  const handleDownload = async () => {
    const element = pageRef.current;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("HomeTrust-Tenant-Legal-Rights.pdf");
  };

  return (
    <div className={styles.container} ref={pageRef}>

      {/* Header */}
      <div className={styles.header}>
        <FiArrowLeft size={20} />
        <h3>Your Legal Rights</h3>
        <FiDownload size={20} onClick={handleDownload} style={{ cursor: "pointer" }} />
      </div>

      {/* Title Section */}
      <div className={styles.titleSection}>
        <div className={styles.iconBox}>
          <Judge />
        </div>

        <h1>HomeTrust Tenancy Rights Guide</h1>

        <p>
          Empowering Nigerian tenants with essential legal knowledge to ensure
          fair treatment, security, and peace of mind in every home.
        </p>
      </div>

      {/* Section 1 */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>1</span>
          <h4>Fundamental Protections</h4>
        </div>

        <div className={styles.card}>
          <FiShield className={styles.cardIcon} />
          <div>
            <h5>Exclusive Possession</h5>
            <p>
              You have the legal right to exclusive use of the rented premises
              during your lease period, barring emergency access.
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <FiBellOff className={styles.cardIcon} />
          <div>
            <h5>Quiet Enjoyment</h5>
            <p>
              Landlords cannot interfere with your privacy or peace. Inspections
              require valid legal notice (usually 24-48 hours).
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>2</span>
          <h4>Statutory Notice Periods</h4>
        </div>

        <div className={styles.noticeBox}>
          <p>
            Under Nigerian Law (Recovery of Premises Act), the following notice
            periods apply:
          </p>

          <div className={styles.noticetext} >
            <strong><FiCheckCircle color="blue" size={13} /> Weekly Tenant:</strong>
            <span>7 days' notice to quit.</span>
          </div>

          <div className={styles.noticetext} >
            <strong><FiCheckCircle color="blue" size={13} /> Monthly Tenant:</strong>
            <span>1 month's notice to quit.</span>
          </div>

          <div className={styles.noticetext}>
            <strong><FiCheckCircle color="blue" size={13} /> Half-Yearly Tenant:</strong>
            <span>3 months' notice to quit.</span>
          </div>

          <div className={styles.noticetext} >
            <strong><FiCheckCircle color="blue" size={13} /> Yearly Tenant:</strong>
            <span>6 months' notice to quit.</span>
          </div>

        </div>
      </div>

      {/* Section 3 */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>3</span>
          <h4>Rent & Receipts</h4>
        </div>

        <div className={styles.listItem}>
          <FiFileText className={styles.cardIcon} />
          <p>
            It is your right to be issued an <b>official receipt</b> upon payment
            of rent. The receipt must state the date, amount, premises, and
            period covered.
          </p>
        </div>

        <div className={styles.listItem}>
          <FiActivity className={styles.cardIcon} />
          <p>
            Rent increases must be <b>reasonable</b> and agreed upon. Landlords
            cannot unilaterally double rent without proper negotiation and
            notice.
          </p>
        </div>
      </div>

      {/* Section 4 */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.badge}>4</span>
          <h4>Fair Hearing & Eviction</h4>
        </div>

        <div className={styles.warningBox}>
          <div className={styles.warningHeader}>
            <FiAlertTriangle />
            <span>Crucial Protection</span>
          </div>

          <p>
            "Self-help" is illegal. A landlord cannot forcefully eject you,
            remove your roof, or lock you out without a court order.
          </p>

          <div className={styles.subWarning}>
            Even after a notice to quit expires, a landlord must still serve a
            "7-day notice of owner's intention to apply to court" before legal
            proceedings begin.
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        Disclaimer: The information provided in this guide is for educational
        purposes only and does not constitute formal legal advice. While we
        strive for accuracy, laws may vary by state and specific
        circumstances. Please consult a qualified legal professional for your
        specific case.
      </p>

      {/* Button */}
      <button className={styles.button} onClick={() => navigate(-1)}>
        <FiLock /> Proceed to Payment
      </button>

    </div>
  );
}