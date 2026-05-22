"use client";

// Interactive 3D hero for the Uniquant landing page.
//
// The NFT artwork is flat 2D line-art, so we don't pretend to sculpt a real
// 3D head. Instead the isolated head (background removed → /nft/UQUANT_1_head
// .png) floats as an alpha billboard inside a genuinely 3D scene: it tilts and
// parallaxes toward the cursor, bobs on an idle float, sits in a drifting
// quantum particle field, and the bright cyan→violet visor blooms. Reads as a
// premium 3D object without the "flat cardboard spinning" tell.

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const HEAD_SRC = "/nft/UQUANT_1_head.png";
const HEAD_ASPECT = 1801 / 1953; // width / height of the isolated PNG

function Head() {
  const tex = useTexture(HEAD_SRC);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const group = useRef<THREE.Group>(null!);
  const H = 3.05;
  const W = H * HEAD_ASPECT;

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    // Limited rotation → parallax tilt, never a full flat spin.
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px * 0.42, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.26, 0.05);
    // Idle float + slight cursor lean.
    g.position.y = Math.sin(t * 0.7) * 0.07;
    g.position.x = THREE.MathUtils.lerp(g.position.x, px * 0.18, 0.05);
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial
          map={tex}
          transparent
          alphaTest={0.04}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function radialTexture(inner: string, outer: string) {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Aura() {
  const tex = useMemo(
    () => radialTexture("rgba(124,92,255,0.24)", "rgba(124,92,255,0)"),
    []
  );
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(4.4 + Math.sin(t * 0.9) * 0.18);
    ref.current.position.x = state.pointer.x * 0.25;
    ref.current.position.y = state.pointer.y * 0.2;
  });
  return (
    <mesh ref={ref} position={[0, 0.1, -1.3]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        map={tex}
        transparent
        blending={THREE.NormalBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 11;
      a[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      a[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.2;
    }
    return a;
  }, [count]);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.position.x = state.pointer.x * 0.35;
    ref.current.position.y = state.pointer.y * 0.22;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7c5cff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function AgentScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#f4f2fc"]} />
      <Suspense fallback={null}>
        <Aura />
        <Particles />
        <Head />
      </Suspense>
    </Canvas>
  );
}
