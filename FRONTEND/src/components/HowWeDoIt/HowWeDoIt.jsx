import React from "react";
import styles from "./HowWeDoIt.module.css";
import {
  FaMicrophone,
  FaHandshake,
  FaUsers,
  FaInstagram,
  FaEnvelope,
  FaUserPlus,
} from "react-icons/fa";

const services = [
  {
    label: "Hurry Apply now to Speak at TEDxPCCOER",
    icon: <FaMicrophone />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLScenzeRvNFsDYcp2F6tCVzTW53czels_TKyZH9p5dUyvSsHDg/viewform",
    desc: "Become a TEDx speaker and share ideas worth spreading.",
  },
  {
    label: "Start Your Partnership with TEDxPCCOER",
    icon: <FaHandshake />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdGAcRc9cGjhFni4qA3lYRUmRm8U9NmcabKTvz0IBAIqD7Bjw/viewform",
    desc: "Collaborate or sponsor TEDx events with us.",
  },
  {
    label: "Perform at TEDxPCCOER",
    icon: <FaUsers />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSctlz7fSFT2ouE8lwPJyGknKbqKOFtaClpZwz0yBiDfYKGhCA/viewform",
    desc: "Join our show line-up as a performer or entertainer.",
  },
  {
    label: "Join Our Team - Recruitment Form",
    icon: <FaUserPlus />,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSeYQE2msOTc1L2V2H_KDJRBpX4dD5tzQW3Trt0Np7BZ1yHGXQ/alreadyresponded",
    desc: "Become a part of organizing TEDxPCCOER.",
  },
  {
    label: "Stay Connected: Instagram @TEDxPCCOER",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/tedxpccoer/",
    desc: "Follow us on Instagram for updates.",
  },
  {
    label: "Write to Us: via Mail",
    icon: <FaEnvelope />,
    link: "mailto:tedxpccoer@gmail.com",
    desc: "Send us your queries or feedback.",
  },
];

export default function HowWeDoIt() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          This is <span className={styles.highlight}>How We do It</span>
        </h1>
        <p className={styles.subtitle}>
          We are looking for speakers or performers who have radically new
          ideas, exposing cutting-edge research, technology, design, and more
        </p>
      </div>
      <div className={styles.servicesGrid}>
        {services.map((service, idx) => (
          <a
            key={service.label}
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.serviceCard}
          >
            <div className={styles.cardIcon}>{service.icon}</div>
            <div className={styles.cardContent}>
              <h3>{service.label}</h3>
              <p>{service.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
