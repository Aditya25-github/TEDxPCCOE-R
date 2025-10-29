// src/components/Contact/ContactForm.jsx
import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");
    setShowSuccessAlert(false);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatusMessage("🎉 Message sent successfully!");
        setShowSuccessAlert(true);
        e.target.reset();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessAlert(false);
          setStatusMessage("");
        }, 5000);
      } else {
        setStatusMessage("❌ Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error("SendMail Error:", error);
      setStatusMessage("❌ Something went wrong. Try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* TEDx-themed Success Alert */}
      {showSuccessAlert && (
        <div className={styles.tedxAlert} role="alert">
          <div className={styles.alertContent}>
            <div className={styles.alertHeader}>
              <span className={styles.alertIcon}>✓</span>
              <span className={styles.tedxLogo}>TED<strong>x</strong></span>
            </div>
            <div className={styles.alertBody}>
              <h4 className={styles.alertTitle}>Ideas Worth Spreading</h4>
              <p className={styles.alertText}>
                <strong>Your message has been delivered!</strong> Thank you for reaching out. 
                We're excited to connect with you and will respond shortly.
              </p>
            </div>
            <div className={styles.alertFooter}>
              <span className={styles.alertTag}>#TEDxPccoer</span>
              <button 
                className={styles.alertClose}
                onClick={() => setShowSuccessAlert(false)}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row2}>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Your Email"
            required
          />
        </div>

        <input
          className={styles.input}
          name="subject"
          type="text"
          placeholder="Subject"
          required
        />

        <textarea
          className={`${styles.input} ${styles.textarea}`}
          name="message"
          placeholder="Message"
          rows={6}
          required
        />

        <div className={styles.actions}>
          <button 
            className={`${styles.btn} ${isSending ? styles.btnSending : ''}`} 
            type="submit" 
            disabled={isSending}
          >
            {isSending ? (
              <>
                <span className={styles.spinner}></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>

        {statusMessage && !showSuccessAlert && (
          <p
            className={`${styles.status} ${
              statusMessage.startsWith("🎉") ? styles.statusSuccess : styles.statusError
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </>
  );
}