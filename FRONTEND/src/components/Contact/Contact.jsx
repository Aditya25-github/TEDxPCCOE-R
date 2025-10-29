// src/components/Contact/Contact.jsx
import React from "react";
import styles from "./Contact.module.css";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <header className={styles.header}>
        <h2 id="contact-heading" className={styles.title}>
          CONTACT US
        </h2>
        <span className={styles.underline} aria-hidden="true" />
        <p className={styles.subtitle}>
          We would love to respond to your queries and help you succeed. Feel
          free to get in touch with us.
        </p>
      </header>

      <div className={styles.grid}>
        {/* Left column: info cards */}
        <div className={styles.infoCol}>
          <div className={styles.card}>
            <div className={styles.iconWrap} aria-hidden="true">
              📍
            </div>
            <h3 className={styles.cardTitle}>Our Address</h3>
            <p className={styles.cardText}>
              Plot No. B, Sector no. 110, Gate no.1, Laxminagar, Ravet, Haveli,
              Pune - 412101.
            </p>
          </div>

          <div className={styles.rowCards}>
            <div className={styles.cardSm}>
              <div className={styles.iconWrap} aria-hidden="true">
                ✉
              </div>
              <h4 className={styles.cardTitle}>Email Us</h4>
              <p className={styles.cardText}>
                Official Email: tedxpccoer@gmail.com
              </p>
            </div>

            <div className={styles.cardSm}>
              <div className={styles.iconWrap} aria-hidden="true">
                📞
              </div>
              <h4 className={styles.cardTitle}>Call Us</h4>
              <p className={styles.cardText}>
                Organizer: +91 8788289660 (Pranav)
                <br />
                Co-Organizer: +91 9272999555 (Shashank)
              </p>
            </div>
          </div>
        </div>

        {/* Right column: contact form */}
        <div className={styles.formCol}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}