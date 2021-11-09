import * as MODEL_CONSTS from "../../constants.mjs";

import Burgee from "./burgee.mjs";

export default class Burgees {
  burgees = [];

  constructor(node, index) {
    // const { offset } = MODEL_CONSTS.burgees;
    // this.offset = offset;

    node.children.forEach((child, burgeeIndex) => {
      burgeeIndex += 1;
      if (
        child.name.startsWith(
          `${MODEL_CONSTS.burgeeNodeName}_${index.toString().padStart(3, "0")}`
        )
      ) {
        const burgee = new Burgee(child, burgeeIndex + 1);
        this.burgees.push(burgee);
      }
    });
    //this.node.position.set(this.offset.x, this.offset.y, this.offset.z);
  }

  _animate(time) {
    this.burgees.forEach((burgee) => {
      burgee._animate(time);
    });
  }
}
