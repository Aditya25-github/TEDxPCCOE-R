import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrthographicCamera, shaderMaterial } from "@react-three/drei";
import {
  Color,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
} from "three";
import styles from "./Preloader.module.css";

// ------------------------------------------------------------
// BASE SETTINGS
// ------------------------------------------------------------
const BASE_SETTINGS = {
  text: "TEDxPCCOE&R",
  totalPoints: 12000,
  cameraZoom: 120,
  formationDuration: 2000,
  holdDuration: 1800,
  explosionDuration: 2000,
  backgroundColor: "#000000",
  tedColor: "#FF2B1E",
  xAndRestColor: "#FFFFFF",
  ambientLightIntensity: 2.0,
  pointLightIntensity: 3.0,
  pointLightColor: "#FFFFFF",
  redLightIntensity: 4.0,
  redLightColor: "#FF2B1E",
  explosionStrength: 35,
};

// ------------------------------------------------------------
// CUSTOM SHADER MATERIAL
// ------------------------------------------------------------
const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uExplode: 0,
    uSize: 1.0,
  },
  // Vertex Shader
  `
    attribute vec3 aTarget;
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform float uTime;
    uniform float uProgress;
    uniform float uExplode;
    uniform float uSize;

    float hash(vec3 p){
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    void main() {
      vColor = aColor;
      vec3 initialPos = position;
      vec3 targetPos = aTarget;

      float smoothProgress = smoothstep(0.0, 1.0, uProgress);
      vec3 morphedPos = mix(initialPos, targetPos, smoothProgress);

      float jitter = (hash(targetPos + uTime * 0.05) - 0.5) * 0.03 * uProgress;
      morphedPos += normalize(targetPos + vec3(0.0001)) * jitter;

      vec3 explosionDir = normalize(targetPos + vec3(0.001));
      float explosionStrength = uExplode * ${BASE_SETTINGS.explosionStrength.toFixed(
        1
      )};
      vec3 explodedPos = morphedPos + explosionDir * explosionStrength;
      vec3 finalPos = mix(morphedPos, explodedPos, uExplode);

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      float depth = max(-mvPosition.z, 0.1);
      gl_PointSize = uSize * (1.0 + uExplode * 8.0) / depth;
    }
  `,
  // Fragment Shader
  `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      float alpha = 1.0 - smoothstep(0.0, 0.6, d);
      vec3 bright = vColor * 1.25;
      gl_FragColor = vec4(bright, alpha);
    }
  `
);

extend({ ParticleMaterial });

