import * as MODEL_CONSTS from "../../constants.mjs";

import Rope from "./rope.mjs";

export default class Ropes {
  children = [];

  constructor(object) {
    this.node = object;

    this.node.children.forEach((child, index) => {
      if (child.name.startsWith(MODEL_CONSTS.ropeNodeName)) {
        const rope = new Rope(child);
        this.children.push(rope);
      }
    });
  }

  _animate(time) {
    this.children.forEach((rope) => {
      rope._animate(time);
    });
  }
}
