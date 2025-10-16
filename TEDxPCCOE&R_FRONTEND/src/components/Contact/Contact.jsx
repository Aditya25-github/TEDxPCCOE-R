import React from "react";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.sectionHead}>
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Contact
        </h2>
        <p className={styles.sectionDesc}>Reach out or find us on the map.</p>
      </div>
      <div className={styles.contactGrid}>
        <div className={styles.mapWrap} aria-label="Venue map">
          <iframe
            title="PCCOE&R Auditorium Map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!..."
          />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
