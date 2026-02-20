"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function HeroWebGL() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [lowPerf, setLowPerf] = useState(true);
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallViewport = window.innerWidth < 900;

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const lowDevice = cores <= 4 || memory <= 4;

    if (reduceMotion || smallViewport || isLight) {
      setEnabled(false);
      return;
    }

    setLowPerf(lowDevice);
    setEnabled(true);
  }, [isLight]);

  useEffect(() => {
    if (!enabled || !mountRef.current) return;

    const host = mountRef.current;
    const width = host.clientWidth;
    const height = host.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPerf,
      powerPreference: lowPerf ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPerf ? 1.1 : 1.4));
    renderer.setSize(width, height);
    renderer.setClearAlpha(0);
    host.appendChild(renderer.domElement);

    const cols = 42;
    const rows = 18;
    const basePositions: number[] = [];
    const positions = new Float32Array(cols * rows * 3);

    let ptr = 0;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const px = (x / (cols - 1) - 0.5) * 7.4;
        const py = (y / (rows - 1) - 0.5) * 3.1;
        basePositions.push(px, py, 0);
        positions[ptr] = px;
        positions[ptr + 1] = py;
        positions[ptr + 2] = 0;
        ptr += 3;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: "#4FC3F7",
      size: lowPerf ? 0.024 : 0.028,
      transparent: true,
      opacity: 0.33,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(cols * 3);
    const lineMat = new THREE.LineBasicMaterial({ color: "#7DD3FC", transparent: true, opacity: 0.2 });
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (0.5 - event.clientY / window.innerHeight) * 2;
    };

    const onResize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const positionAttr = geo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < basePositions.length; i += 3) {
        const bx = basePositions[i];
        const by = basePositions[i + 1];
        const wave = Math.sin(bx * 1.15 + t * 1.35) * 0.08 + Math.cos(by * 1.9 + t * 1.1) * 0.05;
        positionAttr.array[i + 2] = wave;
      }
      positionAttr.needsUpdate = true;

      const lineAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let x = 0; x < cols; x += 1) {
        const px = (x / (cols - 1) - 0.5) * 7.4;
        const py = Math.sin(px * 1.05 + t * 1.15) * 0.22;
        const idx = x * 3;
        lineAttr.array[idx] = px;
        lineAttr.array[idx + 1] = py;
        lineAttr.array[idx + 2] = -0.35;
      }
      lineAttr.needsUpdate = true;

      camera.position.x += (mouse.x * 0.18 - camera.position.x) * 0.045;
      camera.position.y += (mouse.y * 0.1 - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [enabled, lowPerf]);

  if (!enabled) return null;

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 hidden opacity-35 md:block"
      aria-hidden
    />
  );
}
