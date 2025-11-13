import React from "react";
import styles from "./HowWeDoIt.module.css";
import { FaRegNewspaper } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiImage } from "react-icons/fi";

export default function HowWeDoIt() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          This is <span className={styles.highlight}>How We do It</span>
        </h1>
        <p className={styles.subtitle}>
          We are looking for speakers or performers who have radically new
          ideas, exposing cutting-edge research, technology, design, and more
        </p>
      </div>
      <div className={styles.featuresGrid}>
        <div className={styles.featureBox}>
          <FaRegNewspaper className={styles.icon} aria-label="Events icon" />
          <h2 className={styles.featureTitle}>Events</h2>
          <p className={styles.featureDesc}>
            Our mission is to inspire and inform by unleashing hidden,
            groundbreaking and unique ideas worth spreading from all over the
            world. We host conferences with live TEDxTalks and cover a diversity
            of topics, ranging from technology, entertainment & design to
            science, art & global issues.
          </p>
        </div>
        <div className={styles.featureBox}>
          <FiUsers className={styles.icon} aria-label="Community icon" />
          <h2 className={styles.featureTitle}>Community</h2>
          <p className={styles.featureDesc}>
            TEDxPCCOER is a globally-minded local community, welcoming people
            from every discipline and culture who seek a deeper understanding of
            the world. This growing group of curious individuals engage with
            ideas and each other, both online and at live events, all year long.
          </p>
        </div>
        <div className={styles.featureBox}>
          <FiImage className={styles.icon} aria-label="Online icon" />
          <h2 className={styles.featureTitle}>Online</h2>
          <p className={styles.featureDesc}>
            Long enough to explore a challenging perspective but short enough to
            read in a single sitting, our online channels pick up where Talks
            leave off. Discover new ideas every day in our Online Magazine, our
            Social Media and our Noteworthy Newsletter.
          </p>
        </div>
      </div>
    </section>
  );
}
