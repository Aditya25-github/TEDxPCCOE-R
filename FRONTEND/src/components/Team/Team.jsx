import React, { useEffect, useRef, useState } from "react";
import TeamCard from "./TeamCard";
import styles from "./Team.module.css";

export default function Team({ team }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            team.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 80);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [team]);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.team}
      aria-labelledby="team-heading"
    >
      <div className={styles.sectionHead}>
        <h2 id="team-heading" className={styles.sectionTitle}>
          Team
        </h2>
        <p className={styles.sectionDesc}>Meet the organizing committee.</p>
      </div>

      <div className={styles.sliderContainer}>
        <ul className={styles.teamSlider} ref={sliderRef}>
          {team.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              isVisible={visibleCards.includes(index)}
              animationDelay={index * 0.08}
            />
          ))}
        </ul>
      </div>

      <p className={styles.scrollHint}>← Scroll to see all team members →</p>
    </section>
  );
}
