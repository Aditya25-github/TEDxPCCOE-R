import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrthographicCamera, shaderMaterial } from "@react-three/drei";
import {
  Color,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
} from "three";


// --- ENHANCED SETTINGS WITH VIBRANT RED ---
const BASE_SETTINGS = {
  text: "TEDxPCCOER",
  totalPoints: 25000,
  cameraZoom: 100,
  formationDuration: 2000,
  holdDuration: 1200,
  explosionDuration: 2500,
  backgroundColor: "#000000",
  tedxColor: "#FF0000",
  pccoerColor: "#FFFFFF",
  ambientLightIntensity: 5.0,
  pointLightIntensity: 7.0,
  explosionStrength: 50,
};


// --- SHADER WITH ENHANCED RED INTENSITY ---
const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uExplode: 0,
    uSize: 1.0,
    uGlowIntensity: 5.0,
  },
  /* Vertex Shader */
  `
    attribute vec3 aTarget;
    attribute vec3 aColor;
    attribute float aDelay;
    attribute float aSpeed; 
    
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;
    varying float vExplode;
    
    uniform float uTime;
    uniform float uProgress;
    uniform float uExplode;
    uniform float uSize;
    uniform float uGlowIntensity;


    float random(vec3 co) {
      return fract(sin(dot(co, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
    }


    void main() {
      vColor = aColor;
      vExplode = uExplode;
      vec3 initialPos = position;
      vec3 targetPos = aTarget;


      float adjustedProgress = clamp((uProgress - aDelay) / (1.0 - aDelay), 0.0, 1.0);
      float smoothProgress = adjustedProgress * adjustedProgress * (3.0 - 2.0 * adjustedProgress);


      float swarmIntensity = 0.004 * (1.0 - uExplode); 
      
      float offsetZ = sin(uTime * 0.8 + aSpeed * 8.0) * aSpeed * swarmIntensity * 0.15;
      float offsetX = cos(uTime * 1.2 + aSpeed * 6.0) * aSpeed * swarmIntensity * 0.8;
      float offsetY = sin(uTime * 1.0 + aSpeed * 7.0) * aSpeed * swarmIntensity * 0.8;
      
      vec3 swarmOffset = vec3(offsetX, offsetY, offsetZ);
      vec3 morphedPos = mix(initialPos, targetPos, smoothProgress) + swarmOffset;


      if (uExplode > 0.0) {
        vec3 explosionDir = normalize(targetPos + vec3(0.0001));
        
        float randomX = random(targetPos + vec3(1.0, 0.0, 0.0)) - 0.5;
        float randomY = random(targetPos + vec3(0.0, 1.0, 0.0)) - 0.5;
        float randomZ = random(targetPos + vec3(0.0, 0.0, 1.0)) - 0.5;
        vec3 randomDir = normalize(vec3(randomX, randomY, randomZ));
        
        explosionDir = normalize(mix(explosionDir, randomDir, 0.6));
        
        float velocity = aSpeed * 0.8;
        float explosionProgress = uExplode * uExplode;
        float explosionStrength = explosionProgress * 50.0 * velocity;
        
        float gravity = explosionProgress * explosionProgress * 5.0;
        
        float angle = uExplode * 1.5 * aSpeed;
        float cosA = cos(angle);
        float sinA = sin(angle);
        vec3 rotatedDir = vec3(
          explosionDir.x * cosA - explosionDir.z * sinA,
          explosionDir.y - gravity * 0.1,
          explosionDir.x * sinA + explosionDir.z * cosA
        );
        
        morphedPos += rotatedDir * explosionStrength;
      }


      vec4 mvPosition = modelViewMatrix * vec4(morphedPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;


      float depth = max(-mvPosition.z, 0.1);
      
      float sizeMultiplier = mix(3.0, 5.0, smoothProgress);
      
      if (uExplode > 0.0) {
        sizeMultiplier = 5.0 + uExplode * uExplode * 35.0;
      }


      float trailBoost = smoothstep(0.0, 0.7, 1.0 - smoothProgress) * (1.0 - uExplode) * 8.0; 
      sizeMultiplier += trailBoost;


      gl_PointSize = uSize * sizeMultiplier / depth;
      
      vGlow = uGlowIntensity * (2.0 + smoothProgress * 1.5);
      vAlpha = 1.0 - smoothstep(0.5, 1.0, uExplode);
    }
  `,
  /* Fragment Shader - ENHANCED FOR RED INTENSITY */
  `
    #ifdef GL_OES_standard_derivatives
      #extension GL_OES_standard_derivatives : enable
    #endif
    
    precision highp float;
    
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;
    varying float vExplode;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Anti-aliased edge for sharper particles
      float radius = 0.5;
      #ifdef GL_OES_standard_derivatives
        float delta = fwidth(dist);
        float edge = 1.0 - smoothstep(radius - delta, radius + delta, dist);
      #else
        float edge = 1.0 - smoothstep(radius - 0.05, radius, dist);
      #endif
      
      // Soft core
      float coreAlpha = 1.0 - smoothstep(0.0, 0.5, dist);
      coreAlpha = pow(coreAlpha, 0.4);
      
      // Multiple glow layers
      float glow1 = exp(-dist * 3.0) * 2.0;
      float glow2 = exp(-dist * 6.0) * 3.0;
      float glow3 = exp(-dist * 10.0) * 1.5;
      
      float totalGlow = max(max(glow1, glow2), glow3);
      float alpha = max(coreAlpha, totalGlow * 0.8) * edge;
      
      // ENHANCED: Boost red colors specifically
      vec3 boostedColor = vColor;
      
      // If this is a red particle (high red value, low green/blue), boost it more
      if (vColor.r > 0.9 && vColor.g < 0.3 && vColor.b < 0.3) {
        boostedColor.r *= 1.8;
        boostedColor.g *= 0.6;
        boostedColor.b *= 0.6;
      }
      
      vec3 baseColor = boostedColor * (2.0 + vGlow * 2.5);
      vec3 finalColor = baseColor + boostedColor * totalGlow;
      
      // Extra brightness - increased for red particles
      finalColor = finalColor * 4.5;
      
      // Hot center - enhanced for red
      float hotCenter = 1.0 - smoothstep(0.0, 0.25, dist);
      finalColor += boostedColor * hotCenter * 2.0;
      
      // During explosion, add extra glow
      if (vExplode > 0.3) {
        finalColor += boostedColor * (1.0 - dist * 2.0) * vExplode * 2.0;
      }
      
      gl_FragColor = vec4(finalColor, alpha * vAlpha);
    }
  `
);


