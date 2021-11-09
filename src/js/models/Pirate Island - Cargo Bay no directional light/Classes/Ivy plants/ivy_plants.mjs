import * as MODEL_CONSTS from "../../constants.mjs";

import IvyPlant from "./ivy_plant.mjs";

export default class IvyPlants {
  children = [];

  constructor(object) {
    this.node = object;

    this.node.children.forEach((child, index) => {
      if (child.name.startsWith(MODEL_CONSTS.ivyPlantNodeName)) {
        const ivyPlant = new IvyPlant(child, index + 1);
        this.children.push(ivyPlant);
      }
    });
  }

  _animate(time) {
    this.children.forEach((ivyPlant) => {
      ivyPlant._animate(time);
    });
  }
}
