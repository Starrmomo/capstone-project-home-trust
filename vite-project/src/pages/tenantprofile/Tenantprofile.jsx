import { useNavigate } from "react-router-dom";
import styles from "./Tenantprofile.module.css";

export default function Profile() {
  const navigate = useNavigate();

  // 🔥 CHANGE THESE ROUTES TO MATCH YOUR ROUTER
  const routes = {
    securityDeposit: "/securitydeposit",
    rentalHistory: "/rental-history",
    savedListings: "/saved-listings",
    home: "/landingpage", 
    search: "/search",
    saved: "/saved",
    chat: "/chatbox",
    profile: "/profile",
  };

  return (
    <div className={styles.container}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <img
            src="https://i.pravatar.cc/300?img=5"
            alt="profile"
            className={styles.avatar}
          />
          <div className={styles.onlineDot}></div>
        </div>

        <h2 className={styles.name}>Grace Momo</h2>
        <p className={styles.location}>Lagos, Nigeria</p>

        <div className={styles.verified}>🛡 Identity Verified via NIN</div>
      </div>

      {/* Current Status */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h4>CURRENT STATUS</h4>
          <span className={styles.activeLease}>ACTIVE LEASE</span>
        </div>

        <div className={styles.card}>
          <div className={styles.cardRowTop}>
            <div>
              <p className={styles.label}>Security Deposit Paid</p>
              <h2 className={styles.amount}>₦1,200,000</h2>
            </div>

            <div className={styles.escrow}>🔒 Secure Escrow</div>
          </div>

          <div className={styles.divider}></div>

          <p className={styles.protection}>
            Funds protected by HomeTrust Guarantee Program
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button className={styles.downloadBtn}>⬇ Download Standard Agreement</button>

      {/* Rental Portfolio */}
      <div className={styles.section}>
        <h4 className={styles.portfolioTitle}>RENTAL PORTFOLIO</h4>

        {/* Each item navigates forward */}
        <div
          className={styles.menuItem}
          onClick={() => navigate(routes.securityDeposit)}
        >
          <span>🛡 Security Deposit & Inspection</span>
          <span className={styles.arrow}>›</span>
        </div>

        <div
          className={styles.menuItem}
          onClick={() => navigate(routes.rentalHistory)}
        >
          <span>🕒 My Rental History</span>
          <span className={styles.arrow}>›</span>
        </div>

        <div
          className={styles.menuItem}
          onClick={() => navigate(routes.savedListings)}
        >
          <span>♡ Saved Listings</span>
          <span className={styles.arrow}>›</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <div
          className={styles.navItem}
          onClick={() => navigate(routes.home)}
        >
          <span>🏠</span>
          <p>Home</p>
        </div>
        <div
          className={styles.navItem}
          onClick={() => navigate(routes.search)}
        >
          <span>🔍</span>
          <p>Search</p>
        </div>
        <div
          className={styles.navItem}
          onClick={() => navigate(routes.saved)}
        >
          <span>♡</span>
          <p>Saved</p>
        </div>
        <div
          className={styles.navItem}
          onClick={() => navigate(routes.chat)}
        >
          <span>💬</span>
          <p>Chat</p>
        </div>
        <div
          className={`${styles.navItem} ${styles.active}`}
          onClick={() => navigate(routes.profile)}
        >
          <span>👤</span>
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}