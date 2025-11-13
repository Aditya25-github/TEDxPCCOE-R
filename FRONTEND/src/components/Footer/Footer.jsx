import React from "react";
import styles from "./Footer.module.css";

// Using inline SVGs to avoid image path issues
const SocialIcons = {
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  YouTube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.footerTop}>
          {/* Logo as text to avoid image issues */}
          <div className={styles.brand}>
            <a href="#home" className={styles.logoLink}>
              TEDx<span>PCCOER</span>
            </a>
          </div>

          <nav className={styles.navigation}>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, "#about")}>
                  About
                </a>
              </li>
              <li>
                <a
                  href="#speakers"
                  onClick={(e) => handleLinkClick(e, "#speakers")}
                >
                  Speakers
                </a>
              </li>
              <li>
                <a
                  href="#schedule"
                  onClick={(e) => handleLinkClick(e, "#schedule")}
                >
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  onClick={(e) => handleLinkClick(e, "#sponsors")}
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.socials}>
            <span className={styles.socialsLabel}>Follow us</span>
            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/tedxpccoer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                {SocialIcons.Instagram}
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                {SocialIcons.YouTube}
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {SocialIcons.LinkedIn}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <div className={styles.legalInfo}>
            <p className={styles.license}>
              This independent TEDx event is operated under license from TED.
            </p>
            <p className={styles.kicker}>
              Learn more at{" "}
              <a
                href="https://www.ted.com/tedx"
                target="_blank"
                rel="noopener noreferrer"
              >
                ted.com/tedx
              </a>
              .
            </p>
          </div>

          <div className={styles.copyright}>
            <p className={styles.copy}>
              &copy; {currentYear} TEDxPCCOE&amp;R. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