extend({ ParticleMaterial });


function splitTedxPCCOER(s) {
  return {
    tedx: "TEDx",
    pccoer: "PCCOER"
  };
}


function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefers(!!mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prefers;
}


function createTextParticles(text, totalPoints, viewportWidth) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  
  // INCREASED RESOLUTION for sharper text
  const width = isMobile ? 2400 : 3600;
  const height = isMobile ? 480 : 680;
  
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { 
    willReadFrequently: true,
    alpha: true
  });

  // LARGER FONTS for better sampling quality
  const fontTEDx = `900 ${isMobile ? 200 : 300}px Inter, Helvetica, Arial, sans-serif`;
  const fontPCCOER = `900 ${isMobile ? 170 : 250}px Inter, Helvetica, Arial, sans-serif`;

  const parts = splitTedxPCCOER(text);
  const centerX = width / 2;
  const centerY = height / 2;

  ctx.font = fontTEDx;
  const widthTEDx = ctx.measureText(parts.tedx).width;
  ctx.font = fontPCCOER;
  const widthPCCOER = ctx.measureText(parts.pccoer).width;

  const totalTextPixelWidth = widthTEDx + widthPCCOER + (isMobile ? 70 : 100);
  const pixelScaleFactor = Math.min(1, (width * 0.9) / totalTextPixelWidth);
  
  let currentX = centerX - (totalTextPixelWidth * pixelScaleFactor) / 2;

  // HIGH-QUALITY RENDERING SETTINGS
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // ENHANCED: More prominent shadow for better text definition
  ctx.shadowColor = "rgba(255, 0, 0, 0.3)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 6;

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // CRITICAL: Draw TEDx in PURE VIBRANT RED
  ctx.strokeStyle = BASE_SETTINGS.tedxColor;
  ctx.lineWidth = 10;
  ctx.fillStyle = BASE_SETTINGS.tedxColor;
  ctx.font = fontTEDx;
  const scaledTEDxWidth = widthTEDx * pixelScaleFactor;
  
  // Draw multiple times for more intense red and better definition
  ctx.strokeText(parts.tedx, currentX, centerY);
  ctx.fillText(parts.tedx, currentX, centerY);
  ctx.fillText(parts.tedx, currentX, centerY);
  
  currentX += scaledTEDxWidth + (isMobile ? 30 : 44);

  // Reset shadow for PCCOER (white text)
  ctx.shadowColor = "rgba(255, 255, 255, 0.2)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  // Draw PCCOER in WHITE
  ctx.strokeStyle = BASE_SETTINGS.pccoerColor;
  ctx.lineWidth = 10;
  ctx.fillStyle = BASE_SETTINGS.pccoerColor;
  ctx.font = fontPCCOER;
  ctx.strokeText(parts.pccoer, currentX, centerY);
  ctx.fillText(parts.pccoer, currentX, centerY);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const sampledPoints = [];
  const sampledColors = [];

  // SMALLER STEP for more particles and better text definition
  const step = isMobile ? 0.5 : 0.35;
  
  // CRITICAL: Calculate exact boundary between TEDx and PCCOER
  const tedxEndX = centerX - (totalTextPixelWidth * pixelScaleFactor) / 2 + scaledTEDxWidth + (isMobile ? 20 : 30);
  
  const targetWorldWidth = viewportWidth * 0.82;
  const actualDrawnTextPixelWidth = totalTextPixelWidth * pixelScaleFactor;
  const worldScale = targetWorldWidth / actualDrawnTextPixelWidth; 

  // Sample particles and assign colors
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alphaIndex = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
      if (imageData[alphaIndex] > 60) {
        const relativeX = x - centerX;
        const relativeY = centerY - y;
        
        const worldX = relativeX * worldScale; 
        const worldY = relativeY * worldScale; 
        sampledPoints.push(worldX, worldY, 0);

        // CRITICAL: Assign VIBRANT RED to TEDx particles, WHITE to PCCOER particles
        const isTEDx = x < tedxEndX;
        
        if (isTEDx) {
          sampledColors.push(1.0, 0.0, 0.0);
        } else {
          sampledColors.push(1.0, 1.0, 1.0);
        }
      }
    }
  }

  const numSampled = Math.max(1, sampledPoints.length / 3);
  const numPoints = Math.min(totalPoints, numSampled);

  const positions = new Float32Array(numPoints * 3);
  const targets = new Float32Array(numPoints * 3);
  const colors = new Float32Array(numPoints * 3);
  const delays = new Float32Array(numPoints);
  const speeds = new Float32Array(numPoints);

  const wideXY = 20; 
  
  for (let i = 0; i < numPoints; i++) {
    const j = i * 3;
    const randomIndex = Math.floor(Math.random() * numSampled);
    const rj = randomIndex * 3;

    const deepZ = -(28 + Math.random() * 28);
    positions[j] = (Math.random() - 0.5) * wideXY;
    positions[j + 1] = (Math.random() - 0.5) * wideXY;
    positions[j + 2] = deepZ;

    targets[j] = sampledPoints[rj];
    targets[j + 1] = sampledPoints[rj + 1];
    targets[j + 2] = sampledPoints[rj + 2];

    colors[j] = sampledColors[rj];
    colors[j + 1] = sampledColors[rj + 1];
    colors[j + 2] = sampledColors[rj + 2];

    delays[i] = Math.pow(Math.random(), 2.0) * 0.4; 
    speeds[i] = 0.5 + Math.random(); 
  }

  return { positions, targets, colors, delays, speeds, numPoints };
}


