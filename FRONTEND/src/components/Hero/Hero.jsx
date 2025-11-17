import React, { useState, useEffect } from "react";
import Background from "../Background/Background";
import styles from "./Hero.module.css";
import heroImage from "../../assets/hero1.jpg";
import { useNavigate } from "react-router-dom";
import Portal from "../Portal/Portal.jsx"; // <-- import portal

export default function Hero({ scrollToId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetTicketClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <Background type="image" src={heroImage} brightness={0.6}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`${styles.heroInner} ${isLoaded ? styles.loaded : ""}`}>
          <h1 id="hero-heading" className={styles.heroTitle}>
            <span className={`${styles.tedxRed} ${styles.animateTedx}`}>
              TEDx
            </span>
            <span className={styles.animatePCCOER}>PCCOER</span>
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

            <button
              className={styles.btnPrimary}
              onClick={handleGetTicketClick}
            >
              Get Ticket
            </button>

            <button
              className={styles.btnPrimary}
              type="button"
              onClick={() => navigate("/apply")}
            >
              Apply Now
            </button>

            <button
              className={styles.btnGhost}
              onClick={() =>
                window.open(
                  "https://youtu.be/nJLEUxRLWjE?si=gALkyu1KsXQ96X35",
                  "_blank"
                )
              }
            >
              Glimpses
            </button>
          </div>
        </div>
      </section>

      {/* Portalized popup so it's outside the .hero DOM and won't be clipped */}
      {showPopup && (
        <Portal>
          <div className={styles.ticketPopup}>
            🎟️ Tickets will be live soon!
          </div>
        </Portal>
      )}
    </Background>
  );
}
