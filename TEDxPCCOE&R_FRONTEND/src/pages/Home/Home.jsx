// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";

// Replace with your router/href targets
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroInner}>
          <h1 id="hero-heading" className={styles.heroTitle}>
            TEDxPCCOE&amp;R 2025
          </h1>
          <p className={styles.heroSubtitle}>Ideas Worth Spreading</p>
          <div
            className={styles.ctaRow}
            role="group"
            aria-label="Primary actions"
          >
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToId("about")}
            >
              About Event
            </button>
            <a
              className={styles.btnPrimary}
              href="/tickets"
              aria-label="Get Tickets"
            >
              Get Tickets
            </a>
            <button
              className={styles.btnGhost}
              onClick={() => scrollToId("trailer")}
            >
              Watch Trailer
            </button>
          </div>
        </div>
        {/* Optional background video or image */}
        <div className={styles.heroMedia} aria-hidden="true">
          {/* <video autoPlay muted loop playsInline src="/media/hero.mp4" /> */}
        </div>
      </section>

      {/* About */}
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
              called TEDx. TEDx is a program of local, self‑organized events
              that bring people together to share a TED‑like experience; at our
              TEDx event, TED Talks videos and live speakers combine to spark
              deep discussion and connection in a small group. The TED
              Conference provides general guidance for the TEDx program, but
              individual TEDx events, including ours, are self‑organized.
            </p>
            <p className={styles.muted}>
              This independent TEDx event is operated under license from TED.
            </p>
          </div>
          <div className={styles.aboutMedia}>
            {/* Use a high‑contrast, brand‑safe photo or looping clip */}
            <img
              src="/media/about.jpg"
              alt="Audience at TEDxPCCOE&R"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Trailer anchor (optional) */}
      <div id="trailer" className={styles.trailer}>
        {/* For now a placeholder; swap with embedded video */}
        {/* <iframe ... /> */}
      </div>

      {/* Speakers */}
      <section className={styles.speakers} aria-labelledby="speakers-heading">
        <div className={styles.sectionHead}>
          <h2 id="speakers-heading" className={styles.sectionTitle}>
            Speakers
          </h2>
          <p className={styles.sectionDesc}>
            Meet the voices shaping TEDxPCCOE&amp;R 2025.
          </p>
        </div>
        <ul className={styles.cardGrid}>
          {SPEAKERS.map((s) => (
            <li
              key={s.id}
              className={styles.card}
              tabIndex={0}
              aria-label={`${s.name}, ${s.title}`}
            >
              <figure className={styles.cardFigure}>
                <img src={s.photo} alt={`${s.name} headshot`} loading="lazy" />
                <figcaption className={styles.cardOverlay}>
                  <p className={styles.cardBio}>{s.bio}</p>
                  {s.video && (
                    <a className={styles.cardLink} href={s.video}>
                      Watch talk
                    </a>
                  )}
                </figcaption>
              </figure>
              <div className={styles.cardBody}>
                <h3 className={styles.cardName}>{s.name}</h3>
                <p className={styles.cardTitle}>{s.title}</p>
                <p className={styles.cardTopic}>{s.topic}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Schedule */}
      <section className={styles.schedule} aria-labelledby="schedule-heading">
        <div className={styles.sectionHead}>
          <h2 id="schedule-heading" className={styles.sectionTitle}>
            Schedule
          </h2>
          <p className={styles.sectionDesc}>
            Date, time, venue, and program timeline.
          </p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.whenWhere}>
            <p>
              <strong>Date:</strong> 15 March 2025
            </p>
            <p>
              <strong>Time:</strong> 09:30 – 18:00
            </p>
            <p>
              <strong>Venue:</strong> PCCOE&amp;R Auditorium
            </p>
          </div>
          <ul className={styles.slots} aria-label="Program timeline">
            {SLOTS.map((slot, i) => (
              <li key={i} className={styles.slot}>
                <time className={styles.slotTime}>{slot.time}</time>
                <div className={styles.slotInfo}>
                  <p className={styles.slotTitle}>{slot.title}</p>
                  {slot.speaker && (
                    <p className={styles.slotSpeaker}>{slot.speaker}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sponsors */}
      <section className={styles.sponsors} aria-labelledby="sponsors-heading">
        <div className={styles.sectionHead}>
          <h2 id="sponsors-heading" className={styles.sectionTitle}>
            Sponsors
          </h2>
          <p className={styles.sectionDesc}>
            Thanks to our partners for supporting TEDxPCCOE&amp;R.
          </p>
        </div>
        <div className={styles.sponsorGrid}>
          {SPONSORS.map((sp) => (
            <a
              key={sp.id}
              className={styles.sponsorItem}
              href={sp.url}
              aria-label={`${sp.name} website`}
            >
              <img src={sp.logo} alt={`${sp.name} logo`} loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={styles.team} aria-labelledby="team-heading">
        <div className={styles.sectionHead}>
          <h2 id="team-heading" className={styles.sectionTitle}>
            Team
          </h2>
          <p className={styles.sectionDesc}>Meet the organizing committee.</p>
        </div>
        <ul className={styles.teamGrid}>
          {TEAM.map((m) => (
            <li key={m.id} className={styles.teamCard}>
              <img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" />
              <div>
                <p className={styles.teamName}>{m.name}</p>
                <p className={styles.teamRole}>{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section className={styles.gallery} aria-labelledby="gallery-heading">
        <div className={styles.sectionHead}>
          <h2 id="gallery-heading" className={styles.sectionTitle}>
            Gallery
          </h2>
          <p className={styles.sectionDesc}>
            Highlights from past TEDx events.
          </p>
        </div>
        <div className={styles.galleryRow} role="list">
          {GALLERY.map((g) => (
            <button
              key={g.id}
              className={styles.galleryItem}
              onClick={() => openLightbox(g.src)}
              aria-label="Open photo"
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact} aria-labelledby="contact-heading">
        <div className={styles.sectionHead}>
          <h2 id="contact-heading" className={styles.sectionTitle}>
            Contact
          </h2>
          <p className={styles.sectionDesc}>Reach out or find us on the map.</p>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.mapWrap} aria-label="Venue map">
            {/* Google Maps embed example; replace with your place ID */}
            <iframe
              title="PCCOE&R Auditorium Map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!..."
            />
          </div>
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Contact form"
          >
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="How can we help?"
                required
              />
            </div>
            <button className={styles.btnPrimary} type="submit">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerTop}>
          <a className={styles.brand} href="/">
            {/* Place the official TEDx lockup image (PNG/SVG) here per guidelines */}
            <img src="/brand/tedx_lockup.svg" alt="TEDxPCCOE&R" />
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
    </main>
  );
}

// Sample data; replace with CMS/API content
const SPEAKERS = [
  {
    id: 1,
    name: "Speaker One",
    title: "Founder, X Labs",
    topic: "Reimagining Energy",
    bio: "Short bio goes here.",
    photo: "/media/speakers/s1.jpg",
    video: "",
  },
  {
    id: 2,
    name: "Speaker Two",
    title: "Scientist, Y Institute",
    topic: "AI for Climate",
    bio: "Short bio goes here.",
    photo: "/media/speakers/s2.jpg",
    video: "",
  },
  {
    id: 3,
    name: "Speaker Three",
    title: "Author",
    topic: "Human Potential",
    bio: "Short bio goes here.",
    photo: "/media/speakers/s3.jpg",
    video: "",
  },
];

const SLOTS = [
  { time: "09:30", title: "Registration & Welcome" },
  { time: "10:00", title: "Session 1", speaker: "Speaker One" },
  { time: "11:30", title: "Break" },
  { time: "12:00", title: "Session 2", speaker: "Speaker Two" },
  { time: "13:00", title: "Lunch" },
  { time: "14:30", title: "Session 3", speaker: "Speaker Three" },
  { time: "16:00", title: "Closing" },
];

const SPONSORS = [
  { id: 1, name: "Platinum Co.", logo: "/media/sponsors/p1.png", url: "#" },
  { id: 2, name: "Gold Co.", logo: "/media/sponsors/g1.png", url: "#" },
  { id: 3, name: "Silver Co.", logo: "/media/sponsors/s1.png", url: "#" },
];

const TEAM = [
  {
    id: 1,
    name: "Aditya Divate",
    role: "Lead Organizer",
    photo: "/media/team/t1.jpg",
  },
  { id: 2, name: "Member Two", role: "Curation", photo: "/media/team/t2.jpg" },
  {
    id: 3,
    name: "Member Three",
    role: "Production",
    photo: "/media/team/t3.jpg",
  },
  {
    id: 4,
    name: "Member Four",
    role: "Partnerships",
    photo: "/media/team/t4.jpg",
  },
];

const GALLERY = [
  { id: 1, src: "/media/gallery/g1.jpg", alt: "TEDx stage photo" },
  { id: 2, src: "/media/gallery/g2.jpg", alt: "Audience cheering" },
  { id: 3, src: "/media/gallery/g3.jpg", alt: "Speaker on stage" },
];

function openLightbox(src) {
  // Replace with real lightbox; for now open image
  window.open(src, "_blank", "noopener,noreferrer");
}
