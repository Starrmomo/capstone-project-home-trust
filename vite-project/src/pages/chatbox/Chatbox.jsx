




import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import styles from "./Chatbox.module.css";

import backIcon from "../../assets/Icon/backarrow.svg";
import moreIcon from "../../assets/Icon/more.svg";
import shieldIcon from "../../assets/Icon/shield.svg";
import plusIcon from "../../assets/Icon/plus.svg";
import sendIcon from "../../assets/Icon/sendicon.svg";
import downloadIcon from "../../assets/Icon/download.svg";
import verifiedGreen from "../../assets/Icon/verifiedbatch.svg";
import verifiedBlue from "../../assets/Icon/verifiedbatch2.svg";
import doubleTickBlue from "../../assets/Icon/double-tick.svg";
import pdfIcon from "../../assets/Icon/pdf.svg";

import avatar1 from "../../assets/Icon/graceavatar.jpg";
import avatar2 from "../../assets/Icon/LandlordAvatar.jpg";
import avatar3 from "../../assets/Icon/Landlord-Avatar.jpg";

export default function SecureMessaging() {
  const navigate = useNavigate(); // ✅ added navigate
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      text: "Hello! Thanks for your interest. The apartment is still available for viewing this weekend.",
      time: "10:23 AM",
      avatar: avatar2,
    },
    {
      id: 2,
      type: "sent",
      text: "Great! I'm very interested. Before I come, could I see the utility bill history for the last few months? I want to confirm the NEPA situation.",
      time: "10:45 AM",
      avatar: null,
      status: "sent",
    },
    {
      id: 3,
      type: "received",
      text: "Sure, transparency is key. Here is the bill from last month.",
      time: "09:15 AM",
      avatar: avatar3,
      pdf: {
        name: "NEPA_Bill_Oct_2023.pdf",
        size: "245 KB • PDF",
      },
    },
  ]);

  const fileInputRef = useRef();
  const messagesEndRef = useRef();

  // 🔹 Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Handle sending message
  const handleSendMessage = () => {
    if (!message.trim()) return; // Don't send empty messages

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "sent",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "sent",
      },
    ]);

    setMessage(""); // clear input
  };

  // 🔹 Send on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // 🔹 Back button handler
  // 🔹 Back button handler
const handleBack = () => {
  navigate("/propertydetails", { state: { /* pass property info if needed */ } });
};

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        {/* HEADER */}
        <header className={styles.header}>
          <img
            src={backIcon}
            alt="Back"
            className={styles.iconBtn}
            onClick={handleBack} // ✅ make back functional
          />

          <div className={styles.profile}>
            <div className={styles.avatarRow}>
              <img src={avatar1} alt="" className={styles.avatar} />
              <img src={verifiedGreen} alt="Verified" className={styles.greenBadge} />
            </div>
            <div className={styles.info}>
              <div className={styles.nameRow}>
                <span className={styles.name}>Grace Momo</span>
                <div className={styles.verifiedWrap}>
                  <img src={verifiedBlue} alt="Verified" className={styles.verifiedIcon} />
                  <span className={styles.verifiedText}>Verified</span>
                </div>
              </div>
              <span className={styles.subtext}>Typically replies within 1 hour</span>
            </div>
          </div>

          <img src={moreIcon} alt="" className={styles.iconBtn} />
        </header>

        {/* SAFETY */}
        <div className={styles.safety}>
          <img src={shieldIcon} alt="" />
          <p>
            <strong>Safety Tip:</strong> Keep conversations here for your protection.
            Transactions made outside HomeTrust are not covered.
          </p>
        </div>

        {/* MESSAGES */}
        <main className={styles.messages}>
          {messages.map((msg) => (
            <div key={msg.id} className={msg.type === "sent" ? styles.sentRow : styles.receivedRow}>
              {msg.type === "received" && <img src={msg.avatar} alt="" className={styles.smallAvatar} />}
              <div className={msg.type === "sent" ? styles.msgGroupRight : styles.msgGroup}>
                <div className={msg.type === "sent" ? styles.bubbleSent : styles.bubbleReceived}>
                  {msg.text}
                  {msg.pdf && (
                    <div className={styles.pdfCard}>
                      <div className={styles.pdfIconWrap}>
                        <img src={pdfIcon} alt="" className={styles.pdfIcon} />
                      </div>
                      <div className={styles.pdfMeta}>
                        <span className={styles.fileName}>{msg.pdf.name}</span>
                        <span className={styles.fileSize}>{msg.pdf.size}</span>
                      </div>
                      <img src={downloadIcon} alt="" />
                    </div>
                  )}
                </div>
                <span className={msg.type === "sent" ? styles.timeSent : styles.time}>
                  {msg.time}
                  {msg.status === "sent" && <img src={doubleTickBlue} alt="" />}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </main>

        {/* INPUT */}
        <footer className={styles.inputBar}>
          <img
            src={plusIcon}
            alt=""
            className={styles.iconBtn}
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            className={styles.inputField}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className={styles.sendBtn} onClick={handleSendMessage}>
            <img src={sendIcon} alt="" />
          </button>
        </footer>
      </div>
    </div>
  );
}