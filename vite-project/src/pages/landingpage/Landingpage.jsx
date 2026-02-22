import styles from "./Landingpage.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navhome from '../../assets/Icon/Navhome.png';
import Logo from "../../assets/Icon/logo.svg?react";

import Greendot from '../../assets/Icon/greendot.svg?react';
import Bluedot from '../../assets/Icon/bluedot.svg?react';
import Searchicon from '../../assets/Icon/searchicon.svg?react';
import Houseicon from '../../assets/Icon/houseicon.svg?react';
import Searchicon2 from '../../assets/Icon/searchicon2.svg?react';
import Savedicon from '../../assets/Icon/savedicon.svg?react';
import Chat from '../../assets/Icon/chat icon.svg?react';
import Profile from '../../assets/Icon/profile icon.svg?react';
import Dollaricon from '../../assets/Icon/dollar icon.svg?react';
import Lockicon from '../../assets/Icon/lock icon.svg?react';

export default function Landingpage() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================================
     ROLE + VERIFICATION PROTECTION
  ================================= */
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const isVerified = localStorage.getItem("isVerified");

    // If no role → back to login
    if (!role) {
      navigate("/login");
      return;
    }

    // If landlord → go to landlord dashboard
    if (role === "landlord") {
      navigate("/landlorddashboard");
      return;
    }

    // If tenant but not verified → upload ID
    if (role === "tenant" && isVerified !== "true") {
      navigate("/uploadid");
    }
  }, [navigate]);

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const areas = [
    { name: "Victoria Island", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791" },
    { name: "Lekki Phase 1", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { name: "Ikoyi", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" },
    { name: "Yaba", img: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb" },
    { name: "Maitama", img: "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg" },
    { name: "Asokoro", img: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg" },
    { name: "Lugbe", img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" },
    { name: "Gwarinpa", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" },
  ];

  /* ================================
     FETCH PROPERTIES FROM YOUR REAL BACKEND
  ================================= */
  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hometrust-backend.duckdns.org/api/properties"
      );

      if (!response.ok) throw new Error("Failed to fetch listings");

      const data = await response.json();
      setListings(data.properties || []);

      navigate("/search", { state: { listings: data.properties || [] } });
    } catch (err) {
      console.error(err);
      alert("Error fetching listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}><Logo /></div>
        <div className={styles.headerButtons}>
          <button
            className={styles.signup}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log out
          </button>
        </div>
      </header>

      <div className={styles.hero}>
        <img src={Navhome} alt="home" />
        <div className={styles.heroOverlay}>
          <span className={styles.verified}>✔ VERIFIED LISTINGS</span>
          <h1>The secure bridge for Nigerian rentals</h1>
          <p>Say goodbye to fake agents & experience true transparency.</p>
        </div>
      </div>

      <div className={styles.stats}>
        <span><Greendot /> 1k+ Active Listings</span>
        <span><Bluedot /> Lagos & Abuja</span>
      </div>

      <div className={styles.mainButtons}>
        <button
          className={styles.primary}
          onClick={fetchListings}
          disabled={loading}
        >
          {loading ? "Loading..." : <><Searchicon /> Find a Home</>}
        </button>

        <button
          className={styles.secondary}
          onClick={() => navigate("/search")}
        >
          <Houseicon /> Browse Listings
        </button>
      </div>

      <h3 className={styles.sectionTitle}>Why trust us?</h3>

      <div className={styles.iconNav}>
        <div onClick={() => navigate("/landingpage")}>
          <Houseicon />
          <span>Home</span>
        </div>

        <div onClick={() => navigate("/search")}>
          <Searchicon2 />
          <span>Search</span>
        </div>

        <div onClick={() => navigate("/saved")}>
          <Savedicon />
          <span>Saved</span>
        </div>

        <div onClick={() => navigate("/chat")}>
          <Chat />
          <span>Chat</span>
        </div>

        <div onClick={() => navigate("/tenantprofile")}>
          <Profile />
          <span>Profile</span>
        </div>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardIcon}><Dollaricon /></div>
          <div>
            <h4>Transparent Fees</h4>
            <p>No hidden charges or surprise costs.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}><Lockicon /></div>
          <div>
            <h4>Secure Deposits</h4>
            <p>Your money is held safely until move-in is confirmed.</p>
          </div>
        </div>
      </div>

      <div className={styles.popularHeader}>
        <h3>Popular Areas</h3>
        <button className={styles.seeAll} onClick={scrollRight}>
          See All →
        </button>
      </div>

      <div className={styles.scrollWrapper}>
        <button className={`${styles.scrollBtn} ${styles.left}`} onClick={scrollLeft}>
          ◀
        </button>

        <div className={styles.areaContainer} ref={scrollRef}>
          {areas.map((area, index) => (
            <div className={styles.areaCard} key={index}>
              <img src={area.img} alt={area.name} />
              <div className={styles.areaName}>{area.name}</div>
            </div>
          ))}
        </div>

        <button className={`${styles.scrollBtn} ${styles.right}`} onClick={scrollRight}>
          ▶
        </button>
      </div>
    </div>
  );
}