import React from "react";
import styles from "./Team.module.css";

export default function TeamCard({ member, isVisible, animationDelay }) {
  return (
    <li
      className={`${styles.teamCard} ${
        isVisible ? styles.cardVisible : styles.cardHidden
      }`}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <img
        src={member.photo}
        alt={`${member.name}, ${member.role}`}
        loading="lazy"
      />
      <div className={styles.cardBody}>
        <p className={styles.teamName}>{member.name}</p>
        <p className={styles.teamRole}>{member.role}</p>
      </div>
    </li>
  );
}
