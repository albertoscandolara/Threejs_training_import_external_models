import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "dat.gui";
import { ModifierStack, Cloth } from "three.modifiers";

import * as CONSTS from "../../constants.mjs";
import * as MODEL_CONSTS from "./constants.mjs";
import * as HELPERSMODELS from "../../helpers/helpersModels.mjs";

export const name = `${MODEL_CONSTS.gltfFolderName}`;

let requestId = null;

export function run() {
  // Animating objects

  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, precision: "mediump" });
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
  scene.background = new THREE.Color(MODEL_CONSTS.lightBlue);

  {
    const light = new THREE.AmbientLight({ color: "0xffffff" }, 1);
    scene.add(light);
  }

  const axesHelper = new THREE.AxesHelper(1000);
  axesHelper.visible = true;
  scene.add(axesHelper);

  {
    const gltfLoader = new GLTFLoader();
    const url = `${CONSTS.resourcesRelativePath}/${CONSTS.modelsFolder}/${MODEL_CONSTS.gltfFolderName}/${MODEL_CONSTS.gltfFileName}${CONSTS.gltfFormat}`;
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      console.log(HELPERSMODELS.dumpObject(root).join("\n"));

      root.position.set(5, 1790, 405);
      // Set nodes to animate
      // wheel = setMillWheel(root);
      // sea = setSea(root);
      // clothes = setClothes(root);

      scene.add(root);
    });
  }

  // Audio sources
  {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();

    const urlSoundWaves = `${CONSTS.resourcesRelativePath}/${CONSTS.soundsFolder}/${MODEL_CONSTS.wavesSoundFileName}${CONSTS.mp3Format}`;
    audioLoader.load(urlSoundWaves, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });
  }

  const gui = new GUI();
  {
    const cameraFolder = gui.addFolder("Camera");
    cameraFolder.open();
    {
      const cameraPositionFolder = cameraFolder.addFolder("Position");
      cameraPositionFolder.add(camera.position, "x").min(-50).max(50).step(0.5);
      cameraPositionFolder.add(camera.position, "y").min(-50).max(50).step(0.5);
      cameraPositionFolder.add(camera.position, "z").min(-50).max(50).step(0.5);
      cameraPositionFolder.open();
    }
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

    // if (wheel) {
    //   const wheelSpeed = time * -0.15;
    //   wheel.rotation.y = wheelSpeed;
    // }

    // if (sea) {
    //   const seaOffsetY = -16.3;
    //   sea.position.y = seaOffsetY - Math.sin(time) * 0.5;
    // }

    // if (clothes && clothes.length) {
    //   clothes.forEach((cloth) => {
    //     cloth.modifier && cloth.modifier.apply();
    //   });
    // }

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
