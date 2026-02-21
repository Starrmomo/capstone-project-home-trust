import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Landlorddashboard.module.css";

import Bell from '../../assets/Icon/bell.svg?react'
import Landlordhouse from '../../assets/Icon/landlordhouse.svg?react'
import Pendingapp from '../../assets/Icon/pendinngapp.svg?react'
import Landlorddollar from '../../assets/Icon/landlorddollar.svg?react'
import Profile from '../../assets/Icon/profile icon.svg?react'
import Chat from '../../assets/Icon/chat icon.svg?react'
import Properties from '../../assets/Icon/properties.svg?react'
import Home from '../../assets/Icon/dashboard.svg?react'

const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [landlord, setLandlord] = useState(null);
    const [properties, setProperties] = useState([]);
    const [payments, setPayments] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await fetch(
                    "http://localhost:5000/api/landlord/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    navigate("/login");
                    return;
                }

                setLandlord(data.landlord);
                setProperties(data.properties);
                setPayments(data.payments);
                setNotifications(data.notifications);

            } catch (err) {
                console.log(err);
                navigate("/login");
            }
        };

        fetchDashboard();
    }, [navigate]);

    const totalRent = payments.reduce(
        (acc, item) => acc + item.amount,
        0
    );

    return (
        <div className={styles.page}>

            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <img
                        src={`https://ui-avatars.com/api/?name=${landlord?.name}`}
                        alt="user"
                        className={styles.avatar}
                    />
                    <div>
                        <p className={styles.welcome}>Welcome back,</p>
                        <h3>{landlord?.name}</h3>
                    </div>
                </div>

                <div className={styles.headerIcons}>
                    <span><Bell /></span>
                    <span className={styles.profileCircle}>
                        {landlord?.name?.charAt(0)}
                    </span>
                </div>
            </header>

            <section className={styles.stats}>
                <div className={styles.statCard}>
                    <Landlordhouse />
                    <p>Active Listings</p>
                    <h2>{properties.length}</h2>
                </div>

                <div className={styles.statCard}>
                    <Pendingapp />
                    <p>Pending Apps</p>
                    <h2>
                        {notifications.filter(n => n.type === "application").length}
                        <span className={styles.dot}></span>
                    </h2>
                </div>

                <div className={styles.statCard}>
                    <Landlorddollar />
                    <p>Rent Collected</p>
                    <h2>₦{totalRent.toLocaleString()}</h2>
                </div>
            </section>

            <section className={styles.section}>
                <h4>Quick Actions</h4>

                <div className={styles.actions}>
                    <button
                        className={`${styles.actionBtn} ${styles.primary}`}
                        onClick={() => navigate("/properties")}
                    >
                        Inspect Property
                    </button>

                    <button
                        className={styles.actionBtn}
                        onClick={() => navigate("/post-listing")}
                    >
                        Post New Listing
                    </button>

                    <button
                        className={styles.actionBtn}
                        onClick={() => navigate("/properties")}
                    >
                        Manage Payments
                    </button>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h4>Recent Activity</h4>
                </div>

                <div className={styles.activityList}>
                    {notifications.map((note, index) => (
                        <div key={index} className={styles.activityItem}>
                            <div className={styles.iconBlue}>🔔</div>
                            <div>
                                <strong>{note.title}</strong>
                                <p>{note.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <nav className={styles.bottomNav}>

                <div className={styles.bottomdiv}
                    onClick={() => navigate("/landlord-dashboard")}>
                    <Home />
                    <button className={
                        location.pathname === "/landlord-dashboard"
                            ? styles.activeNav
                            : ""
                    }>
                        Dashboard
                    </button>
                </div>

                <div className={styles.bottomdiv}
                    onClick={() => navigate("/properties")}>
                    <Properties />
                    <button className={
                        location.pathname === "/properties"
                            ? styles.activeNav
                            : ""
                    }>
                        Properties
                    </button>
                </div>

                <div className={styles.bottomdiv}
                    onClick={() => navigate("/chat")}>
                    <Chat />
                    <button className={
                        location.pathname === "/chat"
                            ? styles.activeNav
                            : ""
                    }>
                        Chat
                    </button>
                </div>

                <div className={styles.bottomdiv}
                    onClick={() => navigate("/profile")}>
                    <Profile />
                    <button className={
                        location.pathname === "/profile"
                            ? styles.activeNav
                            : ""
                    }>
                        Profile
                    </button>
                </div>

            </nav>

        </div>
    );
};

export default Dashboard;