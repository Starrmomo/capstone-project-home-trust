import { useNavigate } from "react-router-dom";

import Houseicon from '../../assets/Icon/houseicon.svg?react';
import Searchicon2 from '../../assets/Icon/searchicon2.svg?react';
import Savedicon from '../../assets/Icon/savedicon.svg?react';
import Chat from '../../assets/Icon/chat icon.svg?react';
import Profile from '../../assets/Icon/profile icon.svg?react';

import styles from "../../pages/search/Search.module.css";

export default function BottomNav({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const tabs = [
    { name: "Home", path: "/landingpage" },
    { name: "Search", path: "/search" },
    { name: "Saved", path: "/saved" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile" },
  ];

  const handleClick = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.path); // Navigate to the page
  };

  return (
    <div className={styles.bottomNav}>
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`${styles.navItem} ${
            activeTab === tab.name ? styles.activeNav : ""
          }`}
          onClick={() => handleClick(tab)}
        >
          <span>
            {tab.name === "Home" && "🏠"}
            {tab.name === "Search" && <Searchicon2 />}
            {tab.name === "Saved" && <Savedicon />}
            {tab.name === "Chat" && <Chat />}
            {tab.name === "Profile" && <Profile />}
          </span>
          <p>{tab.name}</p>
        </div>
      ))}
    </div>
  );
}