import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ModifierStack, Cloth } from "three.modifiers";

import * as CONSTS from "../../constants.mjs";
import * as MODEL_CONSTS from "./constants.mjs";
import * as HELPERSMODELS from "../../helpers/helpersModels.mjs";

export const name = `${MODEL_CONSTS.gltfFolderName}`;

let requestId = null;

export function run() {
  class Towel {
    constructor(mesh) {
      this.mesh = mesh;
      this.modifier = new ModifierStack(this.mesh);
      const cloth = new Cloth(3, 0);
      const windForce = {
        x: -0.002,
        y: -0.02,
        z: -0.002,
      };
      cloth.setForce(windForce.x, windForce.y, windForce.z);

      this.modifier.addModifier(cloth);
      cloth.lockYMax(0);
      cloth.lockXMax(0);
      computeNormals: false;
    }
  }

  // Animating objects
  let wheel = null;
  let sea = null;
  let clothes = null;

  const canvas = document.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-130, 50, 150);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(MODEL_CONSTS.lightBlue);

  const axesHelper = new THREE.AxesHelper(100);
  axesHelper.position.set(0, 50, 0);
  axesHelper.visible = false;
  scene.add(axesHelper);

  const setMillWheel = function (root) {
    let wheel = null;
    /* 
      Wheel is composed by two meshes: 
      - wheel structure
      - wheel blades
      The rotation center needs to be reset.
      Wheel structure needs then to be repositioned.
    */

    wheel = root.getObjectByName(MODEL_CONSTS.wheelNodeName);
    wheel.children.forEach((child, index) => {
      child.geometry.center();

      const wheelStructureIndex = 0;
      if (index === wheelStructureIndex) {
        child.position.set(0, -5, 0);
      }
    });
    wheel.position.set(-13, 45, 0);

    return wheel;
  };

  const setSea = function (root) {
    let sea = null;

    sea = root.getObjectByName(MODEL_CONSTS.seaNodeName);

    return sea;
  };

  const setClothes = function (root) {
    let clothes = [];

    root
      .getObjectByName(MODEL_CONSTS.clothLineNodeName)
      .children.forEach((child) => {
        if (child.name.startsWith("m_Cloth_")) {
          const cloth = new Towel(child);
          clothes.push(cloth);
        }
      });

    return clothes;
  };

  {
    const gltfLoader = new GLTFLoader();
    const url = `${CONSTS.resourcesRelativePath}/${CONSTS.modelsFolder}/${MODEL_CONSTS.gltfFolderName}/${MODEL_CONSTS.gltfFileName}${CONSTS.gltfFormat}`;
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      root.position.set(0, 16, 0);
      console.log(HELPERSMODELS.dumpObject(root).join("\n"));

      // Set nodes to animate
      wheel = setMillWheel(root);
      sea = setSea(root);
      clothes = setClothes(root);

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

    if (wheel) {
      const wheelSpeed = time * -0.15;
      wheel.rotation.y = wheelSpeed;
    }

    if (sea) {
      const seaOffsetY = -16.3;
      sea.position.y = seaOffsetY - Math.sin(time) * 0.5;
    }

    if (clothes && clothes.length) {
      clothes.forEach((cloth) => {
        cloth.modifier && cloth.modifier.apply();
      });
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
