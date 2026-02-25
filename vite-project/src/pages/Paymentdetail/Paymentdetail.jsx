
import { useState, useEffect } from "react";
import styles from "./Paymentdetail.module.css";

export default function PaymentDetails() {
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      form.cardNumber.replace(/\s/g, "").length === 16 &&
      form.expiry.length === 5 &&
      form.cvv.length === 3 &&
      form.name.trim().length > 2;

    setIsValid(valid);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
      setForm({ ...form, cardNumber: formatted });
      return;
    }

    if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      const formatted =
        cleaned.length > 2
          ? cleaned.slice(0, 2) + "/" + cleaned.slice(2)
          : cleaned;
      setForm({ ...form, expiry: formatted });
      return;
    }

    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 3);
      setForm({ ...form, cvv: cleaned });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardContainer}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.backArrow}>←</span>
          <h2>Payment Details</h2>
        </div>

        {/* Amount Box */}
        <div className={styles.amountBox}>
          <p>Amount to Pay</p>
          <h1>₦3,250,000</h1>

          <div className={styles.secureBadge}>
            <div className={styles.greenLock}></div>
            Secure Transaction
          </div>
        </div>

        {/* Card Number */}
        <div className={styles.field}>
          <label>Card Number</label>
          <div
            className={`${styles.inputWrapper} ${
              form.cardNumber ? styles.active : ""
            }`}
          >
            <input
              type="text"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={form.cardNumber}
              onChange={handleChange}
            />
            <div className={styles.visaBadge}>VISA</div>
          </div>
        </div>

        {/* Expiry + CVV */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Expiry Date</label>
            <div
              className={`${styles.inputWrapper} ${
                form.expiry ? styles.active : ""
              }`}
            >
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>CVV</label>
            <div
              className={`${styles.inputWrapper} ${
                form.cvv ? styles.active : ""
              }`}
            >
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className={styles.field}>
          <label>Cardholder Name</label>
          <div
            className={`${styles.inputWrapper} ${
              form.name ? styles.active : ""
            }`}
          >
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Save */}
        <div className={styles.saveRow}>
          <input type="checkbox" />
          <span>Save card for future payments?</span>
        </div>

        {/* Pay Button */}
        <button
          className={`${styles.payButton} ${
            isValid ? styles.enabled : ""
          }`}
          disabled={!isValid}
        >
          <div className={styles.whiteLock}></div>
          Pay ₦3,250,000
        </button>
      </div>
    </div>
  );
}
