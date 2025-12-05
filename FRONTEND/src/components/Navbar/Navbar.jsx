import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logoWhite from "../../assets/logo-white.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  const scrollToId = (id) => {
    // scroll page to section id if on home route
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNav = (route, id = null) => {
    if (location.pathname !== "/") {
      navigate(route);
      if (id) {
        setTimeout(() => scrollToId(id), 200);
      }
    } else {
      if (id) scrollToId(id);
    }
    setOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.brand}
          aria-label="TEDxPCCOE&R Home"
          onClick={() => setOpen(false)}
        >
          <img src={logoWhite} alt="TEDxPCCOER" className={styles.logo} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Primary">
          <button
            className={styles.link}
            onClick={() => handleNav("/", "home")}
          >
            Home
          </button>
          <button
            className={styles.link}
            onClick={() => handleNav("/", "theme")}
          >
            Theme
          </button>
          <button
            className={styles.link}
            onClick={() => handleNav("/", "about")}
          >
            About
          </button>
          <button
            className={styles.link}
            onClick={() => handleNav("/", "speakers")}
          >
            Speakers
          </button>
          <button
            className={styles.link}
            onClick={() => handleNav("/", "Team")}
          >
            Team
          </button>
          <button
            className={styles.link}
            onClick={() => handleNav("/", "contact")}
          >
            Contact Us
          </button>
          <Link
            className={styles.buy}
            to="/apply"
            onClick={() => setOpen(false)}
          >
            Apply Now
          </Link>
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
              onClick={() => handleNav("/", "home")}
            >
              Home
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => handleNav("/", "theme")}
            >
              Theme
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => handleNav("/", "about")}
            >
              About
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => handleNav("/", "Team")}
            >
              Team
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => handleNav("/", "speakers")}
            >
              Speakers
            </button>
            <button
              className={styles.drawerLink}
              onClick={() => handleNav("/", "contact")}
            >
              Contact Us
            </button>
            <Link
              className={styles.drawerBuy}
              to="/apply"
              onClick={() => setOpen(false)}
            >
              Apply Now
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
