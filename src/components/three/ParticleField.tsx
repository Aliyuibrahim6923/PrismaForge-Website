"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { viewport } from "@/lib/viewport-store";

/**
 * Additive point cloud forming the scene's depth.
 *
 * Positions and per-point colours are generated once into typed arrays and
 * uploaded as static buffer attributes — the whole field is one draw call,
 * animated purely by rotating the parent group.
 */
export function ParticleField({
  count = 900,
  radius = 14,
  reducedMotion = false,
}: {
  count?: number;
  radius?: number;
  reducedMotion?: boolean;
}) {
  const points = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);

    // Brand palette sampled per particle: orange leads, navy-blue supports.
    const palette = [
      new THREE.Color("#f97316"),
      new THREE.Color("#fba94c"),
      new THREE.Color("#3b62d9"),
      new THREE.Color("#7b93e8"),
    ];

    for (let i = 0; i < count; i += 1) {
      // Distribute on a spherical shell with cubic-root bias so the cloud
      // reads as volumetric rather than hollow.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const distance = radius * (0.35 + 0.65 * Math.cbrt(Math.random()));

      positionArray[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
      positionArray[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta) * 0.6;
      positionArray[i * 3 + 2] = distance * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)]!;
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;

      sizeArray[i] = Math.random() * 0.06 + 0.015;
    }

    return [positionArray, colorArray, sizeArray];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y += delta * 0.028;
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.08) * 0.12 +
      viewport.smoothPointer.y * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
