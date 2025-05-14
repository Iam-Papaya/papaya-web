<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three-stdlib';
  import { GLTFLoader } from 'three-stdlib';
  import { DRACOLoader } from 'three-stdlib';
  import type { GLTF } from 'three-stdlib';
  import { partSelections, type PartKey } from '$lib/stores/partSelections';

  let container: HTMLDivElement;

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let loader: GLTFLoader;

  // Contenedores por parte para facilitar reemplazo
  const partGroups: Record<PartKey, THREE.Group> = {
    HEAD: new THREE.Group(),
    HEAD_TOP: new THREE.Group(),
    TORSO: new THREE.Group(),
    ARM_L: new THREE.Group(),
    ARM_R: new THREE.Group(),
    LEG_L: new THREE.Group(),
    LEG_R: new THREE.Group(),
    PANTS: new THREE.Group()
  };

  const defaultSelections: Record<PartKey, string> = {
    HEAD: 'base',
    HEAD_TOP: 'base',
    TORSO: 'base',
    ARM_L: 'base',
    ARM_R: 'base',
    LEG_L: 'base',
    LEG_R: 'base',
    PANTS: 'base'
  };

  function loadModel(part: PartKey, modelName: string) {
    const path = `/models/${part}/${modelName}.glb`;

    // Vaciar el contenedor del modelo anterior
    const group = partGroups[part];
    group.clear();

    loader.load(
      path,
      (gltf: GLTF) => {
        const model = gltf.scene;
        group.add(model);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = 0.5;
            child.material.roughness = 0.2;
          }
        });
      },
      undefined,
      (error) => {
        console.error(`Error loading model ${path}:`, error);
      }
    );
  }

  function loadAllDefaults() {
    for (const part in defaultSelections) {
      loadModel(part as PartKey, defaultSelections[part as PartKey]);
    }
  }

  onMount(() => {
    // Configuración básica de escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 5000);
    camera.position.set(90, 110, 185);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Luces
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2.2);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(100, 100, 100);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 75, 0);
    controls.update();

    // Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Añadir contenedores de cada parte a la escena
    for (const group of Object.values(partGroups)) {
      scene.add(group);
    }

    // Cargar modelos por defecto
    loadAllDefaults();

    // Escuchar cambios en selección
    partSelections.subscribe((newSelections) => {
      for (const part in newSelections) {
        const key = part as PartKey;
        const selectedName = newSelections[key];
        loadModel(key, selectedName);
      }
    });

    animate();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
</script>

<div bind:this={container} class="w-full h-full"></div>

<style>
  div {
    width: 70%;
    height: 65vh;
    overflow: hidden;
    position: relative;
    display: flex;
    margin: auto;
  }

  @media (max-width: 1200px) {
    div {
      width: 100%;
      height: 70vh;
    }
  }
</style>
