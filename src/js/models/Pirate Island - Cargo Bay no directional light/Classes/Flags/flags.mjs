import * as MODEL_CONSTS from "../../constants.mjs";

import TopFlag from "./top_flag.mjs";
import Burgees from "./burgees.mjs";

export default class Flags {
  burgeeGroups = [];

  constructor(node) {
    node.children.forEach((child) => {
      if (child.name.startsWith(MODEL_CONSTS.topFlagNodeName)) {
        this.topFlag = new TopFlag(child);
      } else if (child.name.startsWith(MODEL_CONSTS.burgeesNodeName)) {
        const burgeesNode = child;
        burgeesNode.children.forEach((child, index) => {
          index += 1;
          if (
            child.name.startsWith(
              `${MODEL_CONSTS.burgeesNodeName}_${index
                .toString()
                .padStart(3, "0")}`
            )
          ) {
            const burgeeGroup = new Burgees(child, index);
            this.burgeeGroups.push(burgeeGroup);
          }
        });
      }
    });
  }

  _animate(time) {
    this.topFlag._animate(time);
    this.burgeeGroups.forEach((flag) => {
      flag._animate(time);
    });
  }
}
