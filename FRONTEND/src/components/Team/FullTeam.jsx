import React, { useEffect, useState } from "react";
import TeamCard from "./TeamCard";
import styles from "./Team.module.css";

export default function FullTeam({ team }) {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const data = team || [];
    let timeouts = [];
    window.scrollTo(0, 0);
    data.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 80)
      );
    });
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [team]);

  const safeTeam = team || [];
  const tier1 = safeTeam.filter((m) => m.tier === 1);
  const tier2 = safeTeam.filter((m) => m.tier === 2);
  const tier3 = safeTeam.filter((m) => m.tier === 3);

  return (
    <section className={styles.team}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Full Team</h2>
        <p className={styles.sectionDesc}>
          Organizing committee members across all tiers.
        </p>
      </div>

      <h3 className={styles.tierTitle}>Organizing Commitee</h3>
      <div className={styles.gridContainer}>
        {tier1.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            isVisible={visibleCards.includes(index)}
            animationDelay={index * 0.08}
          />
        ))}
      </div>

      <h3 className={styles.tierTitle}>Leads</h3>
      <div className={styles.gridContainer}>
        {tier2.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            isVisible={visibleCards.includes(index + tier1.length)}
            animationDelay={(index + tier1.length) * 0.08}
          />
        ))}
      </div>

      <h3 className={styles.tierTitle}>Faculty Co-Ordinators</h3>
      <div className={styles.gridContainer}>
        {tier3.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            isVisible={visibleCards.includes(
              index + tier1.length + tier2.length
            )}
            animationDelay={(index + tier1.length + tier2.length) * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
