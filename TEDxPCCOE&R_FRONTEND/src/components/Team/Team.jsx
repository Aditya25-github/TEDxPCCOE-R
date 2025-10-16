import React from "react";
import TeamCard from "./TeamCard";
import styles from "./Team.module.css";

export default function Team({ team }) {
  return (
    <section className={styles.team} aria-labelledby="team-heading">
      <div className={styles.sectionHead}>
        <h2 id="team-heading" className={styles.sectionTitle}>
          Team
        </h2>
        <p className={styles.sectionDesc}>Meet the organizing committee.</p>
      </div>
      <ul className={styles.teamGrid}>
        {team.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </ul>
    </section>
  );
}