function ParticleText({ text, explode, totalPoints, particleSize }) {
  const { viewport } = useThree(); 

  const pointsRef = useRef();
  const materialRef = useRef();
  const clockStart = useRef(performance.now());
  const prefersReducedMotion = usePrefersReducedMotion();

  const { positions, targets, colors, delays, speeds } = useMemo(
    () => createTextParticles(text, totalPoints, viewport.width),
    [text, totalPoints, viewport.width]
  );

  const geom = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("aTarget", new BufferAttribute(targets, 3));
    g.setAttribute("aColor", new BufferAttribute(colors, 3));
    g.setAttribute("aDelay", new BufferAttribute(delays, 1));
    g.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
    return g;
  }, [positions, targets, colors, delays, speeds]);

  useEffect(() => {
    const m = materialRef.current;
    if (!m || !m.uniforms) return;
    m.uniforms.uSize.value = particleSize;
    m.uniforms.uProgress.value = 0;
    m.uniforms.uExplode.value = 0;
    m.uniforms.uGlowIntensity.value = 5.0;
  }, [particleSize]);

  useFrame(() => {
    const material = materialRef.current;
    if (!material || !material.uniforms) return;
    const elapsed = (performance.now() - clockStart.current) / 1000;

    material.uniforms.uTime.value = elapsed;

    if (prefersReducedMotion) {
      material.uniforms.uProgress.value = 1;
      material.uniforms.uExplode.value = 0;
      return;
    }

    const formProgress = Math.min(
      elapsed / (BASE_SETTINGS.formationDuration / 1000),
      1.0
    );
    const easedFormProgress = formProgress < 0.5
      ? 2.0 * formProgress * formProgress
      : 1.0 - Math.pow(-2.0 * formProgress + 2.0, 2.0) / 2.0;
    material.uniforms.uProgress.value = easedFormProgress;

    if (explode) {
      const timeSinceExplosion =
        elapsed -
        (BASE_SETTINGS.formationDuration + BASE_SETTINGS.holdDuration) / 1000;
      const explodeProgress = Math.min(
        Math.max(0, timeSinceExplosion) /
          (BASE_SETTINGS.explosionDuration / 1000),
        1.0
      );
      const easedExplodeProgress = explodeProgress < 0.5
        ? 2.0 * explodeProgress * explodeProgress
        : 1.0 - Math.pow(-2.0 * explodeProgress + 2.0, 2.0) / 2.0;
      material.uniforms.uExplode.value = easedExplodeProgress;
    }
  });

  return (
    <points ref={pointsRef} geometry={geom} frustumCulled={false}>
      <particleMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}


