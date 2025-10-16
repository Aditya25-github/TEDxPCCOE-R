import React from "react";
import SpeakerCard from "./SpeakerCard";
import styles from "./Speakers.module.css";

export default function Speakers({ speakers }) {
  return (
    <section className={styles.speakers} aria-labelledby="speakers-heading">
      <div className={styles.sectionHead}>
        <h2 id="speakers-heading" className={styles.sectionTitle}>
          Speakers
        </h2>
        <p className={styles.sectionDesc}>
          Meet the voices shaping TEDxPCCOE&amp;R 2025.
        </p>
      </div>
      <ul className={styles.cardGrid}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </ul>
    </section>
  );
}
