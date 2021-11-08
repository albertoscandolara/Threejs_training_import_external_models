import * as UTILS from "../utils/utils.mjs";

export default class Label {
  constructor({ title, author, link }) {
    this.title = title;
    this.author = author;
    this.link = link;
  }

  getDOMelement() {
    const temp = document.querySelector("#label-section-element");
    const DOMElement = temp.content.cloneNode(true);

    DOMElement.querySelector(".title").textContent = this.title;
    DOMElement.querySelector(".author-section .value").textContent =
      this.author;
    DOMElement.querySelector(".link-section .value").href = this.link;

    return DOMElement;
  }

  updateLabel({ title, author, link }) {
    this.title = title.toUpperCase();
    this.author = author;
    this.link = link;

    this._showLabel();
  }

  _showLabel() {
    if (this.labelDOMElement) {
      this.titleSpanDOMElement.textContent = this.title;
      this.authorSpanDOMElement.textContent = this.author;
      this.linkDomElement.href = this.link;
    }
  }
}
