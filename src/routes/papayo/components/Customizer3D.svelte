<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three-stdlib';
  import { GLTFLoader } from 'three-stdlib';
  import type { GLTF } from 'three-stdlib';

  import { partSelections, type PartKey } from '$lib/stores/partSelections';

  let currentParts: Record<PartKey, THREE.Group | null> = {
    HEAD: null,
    HEAD_TOP: null,
    TORSO: null,
    ARM_L: null,
    ARM_R: null,
    LEG_L: null,
    LEG_R: null,
    PANTS: null
  };

  partSelections.subscribe(async (selections) => {
    console.log('[MODEL_LOADER] partSelections subscription triggered:', selections);
    for (const part in selections) {
      const key = part as PartKey;
      const newPath = `/models/${key}/${selections[key]}.glb`;
      console.log(`[MODEL_LOADER] Attempting to load part '${key}' from path:`, newPath);

      const oldPart = currentParts[key];
      if (oldPart) {
        console.log(`[MODEL_LOADER] Removing old part '${key}' from scene.`);
        scene.remove(oldPart);
      }

      try {
        const newGLB = await loadGLBPart(newPath);
        scene.add(newGLB);
        currentParts[key] = newGLB;
        console.log(`[MODEL_LOADER] Loaded and added new part '${key}' to scene.`);

        newGLB.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.metalness = 0.5;
            child.material.roughness = 0;
          }
        });
      } catch (error) {
        console.error(`[MODEL_LOADER] Error loading part '${key}':`, error);
      }
    }
  });

  let container: HTMLDivElement;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let loader: GLTFLoader = new GLTFLoader(); // Asegúrate de que esté inicializado aquí

  interface PartPaths {
    HEAD: string;
    HEAD_TOP: string;
    TORSO: string;
    ARM_L: string;
    ARM_R: string;
    LEG_L: string;
    LEG_R: string;
    PANTS: string;
  }

  const partPaths: PartPaths = {
    HEAD: '/models/HEAD/base.glb',
    HEAD_TOP: '/models/HEAD_TOP/base.glb',
    TORSO: '/models/TORSO/base.glb',
    ARM_L: '/models/ARM_L/base.glb',
    ARM_R: '/models/ARM_R/base.glb',
    LEG_L: '/models/LEG_L/base.glb',
    LEG_R: '/models/LEG_R/base.glb',
    PANTS: '/models/PANTS/base.glb'
  };

  function loadGLBPart(path: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf: GLTF) => resolve(gltf.scene),
        undefined,
        error => {
          console.error('[MODEL_LOADER] loadGLBPart error:', path, error);
          reject(error);
        }
      );
    });
  }

  async function loadDefaultModel() {
    for (const part of Object.keys(partPaths) as (keyof PartPaths)[]) {
      const glb = await loadGLBPart(partPaths[part]);
      scene.add(glb);
      currentParts[part] = glb; // Asegúrate de actualizar currentParts también aquí
      glb.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.metalness = 0.5;
          child.material.roughness = 0.1;
          child.material.envMapIntensity = 2;
        }
      });
    }
  }

  onMount(async () => {
    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff);

    // Cámara
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 5000);
    camera.position.set(90, 110, 185);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // @ts-ignore
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
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
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.target.set(0, 75, 0);
        // Establecer límites de zoom
        controls.minDistance = 100; // Distancia mínima a la que puede acercarse la cámara
    controls.maxDistance = 300;

    await loadDefaultModel();

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
    overflow: hidden;
    position: relative;
    display: flex;
    margin: auto;
  }  }
</style>