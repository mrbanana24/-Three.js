import React, { useEffect } from 'react';
import * as THREE from 'three';

function App() {
  useEffect(() => {
    // Config basicas
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Config camera
    camera.position.set( 0, 0, 10);
    camera.lookAt( 0, 0, 0 );
    const renderer = new THREE.WebGLRenderer();
    // set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const geometry = new THREE.BoxGeometry(1, 1, 1); // Width, Height, Depth

    const makeCubo = (geometry, color, x) => {
      const material = new THREE.MeshBasicMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = x;
      scene.add(cube);

      return cube;
    }

    const cubes = [
      makeCubo(geometry, 0x44aa88, -4),
      makeCubo(geometry, 0x8844aa, -0),
      makeCubo(geometry, 0xaa8844, 4),
    ]

    const render = (time) => {
      time = time * 0.001;  // convert time to seconds
      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
     });
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);



    // Limpiar recursos cuando el componente se desmonta
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []); // La dependencia vacía asegura que el efecto solo se ejecute una vez al montar el componente

}

export default App;
