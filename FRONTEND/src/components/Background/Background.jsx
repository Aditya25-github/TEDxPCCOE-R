import React from "react";
import styles from "./Background.module.css";

export default function Background({ type, src, brightness = 1, children }) {
  return (
    <>
      <div className={styles.backgroundContainer}>
        {type === "video" ? (
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
        ) : (
          <img
            src={src}
            alt="Background"
            className={styles.backgroundImage}
            loading="eager"
            draggable="false"
          />
        )}
        {/* Remove or minimize the overlay to keep image bright */}
        <div
          className={styles.overlay}
          style={{
            backgroundColor: `rgba(0,0,0,${1 - brightness})`
          }}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}