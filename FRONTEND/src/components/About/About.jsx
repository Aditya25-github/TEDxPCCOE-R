import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-heading"
    >
      <div className={styles.aboutGrid}>
        <div>
          <h2 id="about-heading" className={styles.sectionTitle}>
            What is TEDx?
          </h2>
          <p className={styles.lede}>
            In the spirit of ideas worth spreading, TED has created a program
            called TEDx. TEDx is a program of local, self‑organized events that
            bring people together to share a TED‑like experience; at our TEDx
            event, TED Talks videos and live speakers combine to spark deep
            discussion and connection in a small group. The TED Conference
            provides general guidance for the TEDx program, but individual TEDx
            events, including ours, are self‑organized.
          </p>
          <p className={styles.muted}>
            This independent TEDx event is operated under license from TED.
          </p>
        </div>
        <div className={styles.aboutMedia}>
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/zDE-OXZ5NDQ?si=e0pukrTzaaBDf3Ze"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
