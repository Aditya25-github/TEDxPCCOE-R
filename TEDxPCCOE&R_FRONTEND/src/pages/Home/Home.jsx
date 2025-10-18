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
      <Hero scrollToId={scrollToId} />
      <About />
      <Countdown />
      <Trailer />
      <Speakers speakers={SPEAKERS} />
      <Schedule slots={SLOTS} />
      <Sponsors sponsors={SPONSORS} />
      <Team team={TEAM} />
      <Gallery gallery={GALLERY} />
      <Contact />
      <Footer />
    </main>
  );
}
