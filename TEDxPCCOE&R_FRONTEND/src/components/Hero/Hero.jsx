import React from "react";
import styles from "./Hero.module.css";

export default function Hero({ scrollToId }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <h1 id="hero-heading" className={styles.heroTitle}>
          TEDxPCCOE&amp;R 2025
        </h1>
        <p className={styles.heroSubtitle}>Ideas Worth Spreading</p>
        <div
          className={styles.ctaRow}
          role="group"
          aria-label="Primary actions"
        >
          <button
            className={styles.btnSecondary}
            onClick={() => scrollToId("about")}
          >
            About Event
          </button>
          <a
            className={styles.btnPrimary}
            href="/tickets"
            aria-label="Get Tickets"
          >
            Get Tickets
          </a>
          <button
            className={styles.btnGhost}
            onClick={() => scrollToId("trailer")}
          >
            Watch Trailer
          </button>
        </div>
      </div>
      <div className={styles.heroMedia} aria-hidden="true">
        {/* <video autoPlay muted loop playsInline src="/media/hero.mp4" /> */}
      </div>
    </section>
  );
}
