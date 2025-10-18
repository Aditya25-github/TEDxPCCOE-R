import React, { useRef, useEffect, useState } from 'react';
import styles from './Background.module.css';

export default function Background({ 
  type = 'video', 
  src, 
  imageSrc, 
  fallbackColor = 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)',
  brightness = 0.7,
  children 
}) {
  const videoRef = useRef(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setMediaLoaded(true);
        video.play().catch(error => {
          console.log("Video autoplay failed:", error);
        });
      };

      const handleError = () => {
        console.error("Background video failed to load");
        setMediaLoaded(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    } else if (type === 'image') {
      // For images, we consider them loaded immediately
      // You could add actual image loading logic here if needed
      setMediaLoaded(true);
    }
  }, [type]);

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.backgroundMedia}>
        {type === 'video' && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`${styles.backgroundVideo} ${mediaLoaded ? styles.mediaLoaded : ''}`}
            src={src}
            style={{ filter: `brightness(${brightness})` }}
          />
        )}
        {type === 'image' && (
          <img
            src={imageSrc}
            alt=""
            className={`${styles.backgroundImage} ${mediaLoaded ? styles.mediaLoaded : ''}`}
            style={{ filter: `brightness(${brightness})` }}
          />
        )}
        <div 
          className={styles.backgroundFallback}
          style={{ background: fallbackColor }}
        />
      </div>
      {children}
    </div>
  );
}