import * as MODEL_CONSTS from "../constants.mjs";

export default class Signboard {
  node = null;
  offsetPosition = null;
  speed = null;
  trajectory = null;

  constructor(object) {
    this.node = object;
    this.offsetPosition = this.node.position;

    const signBoardProperties = MODEL_CONSTS.signBoard;
    const {
      //   offset,
      animation: { speed, trajectory },
    } = signBoardProperties;

    // this.offset = offset;
    this.speed = speed;
    this.trajectory = trajectory;
  }

  _animate(time) {
    this.node.position.set(
      this.offsetPosition.x + this.trajectory.x(time * this.speed.x),
      this.offsetPosition.y + this.trajectory.y(time * this.speed.y),
      this.offsetPosition.z + this.trajectory.z(time * this.speed.z)
    );
  }
}
