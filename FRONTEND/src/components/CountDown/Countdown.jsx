import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Countdown.module.css";

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

export default function Countdown({ eventDate = "2026-01-22T10:00:00" }) {
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
    <section className={styles.wrap} aria-label="Event countdown">
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.red}>Hello</span> Everyone
          </h1>
          <p className={styles.subtitle}>
            Are you ready to step into the spotlight?
          </p>
        </div>

        {/* Countdown Cards */}
        <div
          className={styles.cards}
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          <Card value={pad(parts.days)} label="Days" isActive={!isOver} />
          <Card value={pad(parts.hours)} label="Hour" isActive={!isOver} />
          <Card value={pad(parts.minutes)} label="Min" isActive={!isOver} />
          <Card value={pad(parts.seconds)} label="Sec" isActive={!isOver} />
        </div>

        {/* Body Text */}
        <div className={styles.bodyWrapper}>
          <p className={styles.body}>
            A journey of expression, identity, and resonance. Step into the
            arena where every idea, every thought, and every heartbeat takes
            center stage.
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
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
