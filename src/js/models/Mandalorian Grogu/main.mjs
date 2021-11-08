import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ModifierStack, Cloth } from "three.modifiers";

import * as CONSTS from "../../constants.mjs";
import * as MODEL_CONSTS from "./constants.mjs";
import * as HELPERSMODELS from "../../helpers/helpersModels.mjs";
import { AmbientLight } from "three";

export const name = `${MODEL_CONSTS.gltfFolderName}`;

let requestId = null;

export function run() {
  // Animating objects

  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 100000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-130, 50, 150);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("0xffffff");

  const axesHelper = new THREE.AxesHelper(100);
  axesHelper.visible = true;
  scene.add(axesHelper);

  {
    const light = new THREE.AmbientLight({ color: "0xffffff" }, 1);
    scene.add(light);
  }

  {
    const gltfLoader = new GLTFLoader();
    const url = `${CONSTS.resourcesRelativePath}/${CONSTS.modelsFolder}/${MODEL_CONSTS.gltfFolderName}/${MODEL_CONSTS.gltfFileName}${CONSTS.gltfFormat}`;
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      root.position.set(0, 0, 0);
      root.scale.set(10, 10, 10);

      scene.add(root);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render(time) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestId = requestAnimationFrame(render);
  }

  requestId = requestAnimationFrame(render);
}

export function stopRequestAnimationFrame() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }
}

export function getInfo() {
  return MODEL_CONSTS.info;
}
