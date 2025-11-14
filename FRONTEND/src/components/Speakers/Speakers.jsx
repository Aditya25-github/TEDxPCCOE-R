import React, { useEffect, useRef, useState } from "react";
import SpeakerCard from "./SpeakerCard";
import styles from "./Speakers.module.css";

export default function Speakers({ speakers }) {
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
            speakers.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
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
  }, [speakers]);

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
      className={styles.speakers}
      aria-labelledby="speakers-heading"
    >
      <div className={styles.sectionHead}>
        <h2 id="speakers-heading" className={styles.sectionTitle}>
          Speakers
        </h2>
        <p className={styles.sectionDesc}>
          Meet the voices shaping TEDxPCCOER 2025.
        </p>
      </div>

      <div className={styles.sliderContainer}>
        <ul className={styles.cardSlider} ref={sliderRef}>
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              isVisible={visibleCards.includes(index)}
              animationDelay={index * 0.1}
            />
          ))}
        </ul>
      </div>

      <p className={styles.scrollHint}>
        ← Scroll horizontally to see more speakers →
      </p>
    </section>
  );
}
