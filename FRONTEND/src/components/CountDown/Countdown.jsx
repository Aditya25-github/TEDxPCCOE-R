// src/components/Countdown/Countdown.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Countdown.module.css";

// format with leading zeros
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

function diffParts(target) {
  const now = new Date();
  let ms = target - now;
  if (isNaN(target.getTime())) ms = 0; // invalid date guard
  const clamped = Math.max(0, ms); // never go negative on UI
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { ms: clamped, days, hours, minutes, seconds };
}

export default function Countdown({
  eventDate = "2026-01-22T09:30:00", // ISO local or with timezone
  title = "HELLO EXPLORER",
  subtitle = "Are you ready to unravel the unexplored?",
  className = "",
}) {
  const target = useMemo(() => new Date(eventDate), [eventDate]);
  const [parts, setParts] = useState(() => diffParts(target));
  const tickRef = useRef(null);

  useEffect(() => {
    setParts(diffParts(target));
    tickRef.current = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(tickRef.current);
  }, [target]);

  const isOver = parts.ms <= 0;

  return (
    <section
      className={`${styles.wrap} ${className}`}
      aria-label="Event countdown"
    >
      {/* Big heading area like the screenshot */}
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.red}>HELLO</span> EXPLORER
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {/* Countdown cards */}
      {!isOver ? (
        <div className={styles.cards} role="timer" aria-live="polite">
          <Card value={pad(parts.days)} label="Days" />
          <Card value={pad(parts.hours)} label="Hours" />
          <Card value={pad(parts.minutes)} label="Minutes" />
          <Card value={pad(parts.seconds)} label="Seconds" />
        </div>
      ) : (
        <div className={styles.cards} role="status" aria-live="polite">
          <Card value="00" label="Days" />
          <Card value="00" label="Hours" />
          <Card value="00" label="Minutes" />
          <Card value="00" label="Seconds" />
        </div>
      )}

      {/* Body copy area (optional) */}
      <p className={styles.body}>
        To unlock the untapped opportunities and experience an unrestricted
        rush, TEDxPCCOE&amp;R invites you to step into the spotlight and explore
        what lies beyond the obvious.
      </p>
    </section>
  );
}

function Card({ value, label }) {
  return (
    <div className={styles.card} aria-label={`${label}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
