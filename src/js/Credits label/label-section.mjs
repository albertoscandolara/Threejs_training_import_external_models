import * as UTILS from "../utils/utils.mjs";
import LabelSectionElement from "./label-section-element.mjs";

export default class LabelSection {
  showInfo = false;
  sectionDOMElement = null;
  elements = [];

  constructor(label) {
    this.showInfo = false;
    this._setDomElement(label);
    this._setEventListeners();
    this._toggleDetailsOpening();
  }

  _setDomElement(label) {
    const labelDOMElement = document.querySelector(".label");

    let selector = "";
    switch (label) {
      case "models":
        selector = "models";
        break;
      case "sounds":
        selector = "sounds";
        break;
    }

    if (selector) {
      this.sectionDOMElement = labelDOMElement.querySelector(`.${selector}`);
      this.bodyDOMElement = this.sectionDOMElement.querySelector(".body");
    }
  }

  setSectionElements(elements) {
    if (this.sectionDOMElement && elements && elements.length) {
      elements.forEach((element) => {
        this.elements.push(new LabelSectionElement(element));
      });

      this._renderSectionElements();
    }
  }

  _renderSectionElements() {
    let HTMLToAppend = "";
    this.elements.forEach((element) => {
      this.bodyDOMElement.append(element.getDOMelement());
    });
  }

  _setEventListeners() {
    // Arrow button
    ["click", "ontouchstart"].forEach((evt) =>
      this.sectionDOMElement.querySelector(`.header`).addEventListener(
        evt,
        () => {
          this.showInfo = !this.showInfo;
          this._toggleDetailsOpening();
        },
        false
      )
    );
  }

  _toggleDetailsOpening() {
    const showDetailsClass = "";
    const hideDetailsClass = "hidden";

    if (this.showInfo) {
      UTILS.toggleClasses(
        this.sectionDOMElement,
        hideDetailsClass,
        showDetailsClass
      );
    } else {
      UTILS.toggleClasses(
        this.sectionDOMElement,
        showDetailsClass,
        hideDetailsClass
      );
    }
  }

  create({ models, sounds }) {
    this.modelsSection = new LabelSection(models);
    this.soundsSection = new LabelSection(sounds);
  }
}
