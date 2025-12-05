"use client";

import React, {
  forwardRef,
  useMemo,
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber";
import { Color, Mesh, ShaderMaterial } from "three";
import type { IUniform } from "three";

type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

interface UniformValue<T = number | Color> {
  value: T;
}

interface SilkUniforms {
  uSpeed: UniformValue<number>;
  uScale: UniformValue<number>;
  uNoiseIntensity: UniformValue<number>;
  uColor: UniformValue<Color>;
  uRotation: UniformValue<number>;
  uTime: UniformValue<number>;
  [uniform: string]: IUniform;
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;

  float tOffset    = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);
  return reduced;
}

function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

function useInViewport(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

interface SilkPlaneProps {
  uniforms: SilkUniforms;
  timeMul: number;
  fpsCap: number;
  running: boolean;
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane(
  { uniforms, timeMul, fpsCap, running },
  ref
) {
  const { viewport } = useThree();
  const acc = useRef(0);

  useLayoutEffect(() => {
    const mesh = ref as React.MutableRefObject<Mesh | null>;
    if (mesh.current)
      mesh.current.scale.set(viewport.width, viewport.height, 1);
  }, [ref, viewport]);

  useFrame((_state: RootState, delta: number) => {
    if (!running) return;

    acc.current += delta;
    const step = 1 / fpsCap;
    if (acc.current < step) return;
    acc.current = 0;

    const mesh = ref as React.MutableRefObject<Mesh | null>;
    if (!mesh.current) return;

    const material = mesh.current.material as ShaderMaterial & {
      uniforms: SilkUniforms;
    };
    material.uniforms.uTime.value += timeMul * delta;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;

  // ✅ تحكم مباشر لتقليل حركة الديسكتوب
  desktopMotion?: "low" | "medium" | "high";
}

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
  desktopMotion = "low",
}) => {
  const meshRef = useRef<Mesh>(null);

  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const { ref: wrapRef, inView } = useInViewport(0.05);

  const running = pageVisible && inView && !reduced;

  const tuned = useMemo(() => {
    if (reduced) {
      return { dpr: 1, fpsCap: 12, timeMul: 0.0, speed: 0, scale, noise: 0.6 };
    }

    if (isMobile) {
      return {
        dpr: 1,
        fpsCap: 24,
        timeMul: 0.55,
        speed: speed * 0.7,
        scale: scale * 0.95,
        noise: Math.min(noiseIntensity, 1.0),
      };
    }

    // ✅ Desktop motion control
    const desktop = {
      low: {
        fpsCap: 30,
        timeMul: 0.28,
        speedMul: 0.55,
        noise: Math.min(noiseIntensity, 1.0),
        dpr: 1.5,
      },
      medium: {
        fpsCap: 45,
        timeMul: 0.42,
        speedMul: 0.7,
        noise: noiseIntensity,
        dpr: 2,
      },
      high: {
        fpsCap: 60,
        timeMul: 0.65,
        speedMul: 1.0,
        noise: noiseIntensity,
        dpr: 2,
      },
    }[desktopMotion];

    return {
      dpr: desktop.dpr,
      fpsCap: desktop.fpsCap,
      timeMul: desktop.timeMul,
      speed: speed * desktop.speedMul,
      scale,
      noise: desktop.noise,
    };
  }, [reduced, isMobile, speed, scale, noiseIntensity, desktopMotion]);

  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uSpeed: { value: tuned.speed },
      uScale: { value: tuned.scale },
      uNoiseIntensity: { value: tuned.noise },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [tuned.speed, tuned.scale, tuned.noise, color, rotation]
  );

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={tuned.dpr}
        frameloop="always"
        gl={{
          alpha: false,
          powerPreference: "high-performance",
          antialias: false, // ✅ أخف خصوصًا لو خلفية
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "#000",
          zIndex: 0,
        }}
      >
        <SilkPlane
          ref={meshRef}
          uniforms={uniforms}
          timeMul={running ? tuned.timeMul : 0}
          fpsCap={tuned.fpsCap}
          running={running}
        />
      </Canvas>
    </div>
  );
};

export default Silk;
