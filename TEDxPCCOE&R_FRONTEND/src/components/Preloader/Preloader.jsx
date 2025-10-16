import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrthographicCamera, shaderMaterial } from "@react-three/drei";
import {
  Color,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
} from "three";

// --- BASE SETTINGS ---
const BASE_SETTINGS = {
  text: "TEDxPCCOE&R",
  totalPoints: 8000,
  cameraZoom: 100,
  formationDuration: 2000,
  holdDuration: 1200,      
  explosionDuration: 2000,  
  backgroundColor: "#000000",
  tedColor: "#FF2B1E",
  pccoerColor: "#FFFFFF",
  ambientLightIntensity: 1.2,
  pointLightIntensity: 2.5,
  explosionStrength: 40,   
};

// --- SHADER MATERIAL (TRAIL EFFECT ADDED) ---
const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uExplode: 0,
    uSize: 1.0,
    // New uniform for previous position to calculate speed
    uPrevPosition: 0, 
  },
  /* Vertex Shader */
  `
    attribute vec3 aTarget;
    attribute vec3 aColor;
    attribute float aDelay;
    attribute float aSpeed; 
    
    varying vec3 vColor;
    varying float vAlpha;
    
    uniform float uTime;
    uniform float uProgress;
    uniform float uExplode;
    uniform float uSize;

    void main() {
      vColor = aColor;
      vec3 initialPos = position;
      vec3 targetPos = aTarget;

      // 1. Staggered progress with Easing
      float adjustedProgress = clamp((uProgress - aDelay) / (1.0 - aDelay), 0.0, 1.0);
      float smoothProgress = adjustedProgress * adjustedProgress * (3.0 - 2.0 * adjustedProgress);

      // 2. Swarm/Jitter Effect (Reduced intensity for better readability)
      float swarmIntensity = 0.025 * (1.0 - uExplode); 
      
      float offsetZ = sin(uTime * 1.0 + aSpeed * 10.0) * aSpeed * swarmIntensity * 0.5;
      float offsetX = cos(uTime * 1.5 + aSpeed * 8.0) * aSpeed * swarmIntensity;
      float offsetY = sin(uTime * 1.2 + aSpeed * 9.0) * aSpeed * swarmIntensity;
      
      vec3 swarmOffset = vec3(offsetX, offsetY, offsetZ);

      // 3. Formation Mix
      vec3 morphedPos = mix(initialPos, targetPos, smoothProgress) + swarmOffset;

      // 4. Explosion Effect (Spatial movement)
      if (uExplode > 0.0) {
        vec3 explosionDir = normalize(targetPos + vec3(0.001, 0.001, 0.001));
        float velocity = aSpeed * aSpeed * 0.5; 
        float explosionStrength = uExplode * uExplode * ${BASE_SETTINGS.explosionStrength.toFixed(1)} * velocity;
        morphedPos += explosionDir * explosionStrength;
      }

      vec4 mvPosition = modelViewMatrix * vec4(morphedPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Dynamic point size: flash dramatically during explosion
      float depth = max(-mvPosition.z, 0.1);
      float sizeMultiplier = mix(1.0, 1.5, smoothProgress) + uExplode * 30.0; 

      // --- TRAIL EFFECT ---
      // Apply a speed factor during the formation (uProgress < 1.0)
      // Velocity is roughly proportional to (1.0 - smoothProgress)
      float speedFactor = (1.0 - smoothProgress) * 5.0; // 5.0 is the stretch magnitude
      
      // Calculate how much to stretch the point in X (or screen direction)
      // Since the stream is mostly Z-axis focused, we'll just boost the size temporarily.
      float trailBoost = smoothstep(0.0, 0.7, 1.0 - smoothProgress) * 4.0; 
      
      sizeMultiplier += trailBoost;

      gl_PointSize = uSize * sizeMultiplier / depth;
      
      // Fade out during explosion with a steeper curve
      vAlpha = 1.0 - pow(uExplode, 3.0); 
    }
  `,
  /* Fragment Shader */
  `
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      // Use gl_PointCoord.y to create a vertical streak/ribbon, giving a slight tail
      float alphaVertical = 1.0 - smoothstep(0.0, 0.5, abs(gl_PointCoord.y - 0.5) * 2.0);
      
      // Gaussian fade (circular glow)
      float alphaCircular = 1.0 - smoothstep(0.0, 0.6, dist);
      
      // Combine circular glow with vertical streak
      float alpha = max(alphaCircular, alphaVertical * 0.5); 
      alpha = pow(alpha, 0.8);
      
      float glow = exp(-dist * 8.0) * 0.6; 
      vec3 finalColor = vColor + vColor * glow;
      
      gl_FragColor = vec4(finalColor, alpha * vAlpha);
    }
  `
);

