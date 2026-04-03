import React, { useMemo } from "react";
import styles from "./Countdown.module.css";

export default function Countdown({ eventDate = "2026-01-22" }) {
  const formattedDate = useMemo(() => {
    const target = new Date(eventDate);
    if (isNaN(target.getTime())) return "22 January 2026";

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(target);
  }, [eventDate]);

  return (
    <section className={styles.wrap} aria-label="Event update">
      <div className={styles.container}>
        <h2 className={styles.title}>TEDx PCCOER 2026</h2>
        <p className={styles.eventDate}>{formattedDate}</p>
        <p className={styles.body}>
          The event has concluded. Thank you for being part of the experience.
        </p>
      </div>
    </section>
  );
}