import "./styles/scss/index.scss";

import * as PIRATEISLANDCARGOBAY from "./js/models/Pirate Island - Cargo Bay/main.mjs";
import Label from "./js/Credits label/label.mjs";

{
  const imports = [PIRATEISLANDCARGOBAY];
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

  const selectValue = `Pirate Island - Cargo Bay`;
  select.value = selectValue;
  setCanvasContent(select.value);
}