extend({ ParticleMaterial });

// Helper functions (splitTedx, usePrefersReducedMotion, createTextParticles) remain unchanged
function splitTedx(s) {
  const idx = s.indexOf("x");
  if (idx === -1) return { ted: s.toUpperCase(), x: "", rest: "" };
  return {
    ted: s.slice(0, idx).toUpperCase(),
    x: s.slice(idx, idx + 1),
    rest: s.slice(idx + 1).toUpperCase(),
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
  
  // Dynamic canvas size based on screen
  const width = isMobile ? 800 : 1000;
  const height = isMobile ? 150 : 200;
  
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // Dynamic font sizes that fit within screen bounds
  const fontTED = `900 ${isMobile ? 60 : 80}px Inter, Helvetica, Arial, sans-serif`;
  const fontX = `900 ${isMobile ? 40 : 50}px Inter, Helvetica, Arial, sans-serif`;
  const fontRest = `900 ${isMobile ? 50 : 70}px Inter, Helvetica, Arial, sans-serif`;

  const parts = splitTedx(text);
  const centerX = width / 2;
  const centerY = height / 2;

  // Measure text widths
  ctx.font = fontTED;
  const widthTED = ctx.measureText(parts.ted).width;
  ctx.font = fontX;
  const widthX = ctx.measureText(parts.x).width;
  ctx.font = fontRest;
  const widthRest = ctx.measureText(parts.rest).width;

  // Calculate total pixel width used by the text
  const totalTextPixelWidth = widthTED + widthX + widthRest + (isMobile ? 15 : 25);
  
  // Ensure text doesn't exceed canvas width (this is internal scaling, not world)
  const pixelScaleFactor = Math.min(1, (width * 0.9) / totalTextPixelWidth);
  
  let currentX = centerX - (totalTextPixelWidth * pixelScaleFactor) / 2;

  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // Draw TED in red
  ctx.fillStyle = BASE_SETTINGS.tedColor;
  ctx.font = fontTED;
  const scaledTEDWidth = widthTED * pixelScaleFactor;
  ctx.fillText(parts.ted, currentX, centerY);
  currentX += scaledTEDWidth + (isMobile ? 5 : 8);

  // Draw x in red
  ctx.fillStyle = BASE_SETTINGS.tedColor;
  ctx.font = fontX;
  const scaledXWidth = widthX * pixelScaleFactor;
  ctx.fillText(parts.x, currentX, centerY + (isMobile ? 8 : 12)); 
  currentX += scaledXWidth + (isMobile ? 5 : 8);

  // Draw PCCOE&R in white
  ctx.fillStyle = BASE_SETTINGS.pccoerColor;
  ctx.font = fontRest;
  ctx.fillText(parts.rest, currentX, centerY);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const sampledPoints = [];
  const sampledColors = [];

  const step = isMobile ? 1.8 : 1.5;
  const tedxEnd = centerX - (totalTextPixelWidth * pixelScaleFactor) / 2 + scaledTEDWidth + scaledXWidth + (isMobile ? 10 : 16);
  
  // --- RESPONSIVENESS FIX: Calculate world scale based on viewport ---
  // We want the text to occupy about 80% of the viewport width.
  const targetWorldWidth = viewportWidth * 0.8;
  const actualDrawnTextPixelWidth = totalTextPixelWidth * pixelScaleFactor;
  
  // Calculate the scale factor from drawn pixels to world units
  const worldScale = targetWorldWidth / actualDrawnTextPixelWidth; 
  // Safety factor for height scaling
  const worldScaleY = worldScale * 1.5; 

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alphaIndex = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
      if (imageData[alphaIndex] > 120) {
        
        // Transform pixel coordinates relative to the center (0,0)
        const relativeX = x - centerX;
        const relativeY = centerY - y;
        
        // Scale to dynamic world coordinates
        const worldX = relativeX * worldScale; 
        const worldY = relativeY * worldScale; 
        sampledPoints.push(worldX, worldY, 0);

        // Color based on position
        const isTEDx = x < tedxEnd;
        const color = new Color(
          isTEDx ? BASE_SETTINGS.tedColor : BASE_SETTINGS.pccoerColor
        ).toArray();
        sampledColors.push(...color);
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

  const wideXY = 12; 
  
  for (let i = 0; i < numPoints; i++) {
    const j = i * 3;
    const randomIndex = Math.floor(Math.random() * numSampled);
    const rj = randomIndex * 3;

    // Initial positions: Distributed widely in X/Y and placed far back in Z 
    const deepZ = -(20 + Math.random() * 20); // Z between -20 and -40
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


// --- PARTICLE TEXT COMPONENT ---
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

    // Formation progress with smooth ease-in-out
    const formProgress = Math.min(
      elapsed / (BASE_SETTINGS.formationDuration / 1000),
      1.0
    );
    const easedFormProgress = formProgress < 0.5
      ? 2.0 * formProgress * formProgress
      : 1.0 - Math.pow(-2.0 * formProgress + 2.0, 2.0) / 2.0;
    material.uniforms.uProgress.value = easedFormProgress;

    // Explosion progress
    if (explode) {
      const timeSinceExplosion =
        elapsed -
        (BASE_SETTINGS.formationDuration + BASE_SETTINGS.holdDuration) / 1000;
      const explodeProgress = Math.min(
        Math.max(0, timeSinceExplosion) /
          (BASE_SETTINGS.explosionDuration / 1000),
        1.0
      );
      const easedExplodeProgress = 1.0 - Math.pow(1.0 - explodeProgress, 3);
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


// --- MAIN PRELOADER COMPONENT ---
export default function Preloader({ onFinish }) {
  const [done, setDone] = useState(false);
  const [explode, setExplode] = useState(false);

  const particleSize = useMemo(() => {
    if (typeof window === "undefined") return 2.0;
    const isMobile = window.innerWidth < 768;
    return isMobile ? 3.5 : 5.0; 
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
      
      {/* Embedded Styles for structure and animation */}
      <style jsx global>{`
        /* Apply smooth scrolling and hidden overflow to body when preloader is active */
        body {
          overflow: hidden;
        }
        
        .preloader-wrapper {
          position: fixed;
          inset: 0;
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
            powerPreference: "high-performance"
          }} 
          dpr={[1, 2]}
        >
          <color attach="background" args={[BASE_SETTINGS.backgroundColor]} />
          
          {/* Subtle lighting for better depth perception */}
          <ambientLight intensity={BASE_SETTINGS.ambientLightIntensity} />
          <pointLight
            position={[3, 3, 5]}
            intensity={BASE_SETTINGS.pointLightIntensity}
            color={BASE_SETTINGS.tedColor}
          />
          <pointLight
            position={[-3, -2, 4]}
            intensity={1.5}
            color={BASE_SETTINGS.pccoerColor}
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
