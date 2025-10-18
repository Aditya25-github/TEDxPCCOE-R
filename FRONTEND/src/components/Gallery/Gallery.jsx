import React from "react";
import styles from "./Gallery.module.css";

function openLightbox(src) {
  window.open(src, "_blank", "noopener,noreferrer");
}

export default function Gallery({ gallery }) {
  return (
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
        {gallery.map((g) => (
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
  );
}
