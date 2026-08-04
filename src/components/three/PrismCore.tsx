"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { viewport } from "@/lib/viewport-store";
import { lerp } from "@/lib/utils";

interface PrismCoreProps {
  /** Mobile/low-power devices swap the transmission shader for a cheap one. */
  quality: "high" | "low";
  reducedMotion: boolean;
  /** Page background, so refraction resolves against the right surface. */
  sceneColor: string;
}

/**
 * The hero centrepiece: a faceted glass prism that refracts the scene.
 *
 * On capable devices it uses drei's transmission material with chromatic
 * aberration — the real dispersion effect the brand is named for. On low
 * power devices it falls back to a physical material with iridescence,
 * which is visually close at a fraction of the cost (no extra render pass).
 *
 * The mesh tracks the pointer with damped rotation and is dollied and spun
 * by scroll progress read from the viewport store.
 */
export function PrismCore({
  quality,
  reducedMotion,
  sceneColor,
}: PrismCoreProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;

    // Damped pointer follow. Clamping delta keeps the motion frame-rate
    // independent without exploding after a tab regains focus.
    const step = Math.min(delta, 0.05) * 3.4;
    viewport.smoothPointer.x = lerp(
      viewport.smoothPointer.x,
      viewport.pointer.x,
      step,
    );
    viewport.smoothPointer.y = lerp(
      viewport.smoothPointer.y,
      viewport.pointer.y,
      step,
    );

    if (reducedMotion) return;

    const { smoothPointer, heroScroll } = viewport;

    // Pointer parallax
    group.current.rotation.y = smoothPointer.x * 0.5;
    group.current.rotation.x = -smoothPointer.y * 0.32;
    group.current.position.x = smoothPointer.x * 0.35;
    group.current.position.y = smoothPointer.y * 0.22;

    // Scroll-driven transformation: the prism sinks, spins and shrinks
    // as the hero scrolls away, handing the stage to the content.
    mesh.current.rotation.y += delta * 0.24;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.06 + heroScroll * 1.8;
    mesh.current.position.y = -heroScroll * 2.2;
    const scale = 1 - heroScroll * 0.35;
    mesh.current.scale.setScalar(Math.max(0.2, scale));

    if (ring.current) {
      ring.current.rotation.z -= delta * 0.16;
      ring.current.rotation.x = 1.35 + smoothPointer.y * 0.2;
      ring.current.scale.setScalar(Math.max(0.2, scale * 1.02));
      ring.current.position.y = -heroScroll * 2.2;
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.35}
        floatIntensity={reducedMotion ? 0 : 0.7}
        floatingRange={[-0.18, 0.18]}
      >
        <mesh ref={mesh} castShadow>
          {/* A 0-detail icosahedron gives 20 clean facets — enough to
              refract distinctly without reading as a sphere. */}
          <icosahedronGeometry args={[1.55, 0]} />

          {quality === "high" ? (
            <MeshTransmissionMaterial
              samples={6}
              resolution={512}
              transmission={1}
              roughness={0.06}
              thickness={1.9}
              ior={1.62}
              chromaticAberration={0.42}
              anisotropicBlur={0.28}
              distortion={0.28}
              distortionScale={0.4}
              temporalDistortion={0.12}
              clearcoat={1}
              attenuationDistance={2.6}
              attenuationColor="#ffd9b0"
              color="#ffffff"
              background={new THREE.Color(sceneColor)}
            />
          ) : (
            <meshPhysicalMaterial
              color="#f9a03c"
              roughness={0.12}
              metalness={0.25}
              clearcoat={1}
              clearcoatRoughness={0.1}
              iridescence={1}
              iridescenceIOR={1.5}
              iridescenceThicknessRange={[100, 900]}
              transparent
              opacity={0.92}
            />
          )}
        </mesh>

        {/* Halo ring — a thin torus that reads as an orbit line */}
        <mesh ref={ring} rotation={[1.35, 0, 0]}>
          <torusGeometry args={[2.55, 0.008, 8, 160]} />
          <meshBasicMaterial
            color="#f97316"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Float>
    </group>
  );
}
