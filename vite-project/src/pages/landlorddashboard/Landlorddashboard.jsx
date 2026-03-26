import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landlorddashboard.module.css";
import Chatbot from "../../components/Chatbot/Chatbot";
import Bell from '../../assets/Icon/bell.svg?react';
import Landlordhouse from '../../assets/Icon/landlordhouse.svg?react';
import Pendingapp from '../../assets/Icon/pendinngapp.svg?react';
import Landlorddollar from '../../assets/Icon/landlorddollar.svg?react';
import Profile from '../../assets/Icon/profile icon.svg?react';
import Chat from '../../assets/Icon/chat icon.svg?react';
import Properties from '../../assets/Icon/properties.svg?react';
import Home from '../../assets/Icon/dashboard.svg?react';
import Postsearch from '../../assets/Icon/PostSearch.svg?react';
import Managepayment from '../../assets/Icon/ManagePayments.svg?react';

import Homeicon from '../../assets/Icon/homeicon.svg?react';
import Newinquiry from '../../assets/Icon/NewInquiry.svg?react';
import Paymenticon from '../../assets/Icon/PaymentReceived.svg?react';
import Alerticon from '../../assets/Icon/VerificationSuccess.svg?react';

export default function Dashboard() {
    const navigate = useNavigate();

    // ✅ Logout function (ADDED)
    const handleLogout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    // ✅ Dummy landlord
    const [landlord] = useState({
        name: "John Doe",
        profilePicture: null,
    });

    // ✅ Dummy properties/payments/notifications
    const [properties] = useState([
        { id: 1, name: "3 Bedroom House", location: "Ikoyi" },
        { id: 2, name: "2 Bedroom Apartment", location: "Lekki" },
        { id: 3, name: "Studio Flat", location: "Victoria Island" },
    ]);

    const [payments] = useState([
        { id: 1, amount: 200000 },
        { id: 2, amount: 150000 },
        { id: 3, amount: 180000 },
    ]);

    const [notifications] = useState([
        { title: "New Application", message: "You have a new applicant", type: "application" },
        { title: "Payment Received", message: "₦200,000 payment has been confirmed", type: "payment" },
        { title: "Maintenance Alert", message: "Plumbing issue reported", type: "alert" },
    ]);

    const totalRent = payments.reduce((acc, item) => acc + item.amount, 0);

    const profileImage = landlord.profilePicture
        ? landlord.profilePicture
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(landlord.name)}&background=0D8ABC&color=fff`;

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <img src={profileImage} alt="user" className={styles.avatar} />
                    <div>
                        <p className={styles.welcome}>Welcome back,</p>
                        <h3>{landlord.name}</h3>
                    </div>
                </div>

                <div className={styles.headerIcons}>
                    <span><Bell /></span>

                    {/* ✅ Logout button (ADDED BESIDE BELL) */}
                    <button className={styles.signup} onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </header>

            {/* Stats */}
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

            {/* Quick Actions */}
            <section className={styles.section}>
                <h4>Quick Actions</h4>
                <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => navigate("/basicinfo")}>
                        <Homeicon />
                        Post New Listing
                    </button>

                    <button className={`${styles.actionBtn} ${styles.primary}`} onClick={() => navigate("/propertydetails")}>
                        <Postsearch />
                        Inspect Property
                    </button>

                    <button className={styles.actionBtn} onClick={() => navigate("/properties")}>
                        <Managepayment />
                        Manage Payments
                    </button>
                </div>
            </section>

            {/* Recent Activity */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h4>Recent Activity</h4>
                </div>

                <div className={styles.activityList}>
                    {notifications.map((note, index) => (
                        <div key={index} className={styles.activityItem}>

                            <div className={styles.iconBlue}>
                                {note.type === "application" && <Newinquiry />}
                                {note.type === "payment" && <Paymenticon />}
                                {note.type === "alert" && <Alerticon />}
                            </div>

                            <div className={styles.notifytext}>
                                <h4>{note.title}</h4>
                                <p>{note.message}</p>
                            </div>

                        </div>
                    ))}
                </div>

                <Chatbot/>
            </section>

            {/* Bottom Nav */}
            <nav className={styles.bottomNav}>
                <div className={styles.bottomdiv} onClick={() => navigate("/landlorddashboard")}>
                    <Home />
                    <button className={styles.activeNav}>Dashboard</button>
                </div>
                <div className={styles.bottomdiv} onClick={() => navigate("/properties")}>
                    <Properties />
                    <button>Properties</button>
                </div>
                <div className={styles.bottomdiv} onClick={() => navigate("/chat")}>
                    <Chat />
                    <button>Chat</button>
                </div>
                <div className={styles.bottomdiv} onClick={() => navigate("/profile")}>
                    <Profile />
                    <button>Profile</button>
                </div>
            </nav>
        </div>
    );
}