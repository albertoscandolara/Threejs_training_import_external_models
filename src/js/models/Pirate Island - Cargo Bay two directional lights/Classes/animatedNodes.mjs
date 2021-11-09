import * as MODEL_CONSTS from "../constants.mjs";

import Flags from "./Flags/flags.mjs";
import IvyPlants from "./Ivy plants/ivy_plants.mjs";
import Ropes from "./Ropes/ropes.mjs";
import Sea from "./sea.mjs";
import Sharks from "./Sharks/sharks.mjs";
import Signboard from "./signboard.mjs";

export default class AnimatedNodes {
  constructor(root) {
    this.root = root;
  }

  add(...nodeNames) {
    nodeNames.forEach((nodeName) => {
      if (!this.hasOwnProperty(nodeName)) {
        const node = this.root.getObjectByName(nodeName);

        if (node) {
          let nodeValue = null;
          switch (nodeName) {
            case MODEL_CONSTS.flagsNodeName:
              nodeValue = new Flags(node);
              break;
            case MODEL_CONSTS.ivyPlantsNodeName:
              nodeValue = new IvyPlants(node);
              break;
            case MODEL_CONSTS.ropesNodeName:
              nodeValue = new Ropes(node);
              break;
            case MODEL_CONSTS.seaNodeName:
              nodeValue = new Sea(node);
              break;
            case MODEL_CONSTS.sharksNodeName:
              nodeValue = new Sharks(node);
              break;
            case MODEL_CONSTS.signboardNodeName:
              nodeValue = new Signboard(node);
              break;
          }

          this[nodeName] = nodeValue;
        }
      }
    });
  }

  animate(time) {
    for (let property in this) {
      if (
        this.hasOwnProperty(property) &&
        (this[property] instanceof Flags ||
          this[property] instanceof IvyPlants ||
          this[property] instanceof Ropes ||
          this[property] instanceof Sea ||
          this[property] instanceof Sharks ||
          this[property] instanceof Signboard)
      ) {
        this[property]._animate(time);
      }
    }
  }
}
