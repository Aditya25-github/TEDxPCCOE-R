import React from "react";
import styles from "./Speakers.module.css";

export default function SpeakerCard({ speaker, isVisible, animationDelay }) {
  return (
    <li
      className={`${styles.card} ${
        isVisible ? styles.cardVisible : styles.cardHidden
      }`}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
      tabIndex={0}
      aria-label={`${speaker.name}, ${speaker.title}`}
    >
      <figure className={styles.cardFigure}>
        <img
          src={speaker.photo}
          alt={`${speaker.name} headshot`}
          loading="lazy"
        />
        <figcaption className={styles.cardOverlay}>
          <p className={styles.cardBio}>{speaker.bio}</p>
          {speaker.video && (
            <a className={styles.cardLink} href={speaker.video}>
              Watch talk
            </a>
          )}
        </figcaption>
      </figure>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{speaker.name}</h3>
        <p className={styles.cardTitle}>{speaker.title}</p>
        <p className={styles.cardTopic}>{speaker.topic}</p>
      </div>
    </li>
  );
}
