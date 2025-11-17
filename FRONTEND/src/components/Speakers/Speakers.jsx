import React, { useEffect, useState } from "react";
import SpeakerCard from "./SpeakerCard";
import styles from "./Speakers.module.css";

export default function Speakers({ speakers }) {
  const [visibleCards, setVisibleCards] = useState([]);

  // Reveal cards animation (can be removed if not needed)
  useEffect(() => {
    let timeouts = [];
    speakers.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 100)
      );
    });
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [speakers]);

  return (
    <section className={styles.speakers} aria-labelledby="speakers-heading">
      <div className={styles.sectionHead}>
        <h2 id="speakers-heading" className={styles.sectionTitle}>
          Speakers
        </h2>
        <p className={styles.sectionDesc}>
          Meet the voices shaping TEDxPCCOER 2025.
        </p>
      </div>
      <div className={styles.gridContainer}>
        {speakers.map((speaker, index) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            isVisible={visibleCards.includes(index)}
            animationDelay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