// ------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------
export default function Preloader({ onFinish }) {
  const [done, setDone] = useState(false);
  const [explode, setExplode] = useState(false);

  const particleSize = useMemo(() => {
    if (typeof window === "undefined") return 2.0;
    return 3.0 * Math.min(window.devicePixelRatio || 1, 2);
  }, []);

  const [cameraZoom, setCameraZoom] = useState(BASE_SETTINGS.cameraZoom);
  useEffect(() => {
    function updateZoom() {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const scale = Math.max(0.7, Math.min(1.2, w / 1400));
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
    <div className={styles.preloaderWrapper} role="status" aria-live="polite">
      <div className={styles.canvasShell}>
        <Canvas gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <color attach="background" args={[BASE_SETTINGS.backgroundColor]} />
          <ambientLight intensity={BASE_SETTINGS.ambientLightIntensity} />
          <pointLight
            position={[4, 4, 6]}
            intensity={BASE_SETTINGS.pointLightIntensity}
            color={BASE_SETTINGS.pointLightColor}
          />
          <pointLight
            position={[-6, -3, 3]}
            intensity={BASE_SETTINGS.redLightIntensity}
            color={BASE_SETTINGS.redLightColor}
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

      <div className={styles.topPulse} aria-hidden="true">
        <div
          className={`${styles.pulseFill} ${explode ? styles.pulseExit : ""}`}
          style={{ animationDuration: `${explosionStartTime}ms` }}
        />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// PARTICLE TEXT COMPONENT
// ------------------------------------------------------------
function ParticleText({ text, explode, totalPoints, particleSize }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const clockStart = useRef(performance.now());
  const prefersReducedMotion = usePrefersReducedMotion();

  const { positions, targets, colors } = useMemo(
    () => createTextParticles(text, totalPoints),
    [text, totalPoints]
  );

  const geom = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("aTarget", new BufferAttribute(targets, 3));
    g.setAttribute("aColor", new BufferAttribute(colors, 3));
    return g;
  }, [positions, targets, colors]);

  useEffect(() => {
    const m = materialRef.current;
    if (!m) return;
    m.uSize = particleSize;
    if (m.uniforms) {
      m.uniforms.uSize.value = particleSize;
      m.uniforms.uProgress.value = 0;
      m.uniforms.uExplode.value = 0;
    }
  }, [particleSize]);

  useFrame(() => {
    const material = materialRef.current;
    if (!material) return;
    const elapsed = (performance.now() - clockStart.current) / 1000;

    material.uniforms?.uTime && (material.uniforms.uTime.value = elapsed);

    if (prefersReducedMotion) {
      material.uniforms.uProgress.value = 1;
      material.uniforms.uExplode.value = 0;
      return;
    }

    const formProgress = Math.min(
      elapsed / (BASE_SETTINGS.formationDuration / 1000),
      1.0
    );
    const easedFormProgress = 1.0 - Math.pow(1.0 - formProgress, 2);
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
      const easedExplodeProgress = Math.pow(explodeProgress, 1.5);
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

// ------------------------------------------------------------
// UTILITIES
// ------------------------------------------------------------
function createTextParticles(text, totalPoints) {
  const width = 1400;
  const height = 300;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const fontTED = "900 220px Helvetica, Arial, sans-serif";
  const fontX = "900 130px Helvetica, Arial, sans-serif";
  const fontRest = "900 200px Helvetica, Arial, sans-serif";

  const parts = splitTedx(text);
  const centerX = width / 2;
  const centerY = height / 2;

  ctx.font = fontTED;
  const widthTED = ctx.measureText(parts.ted).width;
  ctx.font = fontX;
  const widthX = ctx.measureText(parts.x).width;
  ctx.font = fontRest;
  const widthRest = ctx.measureText(parts.rest).width;

  const totalWidth = widthTED + widthX + widthRest + 40;
  let currentX = centerX - totalWidth / 2;

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = fontTED;
  ctx.fillText(parts.ted, currentX + widthTED / 2, centerY);
  currentX += widthTED + 20;

  ctx.font = fontX;
  ctx.fillText(parts.x, currentX + widthX / 2, centerY + 18);
  currentX += widthX + 20;

  ctx.font = fontRest;
  ctx.fillText(parts.rest, currentX + widthRest / 2, centerY);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const sampledPoints = [];
  const sampledColors = [];

  const step = 1.5;
  const redSpanEnd = centerX - totalWidth / 2 + widthTED;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alphaIndex = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
      if (imageData[alphaIndex] > 120) {
        const worldX = (x / width - 0.5) * 12;
        const worldY = (0.5 - y / height) * 3;
        sampledPoints.push(worldX, worldY, 0);

        const isTED = x < redSpanEnd;
        const color = new Color(
          isTED ? BASE_SETTINGS.tedColor : BASE_SETTINGS.xAndRestColor
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

  for (let i = 0; i < numPoints; i++) {
    const j = i * 3;
    const randomIndex = Math.floor(Math.random() * numSampled);
    const rj = randomIndex * 3;

    const r = Math.random() * 0.08;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[j] = r * Math.sin(phi) * Math.cos(theta);
    positions[j + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[j + 2] = r * Math.cos(phi);

    targets[j] = sampledPoints[rj];
    targets[j + 1] = sampledPoints[rj + 1];
    targets[j + 2] = sampledPoints[rj + 2];

    colors[j] = sampledColors[rj];
    colors[j + 1] = sampledColors[rj + 1];
    colors[j + 2] = sampledColors[rj + 2];
  }

  return { positions, targets, colors, numPoints };
}

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
