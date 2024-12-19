import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Create the wireframe city
    const cityGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cityMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    for (let i = 0; i < 100; i++) {
      const building = new THREE.Mesh(cityGeometry, cityMaterial);
      building.position.set((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 20);
      building.scale.set(Math.random() * 5, Math.random() * 15, Math.random() * 10);
      building.rotation.x = Math.PI / 90
    ; // Rotate the buildings 90 degrees towards the viewer
      scene.add(building);
    }

    // Add background gradient
    const gradientTexture = new THREE.TextureLoader().load('path/to/gradient.jpg');
    scene.background = gradientTexture;

    // Add blinking lights
    const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    for (let i = 0; i < 50; i++) {
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set((Math.random() - 0.5) * 90, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20);
      scene.add(light);
    }

    // Add moving elements
    const movingGeometry = new THREE.BoxGeometry(1, 1, 1);
    const movingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const movingElements = [];
    for (let i = 0; i < 20; i++) {
      const element = new THREE.Mesh(movingGeometry, movingMaterial);
      element.position.set((Math.random() - 0.5) * 90, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20);
      scene.add(element);
      movingElements.push(element);
    }

    camera.position.z = 30;
    camera.position.y = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Animate moving elements
      movingElements.forEach(element => {
        element.position.x += (Math.random() - 0.9) * 0.1;
        element.position.y += (Math.random() - 0.2) * 0.1;
        element.position.z += (Math.random() - 0.6) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeBackground;
