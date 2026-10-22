"use client";

import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Mesh, PerspectiveCamera } from "three";

/** Outer radius of the torus knot — used to frame the camera. */
const OBJECT_RADIUS = 1.45;

/** Nothing ever changes, so the subscription is a no-op. */
const subscribeToNothing = () => () => {};

/**
 * True once the component has hydrated on the client.
 * The WebGL context is only ever created in the browser.
 */
function useHydrated() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

/**
 * Keeps the knot inside the frame on every aspect ratio.
 * The camera dollies back on narrow (portrait) viewports instead of cropping.
 */
function ResponsiveFraming() {
  const { camera, size } = useThree();

  useEffect(() => {
    const perspective = camera as PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);
    const halfFov = (perspective.fov * Math.PI) / 360;
    const distance =
      (OBJECT_RADIUS / (Math.tan(halfFov) * Math.min(1, aspect))) * 1.15;

    perspective.position.set(0, 0, distance);
    perspective.lookAt(0, 0, 0);
    perspective.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

/** The single procedural object: a slowly rotating glass torus knot. */
function TorusKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.rotation.x += delta * 0.12;
    mesh.rotation.y += delta * 0.18;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.36, 256, 24, 2, 3]} />
      <MeshTransmissionMaterial
        samples={4}
        resolution={192}
        backside
        thickness={1}
        roughness={0.2}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.3}
        anisotropicBlur={0.4}
        color="#ffffff"
        attenuationColor="#c9ced6"
        attenuationDistance={2.4}
      />
    </mesh>
  );
}

/**
 * The HDRI is fetched from a CDN at runtime. If that fails the hero must
 * degrade to the lights below instead of taking the page down with it.
 */
class EnvironmentBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroCanvas() {
  const hydrated = useHydrated();
  const hostRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  // The transmission material is expensive. Once the hero scrolls away the
  // render loop is stopped entirely so it stops burning frames and battery.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries[0]?.isIntersecting ?? true),
      { rootMargin: "120px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  if (!hydrated) return null;

  return (
    <div ref={hostRef} className="h-full w-full">
      <Canvas
        frameloop={onScreen ? "always" : "never"}
        camera={{ position: [0, 0, 4], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <ResponsiveFraming />

          {/* Fallback + accent lighting (the HDRI does the heavy lifting) */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} />
          <pointLight position={[-4, -2, 3]} intensity={14} distance={20} />

          <EnvironmentBoundary>
            <Suspense fallback={null}>
              <Environment preset="city" />
            </Suspense>
          </EnvironmentBoundary>

          <Float
            speed={1.1}
            rotationIntensity={0.25}
            floatIntensity={1.6}
            floatingRange={[-0.4, 0.4]}
          >
            <TorusKnot />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
