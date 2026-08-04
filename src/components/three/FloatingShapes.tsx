"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { viewport } from "@/lib/viewport-store";

type ShapeKind = "octahedron" | "torus" | "box" | "tetrahedron" | "capsule";

interface ShapeDef {
  kind: ShapeKind;
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  wireframe?: boolean;
}

/**
 * Geometry orbiting the prism at varying depths.
 *
 * Each shape carries its own drift speed and z-depth; the parent group
 * applies pointer parallax scaled by depth, which is what sells the sense
 * of a real volume rather than a flat backdrop.
 */
const SHAPES: ShapeDef[] = [
  { kind: "octahedron", position: [-5.2, 2.2, -5.5], scale: 0.3, color: "#f97316", speed: 0.5 },
  { kind: "torus", position: [5.6, -1.8, -4.5], scale: 0.26, color: "#3b62d9", speed: 0.38 },
  { kind: "box", position: [4.2, 2.8, -6.5], scale: 0.24, color: "#fba94c", speed: 0.6, wireframe: true },
  { kind: "tetrahedron", position: [-4.4, -2.6, -5], scale: 0.28, color: "#fba94c", speed: 0.44 },
  { kind: "capsule", position: [-6.4, 0.4, -7], scale: 0.22, color: "#3b62d9", speed: 0.3, wireframe: true },
  { kind: "octahedron", position: [6.2, 1.6, -7.5], scale: 0.24, color: "#f97316", speed: 0.52, wireframe: true },
];

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[1, 0.32, 16, 48]} />;
    case "box":
      return <boxGeometry args={[1.3, 1.3, 1.3]} />;
    case "tetrahedron":
      return <tetrahedronGeometry args={[1.2, 0]} />;
    case "capsule":
      return <capsuleGeometry args={[0.55, 1, 6, 14]} />;
    default:
      return <octahedronGeometry args={[1.1, 0]} />;
  }
}

export function FloatingShapes({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  // Random phase offsets keep the shapes from pulsing in unison.
  const offsets = useMemo(
    () => SHAPES.map(() => Math.random() * Math.PI * 2),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    group.current.position.x = viewport.smoothPointer.x * -0.9;
    group.current.position.y = viewport.smoothPointer.y * -0.6;
    // Shapes drift toward the camera as the hero scrolls past.
    group.current.position.z = viewport.heroScroll * 3.2;

    meshes.current.forEach((mesh, index) => {
      if (!mesh) return;
      const shape = SHAPES[index]!;
      mesh.rotation.x += delta * shape.speed * 0.42;
      mesh.rotation.y += delta * shape.speed * 0.3;
      mesh.position.y =
        shape.position[1] +
        Math.sin(state.clock.elapsedTime * shape.speed + offsets[index]!) * 0.28;
    });
  });

  return (
    <group ref={group}>
      {SHAPES.map((shape, index) => (
        <Float
          key={`${shape.kind}-${index}`}
          speed={reducedMotion ? 0 : 1 + shape.speed}
          rotationIntensity={reducedMotion ? 0 : 0.5}
          floatIntensity={reducedMotion ? 0 : 0.6}
        >
          <mesh
            ref={(node) => {
              meshes.current[index] = node;
            }}
            position={shape.position}
            scale={shape.scale}
          >
            <ShapeGeometry kind={shape.kind} />
            <meshStandardMaterial
              color={shape.color}
              wireframe={shape.wireframe}
              roughness={shape.wireframe ? 1 : 0.18}
              metalness={shape.wireframe ? 0 : 0.85}
              emissive={shape.color}
              emissiveIntensity={shape.wireframe ? 0.55 : 0.18}
              transparent
              opacity={shape.wireframe ? 0.55 : 0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
