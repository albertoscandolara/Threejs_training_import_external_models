import * as MODEL_CONSTS from "../constants.mjs";

export default class Shark {
  constructor(object, index) {
    this.node = object;

    const seaProperties = MODEL_CONSTS.sea;
    const {
      offset,
      animation: { speed, trajectory },
    } = seaProperties;

    this.offset = offset;
    this.speed = speed;
    this.trajectory = trajectory;
  }

  _animate(time) {
    this.node.position.set(
      this.trajectory.x(time * this.speed.x),
      this.trajectory.y(time * this.speed.y),
      this.trajectory.z(time * this.speed.z)
    );
  }
}
