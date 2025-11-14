import React from "react";
import styles from "./Sponsors.module.css";

export default function Sponsors({ sponsors = [] }) {
  return (
    <section className={styles.sponsors} aria-labelledby="sponsors-heading">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="sponsors-heading" className={styles.title}>
            Our <span className={styles.accent}>Sponsors</span>
          </h2>
          <p className={styles.subtitle}>
            Thanks to our partners for supporting TEDxPCCOER
          </p>
        </div>

        {/* Logo Grid - No boxes, just images */}
        <div className={styles.logoGrid} role="list">
          {sponsors.map((sponsor, index) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoItem}
              aria-label={`Visit ${sponsor.name} website`}
              role="listitem"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                loading="lazy"
                className={styles.logoImage}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
