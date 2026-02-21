import { useNavigate } from "react-router-dom";
import styles from "./TrustVerification.module.css";
import houseImage from "../../assets/Icon/house.png";

export default function TrustVerification() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.topBar}>
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.imageWrapper}>
            <img
              src={houseImage}
              alt="House for Rent"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>
              Built on Verification,
              <br />
              Backed by Trust
            </h1>

            <p className={styles.subtitle}>
              Connecting trusted tenants and landlords for stress free renting
            </p>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <button
            className={styles.nextBtn}
            onClick={() => navigate("/home")}
          >
            <span>Next</span>
            <span className={styles.arrow}>→</span>
          </button>

          <div className={styles.pagination}>
            <span className={styles.dot}></span>
            <span className={`${styles.dot} ${styles.activeDot}`}></span>
          </div>
        </div>

      </div>
    </div>
  );
}
