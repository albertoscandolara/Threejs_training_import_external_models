import * as THREE from "three";
import * as MODEL_CONSTS from "../../constants.mjs";

export default class Shark {
  node = null;
  index = null;
  previousPosition = new THREE.Vector3();

  constructor(object, index) {
    this.node = object;
    this.index = index;

    const sharkVariableName = `${MODEL_CONSTS.sharks.prefix}${this.index}`;
    const sharkProperties = MODEL_CONSTS.sharks[sharkVariableName];
    const {
      animation: { speed, trajectory },
    } = sharkProperties;

    this.speed = speed;
    this.trajectory = trajectory;
  }

  _animate(time) {
    this.node.position.set(
      this.trajectory.x(time * this.speed.x),
      this.trajectory.y(time * this.speed.y),
      this.trajectory.z(time * this.speed.z)
    );

    const pos = new THREE.Vector3();
    pos.addVectors(this.previousPosition, this.node.position);
    this.node.lookAt(pos);

    this.previousPosition = this.node.position;
  }
}
