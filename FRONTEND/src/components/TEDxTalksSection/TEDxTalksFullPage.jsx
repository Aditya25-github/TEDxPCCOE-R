import React, { useEffect } from "react";
import styles from "./TEDxTalksSection.module.css";

// Add ALL your talks here.
const talks = [
  {
    embed: "https://www.youtube.com/embed/H54JVOpCMQY?si=BqqgvAND5jThmpfT",
    title:
      "Off Track and On Purpose: Turning Influence Into Impact | Krishanaraaj Mahadik | TEDxPCCOER",
    desc: "Off Track and On Purpose: Turning Influence Into Impact. Krishnaraj Mahadik is a multifaceted individual...",
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
    desc: "Drawing from personal experience, they reveal how adopting a startup mindset during college can spark innovation, build resilience, or just curious about building something of your own, this talk offers practical insights and a powerful reminder: you don’t need a business card to start thinking like a founder. Makaranad Athavale is a chartered accountant and serves as the chief finance officer for Team Ginie Startup. Additionally, he is a venture partner at Aha Ventures and holds a board position at the Institute of Directors, India",
  },
  {
    embed: "https://www.youtube.com/embed/ZdiQK_-BbmQ?si=c94MCK08IuWtvIa9",
    title:
      "Mic Check: Finding My Voice in a World That Said No | Mrunal Shankar | TEDxPCCOER",
    desc: "Drawing from personal experience, they reveal how adopting a startup mindset during college can spark innovation, build resilience, or just curious about building something of your own, this talk offers practical insights and a powerful reminder: you don’t need a business card to start thinking like a founder. Makaranad Athavale is a chartered accountant and serves as the chief finance officer for Team Ginie Startup. Additionally, he is a venture partner at Aha Ventures and holds a board position at the Institute of Directors, India",
  },
  {
    embed: "https://www.youtube.com/embed/5LVFDCyQzuk?si=U3fBWY2WnO7MMfHl",
    title: "One life make it or regret it | Kirsten Varela | TEDxPCCOER",
    desc: "Embark on a transformative journey with Kirsten Varela as he delves into the empowering realm of calisthenics. From his global sports experiences to catalyzing a fitness revolution in India, Kirsten unfolds his remarkable journey and the profound influence of calisthenics on overall well-being. Discover the hurdles faced, unexpected blessings encountered, and a compelling message on fostering positivity, gratitude, and self-belief. Elevate your perspective through Kirsten's exploration of the intricate mind-body connection. Kirsten Varela, a multifaceted individual with an indomitable spirit, wears several impressive hats in the world of fitness and entrepreneurship. As a Calisthenics Coach, Kirsten stands as a guiding light for those looking to harness the incredible potential of their own bodies.",
  },
  {
    embed: "https://www.youtube.com/embed/Ui7I7T9Nyyk?si=XQSEGzRmxfvolBrj",
    title:
      "Clickbait vs Conscience : A Youtuber's dilemma unvieled | Soham Shahane | TEDxPCCOER",
    desc: "Embark on an inspirational journey as Soham Shahane, also known as RJ Soham, takes center stage to reveal the compelling evolution from a fervent cricket enthusiast to a celebrated radio jockey. Through this engaging narrative, Soham unfolds a tale of unwavering resilience, self-discovery, and the profound impact of pursuing one's dreams in the face of adversity. Join him on this exploration of the true essence of chasing passion and forging a distinct path. This powerful storytelling isn't just a chronicle; it extends an open invitation to fearlessly embrace your aspirations Soham Shahane, renowned as RJ Soham, is a multifaceted media personality with a career spanning a decade in radio, anchoring, and cricket commentary. His fervor for cricket led him to serve as an English Cricket Commentator for over 600 matches since 2011.",
  },
];

export default function TEDxTalksFullPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={styles.talksSection}>
      <h2 className={styles.headline}>
        ALL <span className={styles.red}>TEDxPCCOER</span> TALKS
      </h2>
      <div className={styles.fullGrid}>
        {talks.map((talk, idx) => (
          <div className={styles.card} key={idx}>
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
    </section>
  );
}