export default function Preloader({ onFinish }) {
  const [done, setDone] = useState(false);
  const [explode, setExplode] = useState(false);

  // INCREASED PARTICLE SIZE for better visibility
  const particleSize = useMemo(() => {
    if (typeof window === "undefined") return 5.0;
    const isMobile = window.innerWidth < 768;
    return isMobile ? 9.0 : 13.0;
  }, []);

  const [cameraZoom, setCameraZoom] = useState(BASE_SETTINGS.cameraZoom);
  useEffect(() => {
    function updateZoom() {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      let scale;
      if (w < 768) {
        scale = Math.min(0.7, Math.max(0.5, w / 1100)); 
      } else {
        scale = Math.min(1.0, Math.max(0.7, w / 1300));
      }
      setCameraZoom(BASE_SETTINGS.cameraZoom * scale);
    }
    
    updateZoom();
    window.addEventListener("resize", updateZoom);
    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  const totalDuration =
    BASE_SETTINGS.formationDuration +
    BASE_SETTINGS.holdDuration +
    BASE_SETTINGS.explosionDuration;

  const explosionStartTime =
    BASE_SETTINGS.formationDuration + BASE_SETTINGS.holdDuration;

  useEffect(() => {
    const explodeTimeout = setTimeout(
      () => setExplode(true),
      explosionStartTime
    );
    const finishTimeout = setTimeout(() => {
      setDone(true);
      onFinish?.();
    }, totalDuration);

    return () => {
      clearTimeout(explodeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish, explosionStartTime, totalDuration]);

  if (done) return null;

  return (
    <div className="preloader-wrapper">
      <style jsx global>{`
        body {
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        
        .preloader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${BASE_SETTINGS.backgroundColor};
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .canvas-shell {
          width: 100vw;
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      <div className="canvas-shell">
        <Canvas 
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            precision: "highp",
            stencil: false,
            depth: true
          }} 
          dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
          frameloop="always"
        >
          <color attach="background" args={[BASE_SETTINGS.backgroundColor]} />
          
          <ambientLight intensity={BASE_SETTINGS.ambientLightIntensity} />
          <pointLight
            position={[6, 6, 8]}
            intensity={BASE_SETTINGS.pointLightIntensity}
            color="#FF0000"
          />
          <pointLight
            position={[-6, -5, 7]}
            intensity={6.0}
            color="#FFFFFF"
          />
          <pointLight
            position={[0, 0, 12]}
            intensity={5.5}
            color="#FFFFFF"
          />
          <pointLight
            position={[0, 7, 6]}
            intensity={4.0}
            color="#FFFFFF"
          />
          <pointLight
            position={[0, -7, 6]}
            intensity={4.0}
            color="#FFFFFF"
          />
          <pointLight
            position={[8, 0, 6]}
            intensity={3.5}
            color="#FF0000"
          />
          
          <OrthographicCamera
            makeDefault
            position={[0, 0, 10]}
            zoom={cameraZoom}
          />
          
          <ParticleText
            text={BASE_SETTINGS.text}
            explode={explode}
            totalPoints={BASE_SETTINGS.totalPoints}
            particleSize={particleSize}
          />
        </Canvas>
      </div>
    </div>
  );
}
