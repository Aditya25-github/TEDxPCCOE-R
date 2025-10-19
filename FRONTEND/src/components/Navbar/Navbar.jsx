import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoWhite from "../../assets/logo-white.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // close mobile menu after click
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          onClick={() => scrollToSection("home")}
          className={styles.brand}
          aria-label="TEDxPCCOE&R Home"
        >
          <img src={logoWhite} alt="TEDxPCCOE&R" className={styles.logo} />
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.link} onClick={() => scrollToSection("home")}>
            Home
          </a>
          <a className={styles.link} onClick={() => scrollToSection("theme")}>
            Theme
          </a>
          <a className={styles.link} onClick={() => scrollToSection("about")}>
            About
          </a>
          <a
            className={styles.link}
            onClick={() => scrollToSection("speakers")}
          >
            Speaker
          </a>
          <a className={styles.link} onClick={() => scrollToSection("contact")}>
            Contact Us
          </a>
          <a
            className={styles.buy}
            href="https://www.grooviti.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Ticket
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className={styles.burgerBox}>
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className={styles.drawerOverlay} onClick={() => setOpen(false)} />
        <aside className={styles.drawerPanel}>
          <nav className={styles.drawerNav}>
            <button
              className={styles.drawerLink}
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => scrollToSection("theme")}
            >
              Theme
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => scrollToSection("speakers")}
            >
              Speaker
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </button>
            <a
              className={styles.drawerBuy}
              href="https://www.grooviti.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Ticket
            </a>
          </nav>
        </aside>
      </div>
    </header>
  );
}
