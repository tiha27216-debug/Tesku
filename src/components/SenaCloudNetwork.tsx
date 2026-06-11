'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const nodes = [
  { label: 'SenaCloud', position: [0, 0, 0], size: 1.5, color: '#6366f1' },
  { label: 'Storage', position: [3, 2, 0], size: 0.8, color: '#0ea5e9' },
  { label: 'API', position: [-3, 2, 0], size: 0.8, color: '#10b981' },
  { label: 'Bot', position: [3, -2, 0], size: 0.8, color: '#f59e0b' },
  { label: 'Deploy', position: [-3, -2, 0], size: 0.8, color: '#ef4444' },
  { label: 'AI', position: [0, 3, 1.5], size: 0.8, color: '#a855f7' },
  { label: 'Database', position: [0, -3, 1.5], size: 0.8, color: '#ec4899' },
  { label: 'Server', position: [2, 0, 2.5], size: 0.8, color: '#06b6d4' },
];

export function SenaCloudNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 8 : 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create nodes
    nodes.forEach((node) => {
      const geometry = new THREE.SphereGeometry(node.size, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...(node.position as [number, number, number]));
      scene.add(mesh);
      spheresRef.current.push(mesh);
    });

    // Create connecting lines
    const centerPos = nodes[0].position;
    nodes.slice(1).forEach((node) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        centerPos[0], centerPos[1], centerPos[2],
        node.position[0], node.position[1], node.position[2],
      ]);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      linesRef.current.push(line);
    });

    // Lighting
    const light1 = new THREE.PointLight(0x6366f1, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x0ea5e9, 0.5, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate scene based on mouse
      scene.rotation.x = mouseY * 0.3;
      scene.rotation.y = mouseX * 0.3;

      // Animate spheres
      spheresRef.current.forEach((sphere, index) => {
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.003;
        sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [isMobile]);

  return <div ref={containerRef} className="w-full h-full" />;
}
