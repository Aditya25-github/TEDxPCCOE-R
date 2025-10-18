import React from "react";
import styles from "./Background.module.css";

export default function Background({ type, src, brightness = 1, children }) {
  if (type === "video") {
    return (
      <div className={styles.backgroundContainer}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className={styles.overlay}
          style={{ backgroundColor: `rgba(0, 0, 0, ${1 - brightness})` }}
        />
        <div className={styles.content}>{children}</div>
      </div>
    );
  }

  return <div className={styles.backgroundContainer}>{children}</div>;
}
