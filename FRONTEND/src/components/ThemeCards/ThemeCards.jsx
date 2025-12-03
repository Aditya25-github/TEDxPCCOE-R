import React, { useState, useCallback } from "react";
import styles from "./ThemeCards.module.css";

export default function ThemeCards() {
  const [exploredCards, setExploredCards] = useState([]);

  const themeElements = [
    {
      hint: "The cosmic self: 'I am the universe, the universe is me'",
      title: "The Cosmic Self",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            {/* Central OM glow */}
            <radialGradient id="omGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#ff6b3d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff6b3d" stopOpacity="0" />
            </radialGradient>
            
            {/* Energy gradient */}
            <linearGradient id="cosmicEnergy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2a13" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ff6b3d" />
            </linearGradient>
            
            {/* Glow filter for OM */}
            <filter id="omGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Pulsing background rings (Slightly altered timing for better flow) */}
          <circle cx="100" cy="90" r="65" fill="none" stroke="rgba(255,42,19,0.15)" strokeWidth="2">
            <animate attributeName="r" values="65;70;65" dur="4.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.28;0.15" dur="4.2s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="100" cy="90" r="75" fill="none" stroke="rgba(255,107,61,0.1)" strokeWidth="1.5">
            <animate attributeName="r" values="75;82;75" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.22;0.1" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Central OM glow background */}
          <circle cx="100" cy="85" r="45" fill="url(#omGlow)">
            <animate attributeName="r" values="45;52;45" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Sacred OM Symbol (ॐ) - Using actual Devanagari character with better styling */}
          <g transform="translate(100, 85)" filter="url(#omGlowFilter)">
            <text
              x="0"
              y="0"
              fontSize="85"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Noto Sans Devanagari', sans-serif"
              style={{ 
                paintOrder: 'stroke fill',
                strokeWidth: '2px',
                stroke: 'rgba(255,215,0,0.3)'
              }}
            >
              ॐ
            </text>
            
            {/* Additional glow layer */}
            <text
              x="0"
              y="0"
              fontSize="85"
              fontWeight="700"
              fill="url(#cosmicEnergy)"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Noto Sans Devanagari', sans-serif"
              opacity="0.6"
            >
              ॐ
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
            </text>
            
            {/* Primary OM character */}
            <text
              x="0"
              y="0"
              fontSize="85"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Noto Sans Devanagari', sans-serif"
              opacity="0.95"
            >
              ॐ
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
            </text>
          </g>

          {/* Pulsing energy rings emanating from OM */}
          <g>
            <circle cx="100" cy="85" r="50" fill="none" stroke="#ff6b3d" strokeWidth="2" opacity="0">
              <animate attributeName="r" values="50;85;85" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="2;0.5;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="85" r="50" fill="none" stroke="#ff2a13" strokeWidth="2" opacity="0">
              <animate attributeName="r" values="50;85;85" dur="3s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.6;0;0" dur="3s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="stroke-width" values="2;0.5;0.5" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>

          {/* Orbiting particles around OM - Kept for dynamic effect */}
          <g>
            {/* Inner orbit - fast */}
            <circle cx="135" cy="85" r="3" fill="#ff6b3d">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 85"
                to="360 100 85"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            
            <circle cx="65" cy="85" r="2.5" fill="#ffd700">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="180 100 85"
                to="540 100 85"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            
            {/* Outer orbit - slow */}
            <circle cx="155" cy="85" r="2" fill="#ff6b3d">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="90 100 85"
                to="450 100 85"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" begin="0.7s" />
            </circle>
            
            <circle cx="45" cy="85" r="1.8" fill="#ffd700">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="270 100 85"
                to="630 100 85"
                dur="12s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.8s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>

          {/* Sanskrit text "Aham" (अहम्) */}
          <text
            x="100"
            y="145"
            fontSize="36"
            fontWeight="700"
            fill="url(#cosmicEnergy)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Noto Sans Devanagari', sans-serif"
            className={styles.graphicTextMain}
          >
            अहम्
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
          </text>
          
          {/* English subtitle */}
          <text
            x="100"
            y="165"
            fontSize="13"
            fontWeight="500"
            fill="rgba(255,255,255,0.65)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Inter', -apple-system, sans-serif"
            letterSpacing="0.5"
            className={styles.graphicTextSub}
          >
            Main Character Energy
            <animate attributeName="opacity" values="0.5;0.75;0.5" dur="3s" repeatCount="indefinite" />
          </text>
        </svg>
      ),
    },
    {
      hint: "Finding your voice and sharing it with the world",
      title: "The Authentic Voice",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff6b3d" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="micGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#ff2a13" stopOpacity="0" />
            </radialGradient>
            <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Sound waves - concentric expanding circles (now with glow filter) */}
          <g filter="url(#waveGlow)">
            <circle cx="100" cy="90" r="30" fill="none" stroke="url(#voiceGradient)" strokeWidth="3" opacity="0">
              <animate attributeName="r" values="25;65;65" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="3;1;1" dur="2.2s" repeatCount="indefinite" />
            </circle>
            
           <circle cx="100" cy="90" r="30" fill="none" stroke="url(#voiceGradient)" strokeWidth="3" opacity="0">
              <animate attributeName="r" values="25;65;65" dur="2.2s" repeatCount="indefinite" begin="0.7s" />
              <animate attributeName="opacity" values="0.7;0;0" dur="2.2s" repeatCount="indefinite" begin="0.7s" />
              <animate attributeName="stroke-width" values="3;1;1" dur="2.2s" repeatCount="indefinite" begin="0.7s" />
            </circle>
          </g>
          
          {/* Microphone stand and Mic - IMPROVED LOOK */}
          <g transform="translate(100, 100)">
            {/* Base */}
            <rect x="-20" y="50" width="40" height="5" rx="2" fill="#1a1a1a" />
            <rect x="-15" y="45" width="30" height="8" rx="3" fill="#2a2a2a" />
            
            {/* Stand pole (thicker) */}
            <rect x="-3" y="10" width="6" height="35" fill="#444" /> 
            
            {/* Mic holder/neck */}
            <rect x="-5" y="0" width="10" height="15" fill="#666" rx="2" /> 

            {/* Microphone head with glow (Grill) */}
            <circle cx="0" cy="-12" r="20" fill="url(#micGlow)" opacity="0.6">
              <animate attributeName="r" values="20;22;20" dur="1.5s" repeatCount="indefinite" />
            </circle>
            
            {/* Inner Mic head (Red core) */}
            <circle cx="0" cy="-12" r="16" fill="#ff2a13">
              <animate attributeName="r" values="16;18;16" dur="1.5s" repeatCount="indefinite" />
            </circle>
            
            {/* Mic metal casing/grill detail */}
            <circle cx="0" cy="-12" r="18" fill="none" stroke="#ddd" strokeWidth="1.5" opacity="0.5" />
            <circle cx="0" cy="-12" r="14" fill="none" stroke="#aaa" strokeWidth="0.5" opacity="0.6" />
            
          </g>

          {/* Directional sound waves (made them more fluid) */}
          <g opacity="0.8" transform="translate(0, -10)">
            <path d="M115,75 Q135,70 150,75" stroke="#ff6b3d" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M115,75 Q135,70 150,75; M115,75 Q135,68 155,72; M115,75 Q135,70 150,75" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.5s" repeatCount="indefinite" />
            </path>
            
            <path d="M115,105 Q135,110 150,105" stroke="#ff2a13" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M115,105 Q135,110 150,105; M115,105 Q135,112 155,108; M115,105 Q135,110 150,105" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
            </path>
          </g>

          {/* Musical notes (Made smaller and more scattered) */}
          <g>
            <text x="45" y="65" fontSize="16" fill="#ffd700" fontFamily="Arial" opacity="0.8">♪
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -5,-15; -10,-20"
                dur="3s"
                repeatCount="indefinite"
              />
            </text>
            
            <text x="155" y="55" fontSize="14" fill="#ff6b3d" fontFamily="Arial" opacity="0.7">♫
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin="0.8s" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 8,-10; 15,-15"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </text>
          </g>

           {/* Core Text */}
           <text
            x="100"
            y="155"
            fontSize="30"
            fontWeight="700"
            fill="url(#voiceGradient)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Inter', sans-serif"
            className={styles.graphicTextMain}
          >
            Speak Up
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
          </text>
        </svg>
      ),
    },
    {
      hint: "The courage to create your own path forward",
      title: "The Path Forward",
      graphic: (
        <svg viewBox="0 0 200 180" width="100%" height="180px" aria-hidden="true">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a13" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ff6b3d" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff2a13" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ff6b3d" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff2a13" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(60,60,60,0.7)" />
              <stop offset="100%" stopColor="rgba(30,30,30,0.5)" />
            </linearGradient>
            {/* Shadow filter for path */}
            <filter id="pathShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.5" result="shadow"/>
              <feOffset dx="1" dy="1"/>
              <feFlood floodColor="#ff6b3d" floodOpacity="0.3"/>
              <feComposite in2="shadow" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background mountains */}
          <path d="M0,140 L40,110 L80,130 L120,100 L160,120 L200,90 L200,180 L0,180 Z" 
                fill="url(#mountainGrad)" opacity="0.6" />
          
          {/* Sun/Destination - IMPROVED LOOK */}
          <circle cx="170" cy="45" r="25" fill="url(#sunGlow)">
            <animate attributeName="r" values="25;28;25" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="170" cy="45" r="16" fill="#ffd700">
            <animate attributeName="opacity" values="0.95;1;0.95" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Sun rays - MORE DEFINED & PULSING */}
          <g stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" transform="rotate(0 170 45)">
            {/* Long rays */}
            <line x1="170" y1="20" x2="170" y2="10">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="190" y1="45" x2="200" y2="45">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="0.75s" />
            </line>
            <line x1="150" y1="45" x2="140" y2="45">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" begin="1.5s" />
            </line>

            {/* Shorter, pulsing rays */}
            <line x1="185" y1="35" x2="190" y2="30">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="155" y1="35" x2="150" y2="30">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
            </line>
            <line x1="190" y1="55" x2="195" y2="58">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
            </line>
            <line x1="150" y1="55" x2="145" y2="58">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
            </line>
             <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 170 45"
                to="360 170 45"
                dur="20s"
                repeatCount="indefinite"
            />
          </g>

          {/* Path line with shadow */}
          <path
            d="M20,165 Q45,145 70,155 Q95,135 120,145 Q145,125 170,135"
            stroke="url(#pathGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="220"
            strokeDashoffset="220"
            filter="url(#pathShadow)"
          >
            <animate attributeName="stroke-dashoffset" values="220;0" dur="2.5s" fill="freeze" />
          </path>

          {/* Footsteps (Simplified animation for less clutter) */}
          <g opacity="0.7">
            <path d="M40,160 L50,160 L53,165 L43,165 Z" fill="#ffffff" opacity="0">
              <animate attributeName="opacity" values="0;0.9" dur="0.3s" begin="0.8s" fill="freeze" />
            </path>
            <path d="M90,140 L100,140 L103,145 L93,145 Z" fill="#ff6b3d" opacity="0">
              <animate attributeName="opacity" values="0;0.9" dur="0.3s" begin="1.6s" fill="freeze" />
            </path>
            <path d="M150,120 L160,120 L163,125 L153,125 Z" fill="#ff2a13" opacity="0">
              <animate attributeName="opacity" values="0;0.9" dur="0.3s" begin="2.4s" fill="freeze" />
            </path>
          </g>

          {/* Moving traveler (Made it a circle with a small trail/shadow) */}
          <g transform="translate(0, 5)">
            <circle cx="20" cy="160" r="7" fill="#ffffff" stroke="#ff2a13" strokeWidth="2" opacity="0">
              <animate attributeName="opacity" values="0;1;1" dur="0.1s" begin="2.5s" fill="freeze"/>
              <animate attributeName="cx" values="20;170" dur="8s" repeatCount="indefinite" begin="2.5s" />
              <animate attributeName="cy" values="160;130" dur="8s" repeatCount="indefinite" begin="2.5s" />
            </circle>
            
            <circle cx="20" cy="160" r="3" fill="#ff2a13" opacity="0">
              <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" begin="2.5s" />
              <animate attributeName="cx" values="20;170" dur="8s" repeatCount="indefinite" begin="2.5s" />
              <animate attributeName="cy" values="160;130" dur="8s" repeatCount="indefinite" begin="2.5s" />
            </circle>
          </g>

          {/* Core Text */}
           <text
            x="100"
            y="70"
            fontSize="30"
            fontWeight="700"
            fill="url(#pathGradient)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Inter', sans-serif"
            className={styles.graphicTextMain}
          >
            The Journey
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
          </text>
        </svg>
      ),
    },
  ];

  const exploreCard = useCallback((index) => {
    setExploredCards((prev) => 
      prev.includes(index) ? prev : [...prev, index]
    );
  }, []);

  const isExplored = useCallback((index) => exploredCards.includes(index), [exploredCards]);

  const handleKeyPress = useCallback((e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      exploreCard(index);
    }
  }, [exploreCard]);

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
            aria-label={`Explore insight ${index + 1}${isExplored(index) ? ' - Revealed' : ''}`}
            aria-pressed={isExplored(index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardGraphicContainer}>
                <div className={styles.cardGraphic}>{element.graphic}</div>
                {/* Text overlay - now just a simple indicator for closed cards on hover */}
                <div className={styles.closedCardHoverText}>
                    {element.title}
                </div>
              </div>

              <div className={styles.cardHint}>
                <div className={styles.hintFlipContainer}>
                  {/* Front: Hidden Hint */}
                  <div className={`${styles.hintSide} ${styles.hiddenHint}`}>
                    <div className={styles.mysteryIcon} aria-hidden="true">?</div>
                    <p className={styles.exploreText}>Discover the meaning</p>
                  </div>

                  {/* Back: Revealed Hint */}
                  <div className={`${styles.hintSide} ${styles.revealedHint}`}>
                    <p className={styles.hintText}>{element.hint}</p>
                    <div className={styles.insightIndicator} aria-live="polite">
                      Insight Revealed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={(exploredCards.length / themeElements.length) * 100} aria-valuemin="0" aria-valuemax="100">
          <div
            className={styles.progressFill}
            style={{ width: `${(exploredCards.length / themeElements.length) * 100}%` }}
          />
        </div>
        <div className={styles.progressText} aria-live="polite">
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