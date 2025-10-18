import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerTop}>
        <a className={styles.brand} href="/">
          <img src="./logo-white.png" alt="TEDxPCCOE&R" />
        </a>
        <nav aria-label="Footer">
          <ul className={styles.footerLinks}>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/speakers">Speakers</a>
            </li>
            <li>
              <a href="/schedule">Schedule</a>
            </li>
            <li>
              <a href="/sponsors">Sponsors</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
        <div className={styles.socials} aria-label="Social links">
          <a aria-label="Instagram" href="https://instagram.com/">
            IG
          </a>
          <a aria-label="YouTube" href="https://youtube.com/">
            YT
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com/">
            IN
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.license}>
          This independent TEDx event is operated under license from TED.
        </p>
        <p className={styles.kicker}>
          Learn more at <a href="https://www.ted.com/tedx">ted.com/tedx</a>.
        </p>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} TEDxPCCOE&amp;R
        </p>
      </div>
    </footer>
  );
}
