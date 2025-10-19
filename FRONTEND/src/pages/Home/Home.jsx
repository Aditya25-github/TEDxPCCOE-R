import React from "react";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Trailer from "../../components/Trailer/Trailer";
import Speakers from "../../components/Speakers/Speakers";
import Schedule from "../../components/Schedule/Schedule";
import Sponsors from "../../components/Sponsors/Sponsors";
import Team from "../../components/Team/Team";
import Gallery from "../../components/Gallery/Gallery";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import { SPEAKERS, SLOTS, SPONSORS, TEAM, GALLERY } from "../../data/homeData";
import styles from "./Home.module.css";
import Countdown from "../../components/CountDown/Countdown";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  return (
    <main className={styles.page}>
      {/* 🔹 Home Section */}
      <section id="home">
        <Hero scrollToId={scrollToId} />
      </section>

      {/* 🔹 Theme Section */}
      <section id="theme">
        <Countdown />
      </section>

      {/* 🔹 About Section */}
      <section id="about">
        <About />
      </section>

      {/* 🔹 Trailer Section */}
      <section
        id="trailer"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#000",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <Trailer />
      </section>

      {/* 🔹 Speakers Section */}
      <section id="speakers">
        <Speakers speakers={SPEAKERS} />
      </section>

      {/* 🔹 Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* 🔹 Remaining Sections */}
      <Schedule slots={SLOTS} />
      <Sponsors sponsors={SPONSORS} />
      <Team team={TEAM} />
      <Gallery gallery={GALLERY} />
      <Footer />
    </main>
  );
}
