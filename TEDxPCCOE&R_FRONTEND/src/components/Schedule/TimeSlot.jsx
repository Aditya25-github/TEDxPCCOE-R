import React from "react";
import styles from "./Schedule.module.css";

export default function TimeSlot({ slot }) {
  return (
    <li className={styles.slot}>
      <time className={styles.slotTime}>{slot.time}</time>
      <div className={styles.slotInfo}>
        <p className={styles.slotTitle}>{slot.title}</p>
        {slot.speaker && (
          <p className={styles.slotSpeaker}>{slot.speaker}</p>
        )}
      </div>
    </li>
  );
}
