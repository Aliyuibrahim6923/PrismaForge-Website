"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  Lightformer,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { PrismCore } from "./PrismCore";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";
import { viewport, startViewportTracking } from "@/lib/viewport-store";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/** Subtle camera drift + scroll dolly, applied outside the render tree. */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const step = Math.min(delta, 0.05) * 1.6;

    // Orbit a little with the pointer, pull back as the hero scrolls out.
    target.current.set(
      viewport.smoothPointer.x * 0.9,
      viewport.smoothPointer.y * 0.55 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1,
      7.5 + viewport.heroScroll * 4.5,
    );

    camera.position.lerp(target.current, step);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Procedural studio lighting.
 *
 * `<Environment>` with `<Lightformer>` children builds the reflection map
 * in-engine, so the scene needs no HDR download — a real Lighthouse and
 * offline-resilience win versus drei's hosted presets.
 */
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#fff3e4" />
      {/* Two-tone key/fill: navy-blue from below-left, brand orange from
          above-right — the prism picks up both in its refraction. */}
      <pointLight position={[-6, -3, -4]} intensity={26} color="#3b62d9" distance={22} />
      <pointLight position={[6, 3, 2]} intensity={20} color="#f97316" distance={20} />

      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#f97316"
          position={[-4, 2, -6]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2}
          color="#3b62d9"
          position={[4, -2, -6]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="circle"
          intensity={3.2}
          color="#ffffff"
          position={[0, 6, 2]}
          scale={[5, 5, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1.6}
          color="#fba94c"
          position={[0, -5, -3]}
          scale={[6, 6, 1]}
        />
      </Environment>
    </>
  );
}

/**
 * The hero's WebGL layer.
 *
 * Three things keep this cheap despite the transmission shader:
 *  1. `PerformanceMonitor` drops resolution (and then quality tier) if the
 *     frame budget slips, instead of letting the page stutter.
 *  2. An IntersectionObserver sets `frameloop="never"` the moment the hero
 *     leaves the viewport — scrolling to the footer costs zero GPU time.
 *  3. Reduced-motion and low-power devices get a static, cheaper material.
 */
export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [degraded, setDegraded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const { resolvedTheme } = useTheme();

  /** Fog and refraction backdrop follow the active theme. */
  const sceneColor = resolvedTheme === "light" ? "#f4f7fc" : "#050a1a";

  const quality: "high" | "low" =
    isDesktop && !degraded && !prefersReducedMotion ? "high" : "low";

  useEffect(() => startViewportTracking(), []);

  // Only render frames while the canvas is on screen.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        // `never` fully parks the render loop; `always` resumes it.
        frameloop={active ? "always" : "never"}
        dpr={[1, degraded ? 1.25 : 1.9]}
        gl={{
          antialias: !degraded,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 7.5], fov: 42, near: 0.1, far: 60 }}
        // The canvas is decoration; content beneath it carries the meaning.
        aria-hidden
        style={{ pointerEvents: "none" }}
      >
        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          flipflops={2}
          onFallback={() => setDegraded(true)}
        >
          {/* No `<color attach="background">`: an opaque scene background
              would paint a dark rectangle over the hero in light mode.
              The canvas stays transparent and the page's own gradients
              show through; only the fog needs to follow the theme. */}
          <fog attach="fog" args={[sceneColor, 12, 30]} />

          <Lighting />
          <CameraRig reducedMotion={prefersReducedMotion} />

          {/* On desktop the prism sits in the right half so the headline
              keeps the left column to itself; on narrow screens it moves
              up and back, behind the copy. */}
          <group
            position={isDesktop ? [2.7, 0.15, 0] : [0.6, 2.6, -4.5]}
            scale={isDesktop ? 0.85 : 0.5}
          >
            <PrismCore
              quality={quality}
              reducedMotion={prefersReducedMotion}
              sceneColor={sceneColor}
            />
          </group>

          <FloatingShapes reducedMotion={prefersReducedMotion} />
          <ParticleField
            count={isDesktop ? 900 : 380}
            reducedMotion={prefersReducedMotion}
          />

          {/* No `<Preload all />`: the scene is entirely procedural, so
              there is nothing to warm, and it forces a full compile pass
              of every material up front. */}
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
