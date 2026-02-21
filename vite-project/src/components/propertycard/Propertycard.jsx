import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./propertycard.module.css";
import Star from "../../assets/Icon/star.svg?react";
import Location from "../../assets/Icon/location.svg?react";

export default function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/propertydetails/${property.id}`);
  };

  return (
    <div className={styles.card} onClick={goToDetails}>
      <div className={styles.imageWrapper}>
        {property.verified && (
          <span className={styles.verified}>✔ VERIFIED</span>
        )}
        <span
          className={styles.heart}
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            setLiked(!liked);
          }}
        >
          {liked ? "❤️" : "🤍"}
        </span>
        <img src={property.image} alt={property.title} />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.titleRow}>
          <h3>{property.title}</h3>
          <span className={styles.rating}>
            <Star /> {property.rating}
          </span>
        </div>

        <p className={styles.location}>
          <Location /> {property.location}
        </p>

        <div className={styles.details}>
          <span className={styles.Beds}>🛏 {property.beds} Beds</span>
          <span className={styles.Beds}>🛁 {property.baths} Baths</span>
          <span className={styles.Beds}>{property.size}</span>
        </div>

        <div className={styles.priceRow}>
          <div>
            <h2>{property.price}</h2>
            <small>+ Agency & Legal Fees</small>
          </div>
          <button className={styles.arrowBtn}>→</button>
        </div>
      </div>
    </div>
  );
}