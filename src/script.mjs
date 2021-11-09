import "./styles/scss/index.scss";

import * as PIRATEISLANDCARGOBAYNODIRECTIONALLIGHT from "./js/models/Pirate Island - Cargo Bay no directional light/main.mjs";
import * as PIRATEISLANDCARGOBAYTWODIRECTIONALLIGHTS from "./js/models/Pirate Island - Cargo Bay two directional lights/main.mjs";
import * as PIRATEISLANDCARGOBAYORIGINAL from "./js/models/Pirate Island - Cargo Bay original/main.mjs";
import Label from "./js/Credits label/label.mjs";

{
  const imports = [
    PIRATEISLANDCARGOBAYNODIRECTIONALLIGHT,
    PIRATEISLANDCARGOBAYTWODIRECTIONALLIGHTS,
    PIRATEISLANDCARGOBAYORIGINAL,
  ];
  const label = new Label();

  const setSelectOptions = function () {
    imports.forEach((imp) => {
      select.add(new Option(imp.name, imp.name));
    });
  };

  const setCanvasContent = function (option) {
    const modelToLoad = imports.find((imp) => imp.name === option);

    // Stop current model rendering
    imports.forEach((imp) => {
      imp.stopRequestAnimationFrame();
    });

    // Set model label
    label.updateLabel(modelToLoad.getInfo());

    // Load model module
    modelToLoad.run();
  };

  const select = document.querySelector("select");
  setSelectOptions();
  select.addEventListener("change", () => {
    setCanvasContent(select.value);
  });

  const selectValue = `Pirate Island - Cargo Bay - two directional lights`;
  select.value = selectValue;
  setCanvasContent(select.value);
}
