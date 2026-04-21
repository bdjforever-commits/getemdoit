"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050505");

    const camera = new THREE.PerspectiveCamera(
      52,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const particleCount = 1600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const seeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const baseX = (Math.random() - 0.5) * 28;
      const baseY = (Math.random() - 0.5) * 16;
      const baseZ = (Math.random() - 0.5) * 10;
      positions[i3] = baseX;
      positions[i3 + 1] = baseY;
      positions[i3 + 2] = baseZ;
      seeds[i3] = baseX;
      seeds[i3 + 1] = baseY;
      seeds[i3 + 2] = baseZ;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#E5E4E2"),
      size: 0.05,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = new THREE.Vector2(0, 0);
    const attractor = new THREE.Vector3(0, 0, 0);
    const clock = new THREE.Clock();
    let frameId = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      pointer.x = (clientX / width) * 2 - 1;
      pointer.y = -(clientY / height) * 2 + 1;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      updatePointer(event.touches[0].clientX, event.touches[0].clientY);
    };

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const projectionDepth = 7;
      attractor.set(pointer.x * projectionDepth, pointer.y * projectionDepth * 0.65, 0);

      const positionAttribute = geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        const ox = seeds[i3];
        const oy = seeds[i3 + 1];
        const oz = seeds[i3 + 2];

        const driftX = Math.sin(elapsed * 0.28 + i * 0.013) * 0.35;
        const driftY = Math.cos(elapsed * 0.31 + i * 0.009) * 0.32;

        const tx = ox + driftX;
        const ty = oy + driftY;
        const tz = oz + Math.sin(elapsed * 0.23 + i * 0.01) * 0.3;

        const dx = attractor.x - tx;
        const dy = attractor.y - ty;
        const distSq = dx * dx + dy * dy + 8;
        const influence = Math.min(0.9, 18 / distSq);

        positions[i3] += ((tx + dx * influence * 0.08) - positions[i3]) * 0.045;
        positions[i3 + 1] += ((ty + dy * influence * 0.08) - positions[i3 + 1]) * 0.045;
        positions[i3 + 2] += (tz - positions[i3 + 2]) * 0.03;
      }

      positionAttribute.needsUpdate = true;
      points.rotation.z = Math.sin(elapsed * 0.09) * 0.06;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" aria-hidden />;
}
