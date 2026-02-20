"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function GlobalStarfield() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncMode = () => setIsLight(root.classList.contains("light"));
    syncMode();

    const observer = new MutationObserver(syncMode);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isLight) return;
    if (!mountRef.current) return;

    const host = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 120);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    host.appendChild(renderer.domElement);

    const starCount = 2400;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 26;
      positions[i3 + 2] = -Math.random() * 34;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({
      color: "#D6F1FF",
      size: 0.052,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const shootGeo = new THREE.PlaneGeometry(0.9, 0.02);
    const shooters: THREE.Mesh[] = [];
    const shooterState: Array<{
      nextStart: number;
      start: number;
      duration: number;
      fromX: number;
      fromY: number;
      dx: number;
      dy: number;
    }> = [];

    for (let i = 0; i < 5; i += 1) {
      const mat = new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(shootGeo, mat);
      mesh.rotation.z = -0.35;
      mesh.position.set(-12 - i * 4, 6 - i * 2.5, -6);
      scene.add(mesh);
      shooters.push(mesh);

      shooterState.push({
        nextStart: 1.8 + Math.random() * 4 + i * 1.1,
        start: -1,
        duration: 1.7,
        fromX: -10,
        fromY: 7,
        dx: 22,
        dy: -6.8,
      });
    }

    const twinkle = new Float32Array(starCount);
    for (let i = 0; i < starCount; i += 1) twinkle[i] = Math.random() * Math.PI * 2;

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      stars.rotation.y = Math.sin(t * 0.06) * 0.06;
      stars.rotation.x = Math.cos(t * 0.04) * 0.03;
      starMat.opacity = 0.74 + Math.sin(t * 0.85) * 0.12;

      const pos = starGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < starCount; i += 1) {
        const i3 = i * 3;
        pos.array[i3 + 1] += Math.sin(t * 0.6 + twinkle[i]) * 0.00085;
      }
      pos.needsUpdate = true;

      shooters.forEach((mesh, idx) => {
        const state = shooterState[idx];
        const material = mesh.material as THREE.MeshBasicMaterial;
        if (t >= state.nextStart && state.start < 0) {
          state.start = t;
          const rightToLeft = Math.random() > 0.5;
          state.duration = 1.55 + Math.random() * 0.75;
          state.fromX = rightToLeft ? 17 + Math.random() * 6 : -17 - Math.random() * 6;
          state.fromY = 8.5 - Math.random() * 5.2;
          state.dx = rightToLeft ? -(22 + Math.random() * 8) : 22 + Math.random() * 8;
          state.dy = -(5 + Math.random() * 4);
          mesh.rotation.z = rightToLeft ? 0.35 : -0.35;
        }

        if (state.start >= 0) {
          const raw = (t - state.start) / state.duration;
          if (raw <= 1.18) {
            // Keep translating during fade-out so the streak does not "pause" at the end.
            mesh.position.x = state.fromX + raw * state.dx;
            mesh.position.y = state.fromY + raw * state.dy;

            if (raw <= 1) {
              material.opacity = Math.sin(raw * Math.PI) * 0.82;
            } else {
              const fade = 1 - (raw - 1) / 0.18;
              material.opacity = Math.max(0, fade) * 0.2;
            }
          } else {
            material.opacity = 0;
            state.start = -1;
            state.nextStart = t + 5 + Math.random() * 9;
          }
        } else {
          material.opacity = 0;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      starGeo.dispose();
      starMat.dispose();
      shootGeo.dispose();
      shooters.forEach((mesh) => (mesh.material as THREE.Material).dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, [isLight]);

  if (isLight) return null;

  return <div ref={mountRef} className="global-starfield fixed inset-0 -z-10 pointer-events-none" aria-hidden />;
}
