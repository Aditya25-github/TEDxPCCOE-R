import React, { useState, useEffect } from "react";
import Background from "../Background/Background";
import styles from "./Hero.module.css";
import heroImage from "../../assets/hero1.jpg";

export default function Hero({ scrollToId }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Background type="image" src={heroImage} brightness={0.6}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`${styles.heroInner} ${isLoaded ? styles.loaded : ""}`}>
          <h1 id="hero-heading" className={styles.heroTitle}>
            <span className={`${styles.tedxRed} ${styles.animateTedx}`}>TEDx</span>
            <span className={styles.animatePCCOER}>PCCOER</span>
          </h1>
          <p className={styles.heroSubtitle}>Ideas Worth Spreading</p>
          <div className={styles.ctaRow} role="group" aria-label="Primary actions">
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToId("about")}
            >
              About Event
            </button>
            <a
              className={styles.btnPrimary}
              href="https://www.grooviti.com"
              aria-label="Buy Ticket"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Ticket
            </a>
            <button
              className={styles.btnGhost}
              onClick={() => scrollToId("trailer")}
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </section>
    </Background>
  );
}