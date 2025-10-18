import React from "react";
import styles from "./Contact.module.css";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="How can we help?"
          required
        />
      </div>
      <button className={styles.btnPrimary} type="submit">
        Send
      </button>
    </form>
  );
}
