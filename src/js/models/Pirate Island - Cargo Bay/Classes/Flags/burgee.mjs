import { ModifierStack, Cloth } from "three.modifiers";

import * as MODEL_CONSTS from "../../constants.mjs";

export default class Burgee {
  constructor(object) {
    this._renewingWindForce = false;

    this.node = object;

    this.modifier = new ModifierStack(this.node);
    this.cloth = new Cloth(1, 0);
    this._setWindForce();

    this.modifier.addModifier(this.cloth);
    this.cloth.lockXMin(0);
    this.cloth.lockXMax(0);
    this.cloth.lockZMax(0);
    computeNormals: false;
  }

  _animate(time) {
    this.modifier && this.modifier.apply();
    if (Math.trunc(time) % 5 === 0) {
      this._setWindForce();
    } else {
      this._renewingWindForce = false;
    }
  }

  _setWindForce() {
    if (!this._renewingWindForce) {
      this._renewingWindForce = true;

      const windForce = MODEL_CONSTS.windForce;
      this.cloth &&
        this.cloth.setForce(
          windForce.x + (Math.random() - 0.5),
          windForce.y + (Math.random() - 0.5),
          windForce.z + (Math.random() - 0.5)
        );
    }
  }
}
