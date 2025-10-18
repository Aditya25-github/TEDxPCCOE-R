import React from "react";
import styles from "./Sponsors.module.css";

export default function Sponsors({ sponsors }) {
  return (
    <section className={styles.sponsors} aria-labelledby="sponsors-heading">
      <div className={styles.sectionHead}>
        <h2 id="sponsors-heading" className={styles.sectionTitle}>
          Sponsors
        </h2>
        <p className={styles.sectionDesc}>
          Thanks to our partners for supporting TEDxPCCOE&amp;R.
        </p>
      </div>
      <div className={styles.sponsorGrid}>
        {sponsors.map((sp) => (
          <a
            key={sp.id}
            className={styles.sponsorItem}
            href={sp.url}
            aria-label={`${sp.name} website`}
          >
            <img src={sp.logo} alt={`${sp.name} logo`} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
