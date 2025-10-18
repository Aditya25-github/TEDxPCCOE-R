// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Left: Brand lockup on solid black per guidelines */}
        <a href="/" className={styles.brand} aria-label="TEDxPCCOE&R Home">
          {/* Use the official lockup asset (SVG/PNG) here */}
          <img
            src="./logo-white.png"
            alt="TEDxPCCOE&R"
            className={styles.logo}
          />
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.link} href="/">
            Home
          </a>
          <a className={styles.link} href="/theme">
            Theme
          </a>
          <a className={styles.link} href="/about">
            About
          </a>
          <a className={styles.link} href="/speakers">
            Speaker
          </a>
          <a className={styles.link} href="/contact">
            Contact Us
          </a>
          <a className={styles.buy} href="/tickets" aria-label="Buy Ticket">
            Buy Ticket
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <nav className={styles.drawerNav} onClick={closeMenu}>
          <a className={styles.drawerLink} href="/">
            Home
          </a>
          <a className={styles.drawerLink} href="/theme">
            Theme
          </a>
          <a className={styles.drawerLink} href="/about">
            About
          </a>
          <a className={styles.drawerLink} href="/speakers">
            Speaker
          </a>
          <a className={styles.drawerLink} href="/contact">
            Contact Us
          </a>
          <a className={styles.drawerBuy} href="/tickets">
            Buy Ticket
          </a>
        </nav>
      </div>
    </header>
  );
}
