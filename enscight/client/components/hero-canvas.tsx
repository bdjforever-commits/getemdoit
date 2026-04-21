"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x7f00ff,
      emissive: 0x26003d,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const key = new THREE.PointLight(0xd4af37, 1.4, 30);
    key.position.set(4, 3, 6);
    const fill = new THREE.PointLight(0x7f00ff, 1, 30);
    fill.position.set(-5, -3, 5);
    scene.add(ambient, key, fill);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xe5e4e2,
      size: 0.02,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.004;
      orb.rotation.x = frame * 0.6;
      orb.rotation.y = frame;
      particles.rotation.y = frame * 0.2;
      particles.rotation.x = frame * 0.08;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80"
      aria-hidden
    />
  );
}
