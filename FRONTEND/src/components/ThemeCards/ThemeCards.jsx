import React, { useState } from "react";
import styles from "./ThemeCards.module.css";

export default function ThemeCards() {
  const [exploredCards, setExploredCards] = useState([]);

  const themeElements = [
    {
      hint: "The power of self-identity and personal truth",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            <radialGradient id="consciousnessGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ff6b3d" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff6b3d" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="neuralPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a13" />
              <stop offset="100%" stopColor="#ff6b3d" />
            </linearGradient>
          </defs>

          <circle cx="100" cy="90" r="35" fill="url(#consciousnessGlow)">
            <animate attributeName="r" values="35;40;35" dur="3s" repeatCount="indefinite" />
          </circle>

          <text
            x="100"
            y="100"
            fontSize="48"
            fontWeight="700"
            fill="#ffffff"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Noto Sans Devanagari', 'Noto Serif Devanagari', serif"
            opacity="0.95"
          >
            अ
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
          </text>

          <g stroke="url(#neuralPath)" strokeWidth="1.5" opacity="0.7">
            <path d="M70,70 Q90,60 110,70 Q130,80 130,100" fill="none">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M130,100 Q130,120 110,130 Q90,140 70,130" fill="none">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="1s" />
            </path>
            <path d="M70,130 Q60,120 60,100 Q60,80 70,70" fill="none">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="2s" />
            </path>
          </g>

          <g>
            <circle cx="60" cy="70" r="4" fill="#ff2a13">
              <animate attributeName="cy" values="70;65;70" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="140" cy="110" r="3" fill="#ff6b3d">
              <animate attributeName="cx" values="140;145;140" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="80" cy="130" r="3.5" fill="#ff2a13">
              <animate attributeName="cy" values="130;135;130" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="120" cy="60" r="2.5" fill="#ff6b3d">
              <animate attributeName="cx" values="120;115;120" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </circle>
          </g>

          <g>
            <path d="M95,75 L100,70 L105,75 L100,80 Z" fill="#ffffff" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" values="0 100 90;180 100 90;360 100 90" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M110,100 L115,95 L120,100 L115,105 Z" fill="#ffd700" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="1s" />
              <animateTransform attributeName="transform" type="rotate" values="0 115 100;180 115 100;360 115 100" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          <circle cx="100" cy="90" r="50" fill="none" stroke="#ff6b3d" strokeWidth="1" opacity="0.4">
            <animate attributeName="r" values="50;60;50" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
    },
    {
      hint: "Finding your voice and sharing it with the world",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            <linearGradient id="soundWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff6b3d" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <rect x="40" y="130" width="120" height="25" rx="6" fill="#2a2a2a" />
          <rect x="50" y="125" width="100" height="5" rx="2" fill="#444" />

          <g transform="translate(100, 100)">
            <circle r="10" fill="#ff2a13" />
            <rect x="-5" y="10" width="10" height="30" fill="#ff2a13" />
            <path d="M-5,15 L-20,25 L-18,28 M5,15 L20,25 L18,28" stroke="#ff2a13" strokeWidth="3" fill="none" />
            <path d="M-5,40 L-10,55 L-8,57 M5,40 L10,55 L8,57" stroke="#ff2a13" strokeWidth="3" fill="none" />
          </g>

          <g>
            <circle cx="100" cy="100" r="30" fill="none" stroke="url(#soundWaveGradient)" strokeWidth="2" opacity="0.7">
              <animate attributeName="r" values="30;45;30" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="2;3;2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="50" fill="none" stroke="url(#soundWaveGradient)" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" values="50;65;50" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#soundWaveGradient)" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="70;85;70" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>

          <path d="M100,70 Q130,50 160,60 Q180,70 190,80" stroke="#ff2a13" strokeWidth="4" fill="none" opacity="0.8" strokeLinecap="round">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
          </path>

          <g>
            <circle cx="160" cy="100" r="3" fill="#ffffff" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="170" cy="80" r="2.5" fill="#ffffff" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="150" cy="120" r="3" fill="#ffffff" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.6s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle cx="180" cy="110" r="2" fill="#ff6b3d" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.7s" repeatCount="indefinite" begin="0.9s" />
            </circle>
          </g>
        </svg>
      ),
    },
    {
      hint: "The courage to create your own path forward",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            <linearGradient id="journeyPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ff6b3d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff2a13" stopOpacity="0.8" />
            </linearGradient>
            <radialGradient id="horizonLight" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#ff6b3d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff2a13" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mountainPeak" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff6b3d" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <ellipse cx="100" cy="30" rx="120" ry="40" fill="url(#horizonLight)" />
          <path d="M0,120 L25,90 L50,110 L75,80 L100,100 L125,70 L150,90 L175,60 L200,80 L200,180 L0,180 Z" fill="rgba(255,255,255,0.05)" />

          <path
            d="M20,140 Q45,120 70,130 Q95,110 120,120 Q145,100 170,110 Q185,95 190,100"
            stroke="url(#journeyPath)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset="200"
          >
            <animate attributeName="stroke-dashoffset" values="200;0;10;0" dur="4s" repeatCount="indefinite" />
          </path>

          <g>
            <path d="M35,135 L45,135 L48,142 L38,142 Z" fill="#ff2a13" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M75,125 L85,125 L88,132 L78,132 Z" fill="#ff6b3d" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.4s" />
            </path>
            <path d="M115,115 L125,115 L128,122 L118,122 Z" fill="#ff2a13" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.8s" />
            </path>
            <path d="M155,105 L165,105 L168,112 L158,112 Z" fill="#ff6b3d" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1.2s" />
            </path>
          </g>

          <g transform="translate(50, 135)">
            <circle r="4" fill="#ffffff">
              <animate attributeName="cx" values="0;140;0" dur="8s" repeatCount="indefinite" />
            </circle>
          </g>

          <g>
            <circle cx="70" cy="130" r="5" fill="#ff2a13">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="120" r="5" fill="#ff6b3d">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="170" cy="110" r="5" fill="#ff2a13">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>

          <path d="M150,50 L190,90 L110,90 Z" fill="url(#mountainPeak)" opacity="0.8" />
          <path d="M150,50 L190,90" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          <path d="M150,50 L110,90" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />

          <circle cx="170" cy="45" r="10" fill="#ffd700" opacity="0.9">
            <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </circle>

          <g>
            <circle cx="50" cy="70" r="2.5" fill="#ff6b3d">
              <animate attributeName="cy" values="70;65;70" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="130" cy="60" r="3" fill="#ff2a13">
              <animate attributeName="cx" values="130;135;130" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="90" cy="50" r="2" fill="#ff6b3d">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      ),
    },
  ];

  const exploreCard = (index) => {
    if (!exploredCards.includes(index)) {
      setExploredCards((prev) => [...prev, index]);
    }
  };

  const isExplored = (index) => exploredCards.includes(index);

  return (
    <section className={styles.themeCards} aria-labelledby="themes-heading">
      <div className={styles.sectionHeader}>
        <h2 id="themes-heading" className={styles.sectionTitle}>
          Uncover The <span className={styles.accent}>Story</span>
        </h2>
      </div>

      <div className={styles.cardsGrid}>
        {themeElements.map((element, index) => (
          <div
            key={index}
            className={`${styles.card} ${isExplored(index) ? styles.explored : ""}`}
            onClick={() => exploreCard(index)}
            role="button"
            tabIndex={0}
            aria-label={`Explore insight ${index + 1}`}
            onKeyPress={(e) => e.key === "Enter" && exploreCard(index)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardGraphic}>{element.graphic}</div>

              <div className={styles.cardHint}>
                {isExplored(index) ? (
                  <div className={styles.revealedHint}>
                    <p className={styles.hintText}>{element.hint}</p>
                    <div className={styles.insightIndicator}>Insight Revealed</div>
                  </div>
                ) : (
                  <div className={styles.hiddenHint}>
                    <div className={styles.mysteryIcon}>?</div>
                    <p className={styles.exploreText}>Discover the meaning</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(exploredCards.length / themeElements.length) * 100}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {exploredCards.length === themeElements.length
            ? "All insights revealed. Consider how they connect."
            : exploredCards.length > 0
            ? `${exploredCards.length} of ${themeElements.length} insights discovered`
            : "Explore each element to reveal insights"}
        </div>
      </div>
    </section>
  );
}
