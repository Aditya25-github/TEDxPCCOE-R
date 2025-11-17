import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCard from "./TeamCard";
import styles from "./Team.module.css";

export default function Team({ team }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const navigate = useNavigate();

  // Filter Tier 1 members
  const tier1Members = team.filter((member) => member.tier === 1);

  // Animate the reveal of Tier 1 members
  useEffect(() => {
    let timeouts = [];
    tier1Members.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 80)
      );
    });
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [tier1Members]);

  return (
    <section className={styles.team} aria-labelledby="team-heading">
      <div className={styles.sectionHead}>
        <h2 id="team-heading" className={styles.sectionTitle}>
          Team
        </h2>
        <p className={styles.sectionDesc}>Meet the organizing committee.</p>
      </div>

      <div className={styles.gridContainer}>
        {tier1Members.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            isVisible={visibleCards.includes(index)}
            animationDelay={index * 0.08}
          />
        ))}
      </div>

      {/* View More Button */}
      <div className={styles.viewMoreContainer}>
        <button
          className={styles.viewMoreBtn}
          onClick={() => navigate("/team-full")}
          aria-label="View full team"
        >
          View More
        </button>
      </div>
    </section>
  );
}
