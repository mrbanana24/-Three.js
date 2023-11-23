import React, { useEffect } from 'react';
import * as THREE from 'three';

function App() {
  const renderer = new THREE.WebGLRenderer();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  useEffect(() => {
    // Configurar el tamaño del renderizador
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Adjuntar el renderizador al DOM
    document.body.appendChild(renderer.domElement);

    // Configurar la cámara
    camera.position.set(0, 20, 0);
    camera.lookAt(0, 0, 0);

    // Luz de un costado
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10, 10, 10);
    scene.add(light);

    // All objects
    const objets = []

    // Create solarSystem, works like a container, or a intermedian node in a tree
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objets.push(solarSystem)

    // Create a planetOrbit
    const planetOrbit = new THREE.Object3D();
    planetOrbit.position.x = 10;
    objets.push(planetOrbit)

    // Create moonOrbit
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;

    // Crear un sol
    const sunGeometry = new THREE.SphereGeometry(1, 32, 16); // radius, widthSegments, heightSegments
    const sunMaterial = new THREE.MeshPhongMaterial({ color: 0xffdd00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.scale.set(1, 1, 1);
    solarSystem.add(sun); // El sol es hijo del sistema solar
    objets.push(sun)

    // Crear un planeta
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 16); // radius, widthSegments, heightSegments
    const planetMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff });
    const planeta = new THREE.Mesh(planetGeometry, planetMaterial);
    planeta.position.set(3, 0, 0);
    solarSystem.add(planetOrbit);
    planetOrbit.add(planeta);
    objets.push(planeta)

    // Crear la luna
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 16); // radius, widthSegments, heightSegments
    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.x = 2;
    planetOrbit.add(moonOrbit)
    moonOrbit.add(moon)
    objets.push(moon)



    const animate = () => {
      // Rotar todas las esferas
      objets.forEach(element => {
        element.rotation.y += 0.01;
      });

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Limpiar recursos cuando el componente se desmonta
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <></>;
}

export default App;
