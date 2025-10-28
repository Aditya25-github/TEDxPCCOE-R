import React, { useEffect, useRef, useState } from "react";
import styles from "./Schedule.module.css";

export default function TimeSlot({ slot, index, totalSlots }) {
  const slotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    if (slotRef.current) {
      observer.observe(slotRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <li 
      className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
      ref={slotRef}
      style={{
        '--animation-delay': `${index * 150}ms`
      }}
    >
      <div className={isLeft ? styles.leftSlot : styles.rightSlot}>
        {/* Card for left-aligned or right-aligned content */}
        <div 
          className={styles.card}
          tabIndex={0}
          aria-label={`Session: ${slot.title}${slot.speaker ? ` by ${slot.speaker}` : ''} at ${slot.time}`}
        >
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{slot.title}</div>
            
            {slot.speaker && (
              <div className={styles.cardSpeaker}>
                {slot.speaker}
              </div>
            )}
            
            {slot.description && (
              <div className={styles.cardDescription}>
                {slot.description}
              </div>
            )}
          </div>
        </div>

        {/* Center timeline marker */}
        <div className={styles.centerPart}>
          <div className={styles.iconCircle} aria-hidden="true">
            <div className={styles.iconInner}>
              {index + 1}
            </div>
          </div>
          <time 
            className={styles.timeLabel} 
            dateTime={slot.time}
          >
            {slot.time}
          </time>
        </div>

        {/* Empty div to maintain layout balance */}
        {!isLeft && <div className={styles.spacer} aria-hidden="true" />}
      </div>
    </li>
  );
}