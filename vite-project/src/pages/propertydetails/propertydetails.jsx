import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./propertydetails.module.css";
import Check from "../../assets/Icon/checkicon.svg?react";
import Lockicon from "../../assets/Icon/lock icon.svg?react";

export default function PropertyDetails() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const properties = [
    {
      id: 1,
      title: "2 Bedroom Flat in Lekki Phase 1",
      location: "Lekki Phase 1, Lagos, Nigeria",
      verified: true,
      landlord: { id: 10, name: "Mr. Ade", location: "Lagos, Nigeria" },
      price: 2000000,
      agencyFee: 200000,
      legalFee: 200000,
      caution: 150000,
      beds: 2,
      baths: 2,
      size: 120,
      description:
        "Experience modern living in this newly built 2-bedroom apartment located in the heart of Lekki. Features 24/7 power supply, secure parking, spacious rooms, modern kitchen fittings, POP ceilings, and excellent road access.",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
    {
      id: 2,
      title: "3 Bedroom Flat in Victoria Island",
      location: "Victoria Island, Lagos, Nigeria",
      verified: false,
      landlord: { id: 11, name: "Mrs. Bayo", location: "Lagos, Nigeria" },
      price: 3000000,
      agencyFee: 300000,
      legalFee: 300000,
      caution: 200000,
      beds: 3,
      baths: 3,
      size: 180,
      description:
        "Spacious 3-bedroom apartment with sea view and modern facilities.",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ];

  const property = properties[currentIndex];

  const total =
    property.price +
    property.agencyFee +
    property.legalFee +
    property.caution;

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      alert("Payment Successful!");
      setPaymentSuccess(false);
    }, 500);
  };

  // 🔥🔥🔥 THIS IS THE IMPORTANT PART
  const goToChat = () => {
    navigate("/chatbox", {   // 👈 PUT YOUR SHARKBOTS ROUTE HERE
      state: {
        landlord: property.landlord,
        property: {
          id: property.id,
          title: property.title,
          image: property.image,
          location: property.location,
        },
      },
    });
  };
  // 🔥🔥🔥 END

  const prevProperty = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? properties.length - 1 : prev - 1
    );
    setShowMore(false);
  };

  const nextProperty = () => {
    setCurrentIndex((prev) =>
      prev === properties.length - 1 ? 0 : prev + 1
    );
    setShowMore(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={property.image}
          alt="property"
          className={styles.image}
        />

        <div className={styles.topIcons}>
          <button className={styles.backBtn} onClick={prevProperty}>
            🔙
          </button>
          <div className={styles.rightIcons}>
            <button
              className={styles.shareBtn}
              onClick={() => alert("Shared!")}
            >
              🔗
            </button>
            <button
              className={styles.loveBtn}
              onClick={() => alert("Added to favorites!")}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h2>{property.title}</h2>
        <p className={styles.location}>{property.location}</p>

        {property.verified && (
          <span className={styles.verified}>Verified Landlord</span>
        )}

        <span className={styles.trustScore}>Trust Score 92/100</span>

        <div className={styles.propertyInfo}>
          <div className={styles.infoItem}>
            <span className={styles.icon}>🛏</span>
            <span className={styles.text}>{property.beds} Bed</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}>🛁</span>
            <span className={styles.text}>{property.baths} Bath</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📐</span>
            <span className={styles.text}>{property.size} m²</span>
          </div>
        </div>

        <div className={styles.breakdown}>
          <h4>Total Cost Breakdown</h4>

          <p className={styles.row}>
            <span>Annual Rent</span>
            <span>₦{property.price.toLocaleString()}</span>
          </p>

          <p className={styles.row}>
            <span>Agency Fee</span>
            <span>₦{property.agencyFee.toLocaleString()}</span>
          </p>

          <p className={styles.row}>
            <span>Legal Fee</span>
            <span>₦{property.legalFee.toLocaleString()}</span>
          </p>

          <p className={styles.row}>
            <span>Caution</span>
            <span>₦{property.caution.toLocaleString()}</span>
          </p>

          <h3 className={styles.totalRow}>
            <span>Total Move-in Cost</span>
            <span>₦{total.toLocaleString()}</span>
          </h3>
        </div>

        <div className={styles.lockicon}>
          <Lockicon width={24} height={24} />
          <p>Payment is held in escrow until you move in.</p>
        </div>

        <div className={styles.about}>
          <h4>About this home</h4>
          <p>
            {showMore
              ? property.description
              : property.description.slice(0, 100) + "..."}
          </p>

          <button
            className={styles.readMore}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <button className={styles.messageBtn} onClick={goToChat}>
          💬
        </button>

        <button className={styles.payBtn} onClick={handlePayment}>
          {paymentSuccess ? (
            "Processing..."
          ) : (
            <>
              <Check className={styles.icon} />
              Secure Payment
            </>
          )}
        </button>
      </div>
    </div>
  );
}