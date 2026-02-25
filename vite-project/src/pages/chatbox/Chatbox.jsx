


import { useState, useRef } from "react";
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
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        {/* HEADER */}
        <header className={styles.header}>
          <img src={backIcon} alt="" className={styles.iconBtn} />

          <div className={styles.profile}>
           
            {/* Avatar with GREEN badge */}
            <div className={styles.avatarRow}>
              <img src={avatar1} alt="" className={styles.avatar} />
              <img
                src={verifiedGreen}
                alt="Verified"
                className={styles.greenBadge}
              />
            </div>

            <div className={styles.info}>
              <div className={styles.nameRow}>
                <span className={styles.name}>Grace Momo</span>

                {/* BLUE Verified badge + text */}
                <div className={styles.verifiedWrap}>
                  <img
                    src={verifiedBlue}
                    alt="Verified"
                    className={styles.verifiedIcon}
                  />
                  <span className={styles.verifiedText}>
                    Verified
                  </span>
                </div>
              </div>

              <span className={styles.subtext}>
                Typically replies within 1 hour
              </span>
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

          <div className={styles.dateDivider}>YESTERDAY</div>

          <div className={styles.receivedRow}>
            <img src={avatar2} alt="" className={styles.smallAvatar} />
            <div className={styles.msgGroup}>
              <div className={styles.bubbleReceived}>
                Hello! Thanks for your interest.
                The apartment is still available
                for viewing this weekend.
              </div>
              <span className={styles.time}>10:23 AM</span>
            </div>
          </div>

          <div className={styles.sentRow}>
            <div className={styles.msgGroupRight}>
              <div className={styles.bubbleSent}>
                Great! I'm very interested. Before I
                come, could I see the utility bill history
                for the last few months? I want to
                confirm the NEPA situation.
              </div>
              <span className={styles.timeSent}>
                10:45 AM
                <img src={doubleTickBlue} alt="" />
              </span>
            </div>
          </div>

          <div className={styles.dateDivider}>TODAY</div>

          <div className={styles.receivedRow}>
            <img src={avatar3} alt="" className={styles.smallAvatar} />

            <div className={styles.msgGroup}>
              <div className={styles.bubbleReceived}>
                Sure, transparency is key. Here is
                the bill from last month.

                <div className={styles.pdfCard}>
                  <div className={styles.pdfIconWrap}>
                    <img src={pdfIcon} alt="" className={styles.pdfIcon} />
                  </div>

                  <div className={styles.pdfMeta}>
                    <span className={styles.fileName}>
                      NEPA_Bill_Oct_2023.pdf
                    </span>
                    <span className={styles.fileSize}>
                      245 KB • PDF
                    </span>
                  </div>

                  <img src={downloadIcon} alt="" />
                </div>
              </div>

              <span className={styles.time}>09:15 AM</span>
            </div>
          </div>

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
          />

          <button className={styles.sendBtn}>
            <img src={sendIcon} alt="" />
          </button>
        </footer>

      </div>
    </div>
  );
}
