import React from "react";
import styles from "./Team.module.css";

export default function TeamCard({ member }) {
  return (
    <li className={styles.teamCard}>
      <img src={member.photo} alt={`${member.name}, ${member.role}`} loading="lazy" />
      <div>
        <p className={styles.teamName}>{member.name}</p>
        <p className={styles.teamRole}>{member.role}</p>
      </div>
    </li>
  );
}
