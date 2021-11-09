import { ModifierStack, Cloth } from "three.modifiers";

import * as MODEL_CONSTS from "../../constants.mjs";

export default class Rope {
  constructor(object, index) {
    this._renewingWindForce = false;

    this.node = object;

    this.modifier = new ModifierStack(this.node);
    this.cloth = new Cloth(3, 1);
    this._setWindForce();

    this.modifier.addModifier(this.cloth);

    const ropeVariableName = `${MODEL_CONSTS.ropes.prefix}${index
      .toString()
      .padStart(3, "0")}`;
    this.properties = MODEL_CONSTS.ropes[ropeVariableName];

    this._setClothAxesLocks();

    computeNormals: false;
  }

  _setClothAxesLocks() {
    const { axesLocks } = this.properties;
    const {
      x: { min: xMin, max: xMax },
      y: { min: yMin, max: yMax },
      z: { min: zMin, max: zMax },
    } = axesLocks;

    xMin && this.cloth.lockXMin(0);
    xMax && this.cloth.lockXMax(0);

    yMin && this.cloth.lockYMin(0);
    yMax && this.cloth.lockYMax(0);

    zMin && this.cloth.lockZMin(0);
    zMax && this.cloth.lockZMax(0);
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
          (windForce.x + (Math.random() - 0.5)) * 0.03,
          (windForce.y + (Math.random() - 0.5)) * 0.03,
          -Math.abs(windForce.z + (Math.random() - 0.5))
        );
    }
  }
}
