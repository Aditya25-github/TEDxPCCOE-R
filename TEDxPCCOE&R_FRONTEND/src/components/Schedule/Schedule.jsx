import React from "react";
import TimeSlot from "./TimeSlot";
import styles from "./Schedule.module.css";

export default function Schedule({ slots }) {
  return (
    <section className={styles.schedule} aria-labelledby="schedule-heading">
      <div className={styles.sectionHead}>
        <h2 id="schedule-heading" className={styles.sectionTitle}>
          Schedule
        </h2>
        <p className={styles.sectionDesc}>
          Date, time, venue, and program timeline.
        </p>
      </div>
      <div className={styles.timeline}>
        <div className={styles.whenWhere}>
          <p>
            <strong>Date:</strong> 15 March 2025
          </p>
          <p>
            <strong>Time:</strong> 09:30 – 18:00
          </p>
          <p>
            <strong>Venue:</strong> PCCOE&amp;R Auditorium
          </p>
        </div>
        <ul className={styles.slots} aria-label="Program timeline">
          {slots.map((slot, i) => (
            <TimeSlot key={i} slot={slot} />
          ))}
        </ul>
      </div>
    </section>
  );
}
