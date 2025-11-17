import React, { useRef } from "react";
import styles from "./TEDxTalksSection.module.css";

const talks = [
  {
    embed: "https://www.youtube.com/embed/H54JVOpCMQY?si=BqqgvAND5jThmpfT",
    title:
      "Off Track and On Purpose: Turning Influence Into Impact | Krishanaraaj Mahadik | TEDxPCCOER",
    desc: "Off Track and On Purpose: Turning Influence Into Impact. Krishnaraj Mahadik is a multifaceted individual who is an athlete, YouTuber, social worker, entrepreneur, F3 champion, and owner of the Krishnaraj Mahadik store.He is primarily known for his family vlog content on YouTube and also recognized for his philanthropic efforts. This talk was given at a TEDx event using the TED conference format but independently organized by a local community.",
  },
  {
    embed: "https://www.youtube.com/embed/_n0dtEuquW8?si=7zjddCo2RhiX34Pi",
    title:
      "Dancing Beyond Boundaries: The Art of Reinventing Yourself | Ashish Patil | TEDxPCCOER",
    desc: "This journey isn’t about erasing the past, moving with purpose, and daring to rewrite your own story. Ashish Patil is a renowned dancer and choreographer, particularly celebrated for his expertise in Lavni. Popularly known as the LavniKing, he has also appeared on reality shows like India's Best Dancer and Super Dancer, and served as a judge on Maharashtra's Best Dancer. ",
  },
  {
    embed: "https://www.youtube.com/embed/iFkqO9YamFA?si=OM0Xkml5d6jDsF_q",
    title:
      "College to Capital: Unlocking the Startup Mindset Early | Makarand Athavale | TEDxPCCOER",
    desc: " Drawing from personal experience, they reveal how adopting a startup mindset during college can spark innovation, build resilience, or just curious about building something of your own, this talk offers practical insights and a powerful reminder: you don’t need a business card to start thinking like a founder. Makaranad Athavale is a chartered accountant and serves as the chief finance officer for Team Ginie Startup. Additionally, he is a venture partner at Aha Ventures and holds a board position at the Institute of Directors, India",
  },
  {
    embed: "https://www.youtube.com/embed/ZdiQK_-BbmQ?si=c94MCK08IuWtvIa9",
    title:
      "Mic Check: Finding My Voice in a World That Said No | Mrunal Shankar | TEDxPCCOER",
    desc: " Drawing from personal experience, they reveal how adopting a startup mindset during college can spark innovation, build resilience, or just curious about building something of your own, this talk offers practical insights and a powerful reminder: you don’t need a business card to start thinking like a founder. Makaranad Athavale is a chartered accountant and serves as the chief finance officer for Team Ginie Startup. Additionally, he is a venture partner at Aha Ventures and holds a board position at the Institute of Directors, India",
  },
];

export default function TEDxTalksSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.talksSection}>
      <h2 className={styles.headline}>
        TOP <span className={styles.red}>TEDxPccoer</span> TALKS
      </h2>
      <div className={styles.carouselWrapper}>
        <div className={styles.videosGrid} ref={scrollRef}>
          {talks.map((talk, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.iframeWrap}>
                <iframe
                  src={talk.embed}
                  title={talk.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className={styles.title}>{talk.title}</h3>
              <p className={styles.desc}>{talk.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.viewMoreContainer}>
        <button
          className={styles.viewMoreBtn}
          onClick={() => window.open("YOUR_VIEW_MORE_LINK")}
        >
          View More
        </button>
      </div>
    </section>
  );
}
