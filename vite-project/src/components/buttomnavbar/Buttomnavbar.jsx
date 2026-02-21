import Houseicon from '../../assets/Icon/houseicon.svg?react'
import Searchicon2 from '../../assets/Icon/searchicon2.svg?react'
import Savedicon from '../../assets/Icon/savedicon.svg?react'
import Chat from '../../assets/Icon/chat icon.svg?react'
import Profile from '../../assets/Icon/profile icon.svg?react'


import styles from "../../pages/search/Search.module.css";

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = ["Home", "Search", "Saved", "Chat", "Profile"];

  return (
    <div className={styles.bottomNav}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.navItem} ${
            activeTab === tab ? styles.activeNav : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          <span>
            {tab === "Home" && "🏠"}
            {tab === "Search" && <Searchicon2/> }
            {tab === "Saved" && <Savedicon/>}
            {tab === "Chat" && <Chat></Chat> }
            {tab === "Profile" && <Profile/>}
          </span>
          <p>{tab}</p>
        </div>
      ))}
    </div>
  );
}


