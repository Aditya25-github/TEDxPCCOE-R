import React from "react";
import Background from "../Background/Background";
import styles from "./Hero.module.css";
import heroVideo from "../../assets/hero.mp4";

export default function Hero({ scrollToId }) {
  return (
    <Background type="video" src={heroVideo} brightness={0.7}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroInner}>
          <h1 id="hero-heading" className={styles.heroTitle}>
            <span className={styles.tedxRed}>TEDx</span>PCCOER
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
      </section>
    </Background>
  );
}
