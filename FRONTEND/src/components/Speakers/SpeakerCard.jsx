// SpeakerCard.js
import React from "react";
import styles from "./SpeakerCard.module.css";

export default function SpeakerCard({ speaker, isVisible, animationDelay }) {
  return (
    <li
      className={`${styles.card} ${
        isVisible ? styles.cardVisible : styles.cardHidden
      }`}
      tabIndex={0}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <figure className={styles.cardFigure}>
        <img src={speaker.photo} alt={speaker.name} />
        <div className={styles.cardOverlay}>
          <p className={styles.cardBio}>{speaker.bio}</p>
        </div>
      </figure>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{speaker.name}</h3>
        <p className={styles.cardTitle}>{speaker.title}</p>
        <p className={styles.cardTopic}>{speaker.topic}</p>
      </div>
    </li>
  );
}
