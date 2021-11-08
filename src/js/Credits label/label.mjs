import * as UTILS from "../utils/utils.mjs";

import LabelSection from "./label-section.mjs";

export default class Label {
  constructor() {
    this.showInfo = true;
    this.labelDOMElement = document.querySelector(`.label`);
    this._setSections();
  }

  _setSections() {
    this.modelsSection = new LabelSection("models");
    this.soundsSection = new LabelSection("sounds");
  }

  updateLabel({ models, sounds }) {
    this.modelsSection &&
      models &&
      models.length &&
      this.modelsSection.setSectionElements(models);

    this.soundsSection &&
      sounds &&
      sounds.length &&
      this.soundsSection.setSectionElements(sounds);
  }
}
