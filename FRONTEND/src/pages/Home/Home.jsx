import React from "react";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
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
import ThemeCards from "../../components/ThemeCards/ThemeCards";
import HowWeDoIt from "../../components/HowWeDoIt/HowWeDoIt";
import TEDxTalksSection from "../../components/TEDxTalksSection/TEDxTalksSection";

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

      {/* 🔹 Countdown Section */}
      <section id="countdown">
        <Countdown />
      </section>

      {/* 🔹 Theme Section */}
      <section id="theme">
        <ThemeCards />
      </section>

      {/* 🔹 About Section */}
      <section id="about">
        <About />
      </section>

      {/* 🔹 This is how we do it section */}
      <section id="how-we-do-it">
        {" "}
        {/* Corrected to have unique id */}
        <HowWeDoIt />
      </section>

      {/* 🔹 Speakers Section */}
      <section id="speakers">
        <Speakers speakers={SPEAKERS} />
      </section>

      <section id="Team">
        <Team team={TEAM} />
      </section>

      <section id="TedxTalks">
        <TEDxTalksSection team={TEDxTalksSection} />
      </section>

      <section id="gallery">
        <Gallery gallery={GALLERY} />
      </section>

      <section id="sponsors">
        <Sponsors sponsors={SPONSORS} />
      </section>

      {/* 🔹 Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
