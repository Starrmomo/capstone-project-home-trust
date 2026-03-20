import React, { useState } from "react";
import styles from "./Termsandcondition.module.css";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Mainicon from '../../assets/Icon/main-icon.png';
import Rightshare from '../../assets/Icon/rightshare.svg?react';
import Mail from '../../assets/Icon/mail.svg?react';
import Backarrow from '../../assets/Icon/backarrow.svg?react';
//import Newinquiry from '../../assets/Icon/NewInquiry.svg?react';
//import Newinquiry from '../../assets/Icon/NewInquiry.svg?react';


export default function PrivacyPolicy() {

  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    if (accepted) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.back}><Backarrow/></span>
          <p>Privacy Policy & Terms of Service</p>
        </div>

        {/* Shield Icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.shield}><img src={Mainicon} alt="Main Icon" /></div>
        </div>

        {/* Title */}
        <h1 className={styles.title}>Privacy Policy</h1>

        <p className={styles.description}>
          This document outlines how HomeTrust collects, uses, processes, and
          protects your personal data in compliance with relevant data
          protection laws. We value your trust and are committed to safeguarding
          your financial and personal information.
        </p>

        {/* SECTION 1 */}
        <div className={styles.section}>
          <div className={styles.number}>1</div>
          <div>
            <h3>Information We Collect</h3>
            <p> We collect personal information
              necessary to provide our fintech
              services. This includes personal
              identifiers (name, email, phone number),
              financial data (bank account details,
              transaction history), and verification
              documents (government ID, BVN)
              required for KYC compliance.</p>

          </div>
        </div>

        {/* SECTION 2 */}
        <div className={styles.section}>
          <div className={styles.number}>2</div>
          <div className={styles.sectiontext} >
            <h3>Why We Collect Your Data</h3>

            <p>Your data is used to operate and
              improve the HomeTrust platform. Key
              purposes include:</p>

            <p>
              Processing transactions and managing
              your digital wallet.
            </p>
            <p>Verifying your identity to prevent fraud and
              money laundering.
            </p>
            <p>Communicating important account updates
              and policy changes.
            </p>
            <p>Analyzing usage trends to enhance user
              experience.
            </p>

          </div>
        </div>

        {/* SECTION 3 */}
        <div className={styles.section}>
          <div className={styles.number}>3</div>
          <div>
            <h3>Sharing of Data</h3>
            <p>
              We do not sell your personal data. We
              may share information with trusted
              third-party partners strictly for:
            </p>

            <div className={styles.card}>
              <strong className={styles.strong}  > <Rightshare width={20} height={20} /> Third Party Partners</strong>
              <p>
                Partners include payment processors,
                credit bureaus for credit scoring, and
                regulatory bodies when required by law.
                All partners are bound by strict
                confidentiality agreements.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className={styles.section}>
          <div className={styles.number}>4</div>
          <div>
            <h3>Data Retention</h3>
            <p>
              We retain your personal data only for as
              long as is necessary for the purposes
              set out in this Privacy Policy. We will
              retain and use your data to the extent
              necessary to comply with our legal
              obligations (for example, if we are
              required to retain your data to comply
              with applicable laws), resolve disputes,
              and enforce our legal agreements and
              policies.
            </p>
          </div>
        </div>

        {/* SECTION 5 */}
        <div className={styles.section}>
          <div className={styles.number}>5</div>
          <div>
            <h3>Your Rights Under NDPA</h3>
            <p>
              Under the Nigeria Data Protection Act
              (NDPA), you have the right to access,
              correct, delete, or restrict the
              processing of your personal data. You
              also have the right to data portability
              and to withdraw consent at any time.
            </p>
            <div className={styles.card2}>

              <p>
                To exercise these rights or for any
                privacy-related inquiries, please contact
                our Data Protection Officer at:
                <strong className={styles.strong2}  > <Mail width={17} height={17} /> HomeTrust@gmail.com</strong>
              </p>
            </div>

          </div>

        </div>

        {/* SECTION 6 */}
        <div className={styles.section}>
          <div className={styles.number}>6</div>
          <div>
            <h3>Data Security</h3>
            <p>
              We implement robust technical and
              organizational measures to secure your
              personal data. This includes encryption
              of data in transit and at rest, regular
              security audits, and strict access
              controls. While we strive to use
              commercially acceptable means to
              protect your personal data, we cannot
              guarantee its absolute security.
            </p>
          </div>
        </div>

        {/* Nigerian Tenancy Rights */}
        <h2 className={styles.subtitle}>Nigerian Tenancy Rights summary</h2>
        <p className={styles.sectionp} >This document outlines the legal foundation
          This document outlines the legal foundation
          of the HomeTrust platform, ensuring all lease
          agreements comply with statutory Nigerian
          tenancy laws and the Tenancy Act.</p>

        <div className={styles.section}>
          <div className={styles.number}>1</div>
          <div>
            <h3>Fundamental Lease Protections</h3>
            <p>
              Every tenant on HomeTrust is entitled to
              a written tenancy agreement. This
              agreement serves as the primary
              protection against arbitrary changes in
              rent or sudden eviction. HomeTrust acts
              as the digital custodian of these
              protections.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.number}>2</div>

          <div>
            <p>Under Nigerian Law, the length of notice
              to quit depends on the nature of the
              tenancy. These durations are strictly
              enforced on HomeTrust:</p>

            <h3>Statutory Notice Periods</h3>

            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>Weekly Tenancy</td>
                  <td>1 Week Notice</td>
                </tr>
                <tr>
                  <td>Monthly Tenancy</td>
                  <td>1 Month Notice</td>
                </tr>
                <tr>
                  <td>Quarterly Tenancy</td>
                  <td>3 Months Notice</td>
                </tr>
                <tr>
                  <td>Half-Yearly Tenancy</td>
                  <td>3 Months Notice</td>
                </tr>
                <tr>
                  <td>Yearly Tenancy</td>
                  <td>6 Months Notice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 - Rent & Deposit Regulations */}
        <div className={styles.section}>
          <div className={styles.number}>3</div>
          <div>
            <h3>Rent & Deposit Regulations</h3>
            <p>
              Landlords are legally prohibited from
              demanding more than one year’s rent in
              advance for a sitting tenant.
            </p>

            <div className={styles.card}>
              <strong className={styles.strong}  > <FiInfo size={18} />Caution Fee</strong>
              <p>
                HomeTrust requires full transparency
                on caution fees. These deposits are
                held in escrow and must be refunded
                at the end of the tenancy, subject to
                property damage assessment.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4 - Obligations */}
        <div className={styles.section}>
          <div className={styles.number}>4</div>
          <div className={styles.obligation} >
            <h3>Obligations</h3>
            <div className={styles.obligation1} >
              <p><strong>Tenant Obligations</strong></p>
              <p>Timely payment of rent and utility bills.</p>
              <p>Maintaining the property in good condition.</p>
              <p>Obtaining consent for structural modifications.</p>
            </div>

            <div  className={styles.obligation1} >
              <p><strong>Landlord Obligations</strong></p>
              <p>Ensuring the property is fit for habitation.</p>
              <p>Paying property taxes and land rates.</p>
              <p>Respecting tenant privacy (Quiet Enjoyment).</p>
            </div>
          </div>
        </div>

        {/* SECTION 5 - Eviction Process */}
        <div className={styles.section}>
          <div className={styles.number}>5</div>
          <div>
            <h3>Eviction Process</h3>
            <p>
              Self-help eviction is illegal. A landlord
              must follow the legal process: issuance
              of a Notice to Quit, followed by a 7-day
              Owner’s Intention to Recover
              Possession, and finally a court order
              for possession.
            </p>
          </div>
        </div>

        {/* SECTION 6 - Dispute Resolution */}
        <div className={styles.section}>
          <div className={styles.number}>6</div>
          <div>
            <h3>Dispute Resolution</h3>
            <p>
              HomeTrust provides an internal
              mediation service to resolve conflicts
              before escalating to litigation. By using
              our platform, you agree to a 14-day
              mediation period for all tenancy-related
              disputes.
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className={styles.agree}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <p>I have read and understand the policies</p>
        </div>

        {/* Button */}
        <button
          className={styles.button}
          disabled={!accepted}
          onClick={handleAccept}
        >
          Accept & Continue
        </button>

      </div>
    </div>
  );
}