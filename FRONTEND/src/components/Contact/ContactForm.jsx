// src/components/Contact/ContactForm.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contact.module.css";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage("");
    setShowSuccessAlert(false);

    emailjs
      .sendForm(
        "service_x1y2z3a", // Service ID
        "template_abc123", // Template ID
        e.target,
        "zXI_s1A7E6MXJ6l7s" // Public Key
      )
      .then(
        () => {
          setIsSending(false);
          setStatusMessage("✅ Message sent successfully!");
          setShowSuccessAlert(true);
          e.target.reset();
          
          // Auto-hide success alert after 5 seconds
          setTimeout(() => {
            setShowSuccessAlert(false);
            setStatusMessage("");
          }, 5000);
        },
        (error) => {
          setIsSending(false);
          setStatusMessage("❌ Failed to send message. Try again later.");
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  return (
    <>
      {/* TEDx-themed Success Alert */}
      {showSuccessAlert && (
        <div className={styles.tedxAlert} role="alert">
          <div className={styles.alertContent}>
            <div className={styles.alertHeader}>
              <div className={styles.alertIcon}>
                ✓
              </div>
              <div>
                <div className={styles.tedxLogo}>TED<strong>x</strong>PCCOER</div>
                <div className={styles.alertTitle}>Message Successfully Sent!</div>
              </div>
            </div>
            
            <div className={styles.alertBody}>
              <p className={styles.alertText}>
                <strong>Thank you for reaching out!</strong> Your message has been delivered to the TEDxPCCOER team. We appreciate you taking the time to contact us.
              </p>
            </div>
            
            <div className={styles.alertFooter}>
              <span className={styles.alertTag}>#IdeasWorthSpreading</span>
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

        {/* Regular status message (for errors) */}
        {statusMessage && !showSuccessAlert && (
          <p
            className={`${styles.status} ${
              statusMessage.startsWith("✅") ? styles.statusSuccess : styles.statusError
            }`}
          >
            {statusMessage}
          </p>
        )}
      </form>
    </>
  );
}