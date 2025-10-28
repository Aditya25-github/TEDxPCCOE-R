import React from "react";
import styles from "./Background.module.css";

export default function Background({ type = "video", src, brightness = 0.6, children }) {
  return (
    <div className={styles.backgroundWrapper}>
      {type === "video" ? (
        <video
          className={styles.backgroundVideo}
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img className={styles.backgroundImage} src={src} alt="Background" />
      )}
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${1 - brightness})` }}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
