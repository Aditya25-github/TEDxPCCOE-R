// src/components/Countdown/Countdown.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Countdown.module.css";

// Format with leading zeros
const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

function diffParts(target) {
  const now = new Date();
  let ms = target - now;
  if (isNaN(target.getTime())) ms = 0;
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { ms: clamped, days, hours, minutes, seconds };
}

export default function Countdown({
  eventDate = "2026-01-22T09:30:00",
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
      <div className={styles.container}>
        {/* Hero section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.red}>HELLO</span> EXPLORER
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Countdown cards */}
        <div
          className={styles.cards}
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          <Card value={pad(parts.days)} label="Days" isActive={!isOver} />
          <Card value={pad(parts.hours)} label="Hours" isActive={!isOver} />
          <Card value={pad(parts.minutes)} label="Minutes" isActive={!isOver} />
          <Card value={pad(parts.seconds)} label="Seconds" isActive={!isOver} />
        </div>

        {/* Body text */}
        <div className={styles.bodyWrapper}>
          <p className={styles.body}>
            To unlock the untapped opportunities and experience an unrestricted
            rush, TEDxPCCOE&R invites you to step into the spotlight and explore
            what lies beyond the obvious.
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ value, label, isActive }) {
  return (
    <div
      className={`${styles.card} ${!isActive ? styles.cardInactive : ""}`}
      aria-label={`${value} ${label}`}
    >
      <div className={styles.cardInner}>
        <div className={styles.value} aria-hidden="true">
          {value}
        </div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
