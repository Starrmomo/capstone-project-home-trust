import styles from "./Search.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/propertycard/Propertycard";
import BottomNav from "../../components/buttomnavbar/Buttomnavbar";
import Location from '../../assets/Icon/location.svg?react';
import Bell from '../../assets/Icon/bell.svg?react';

export default function Search() {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔹 Dummy property list
  const properties = [
    {
      id: 1,
      title: "2 Bedroom Flat in Lekki Phase 1",
      location: "Adetunji Vies, Lekki, Lagos",
      beds: 2,
      baths: 2,
      size: "120 sqm",
      price: "₦2,500,000",
      rating: 4.8,
      verified: true,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    },
    {
      id: 2,
      title: "Studio Apartment",
      location: "Lekki, Lagos",
      beds: 1,
      baths: 1,
      size: "Serviced",
      price: "₦3,800,000",
      rating: 4.6,
      verified: true,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    },
    {
      id: 3,
      title: "3 Bedroom Duplex in Victoria Island",
      location: "Adetola Dekor, VI Lagos",
      beds: 3,
      baths: 3,
      size: "24hr Sec",
      price: "₦2,500,000",
      rating: 5.0,
      verified: true,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
  ];

  // 🔹 Navigate to property details
  const handlePropertyClick = (property) => {
    navigate("/propertydetails", { state: { property } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.welcome}>Welcome back,</p>
          <h2>Find your next home</h2>
        </div>
        <div className={styles.notification}><Bell /></div>
      </div>

      {/* Search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search properties in Lagos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>⚙</span>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <button className={styles.active}><Location />Lekki</button>
        <button>Price Range ▼</button>
        <button>2+ Beds</button>
        <button>More</button>
      </div>

      {/* Property Listings */}
      <div className={styles.listings}>
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => handlePropertyClick(property)} // 🔹 Clickable
            style={{ cursor: "pointer" }}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}