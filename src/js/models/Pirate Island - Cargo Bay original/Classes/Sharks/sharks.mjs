import * as MODEL_CONSTS from "../../constants.mjs";

import Shark from "./shark.mjs";

export default class Sharks {
  children = [];

  constructor(object) {
    this.node = object;

    const { offset } = MODEL_CONSTS.sharks;
    this.offset = offset;

    this.node.children.forEach((child, index) => {
      if (child.name.startsWith(MODEL_CONSTS.sharkNodeName)) {
        const shark = new Shark(child, index + 1);
        this.children.push(shark);
      }
    });
    this.node.position.set(this.offset.x, this.offset.y, this.offset.z);
  }

  _animate(time) {
    this.children.forEach((shark) => {
      shark._animate(time);
    });
  }
}
