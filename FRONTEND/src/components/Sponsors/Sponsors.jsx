import React from "react";
import styles from "./Sponsors.module.css";

export default function Sponsors({ sponsors = [] }) {
  // Separate into Platinum, Gold, Others
  const platinum = sponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes("platinum")
  );
  
  const gold = sponsors.filter(sponsor => 
    sponsor.name.toLowerCase().includes("gold")
  );
  
  const others = sponsors.filter(sponsor => 
    !sponsor.name.toLowerCase().includes("platinum") && 
    !sponsor.name.toLowerCase().includes("gold")
  );

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

        {/* Platinum Sponsors - TOP CENTERED */}
        {platinum.length > 0 && (
          <div className={styles.tierGroup}>
            <h3 className={styles.tierTitle}>Platinum Sponsor</h3>
            <div className={styles.platinumGrid} role="list">
              {platinum.map((sponsor, index) => (
                <a
                  key={sponsor.id}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.logoItem} ${styles.premiumLogo}`}
                  aria-label={`Visit ${sponsor.name} website`}
                  role="listitem"
                  style={{ animationDelay: `${index * 100}ms` }}
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
        )}

        {/* Gold Sponsors - MIDDLE CENTERED */}
        {gold.length > 0 && (
          <div className={styles.tierGroup}>
            <h3 className={styles.tierTitle}>Gold Sponsor</h3>
            <div className={styles.goldGrid} role="list">
              {gold.map((sponsor, index) => (
                <a
                  key={sponsor.id}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.logoItem}
                  aria-label={`Visit ${sponsor.name} website`}
                  role="listitem"
                  style={{ animationDelay: `${index * 75}ms` }}
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
        )}

        {/* All Other Sponsors - BOTTOM with Names */}
        {others.length > 0 && (
          <div className={styles.tierGroup}>
            <h3 className={styles.tierTitle}>Partners & Associates</h3>
            <div className={styles.logoGridWithNames} role="list">
              {others.map((sponsor, index) => (
                <div key={sponsor.id} className={styles.sponsorWithName}>
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.logoItem}
                    aria-label={`Visit ${sponsor.name} website`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      loading="lazy"
                      className={styles.logoImage}
                    />
                  </a>
                  <span className={styles.sponsorName}>{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}