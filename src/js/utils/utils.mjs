export function toggleClasses(DOMElement, classToRemove, classToAdd) {
  if (DOMElement) {
    classToRemove && DOMElement.classList.remove(classToRemove);
    classToAdd && DOMElement.classList.add(classToAdd);
  }
}

export const degreesToRadians = function (degrees) {
  return degrees * (Math.PI / 180);
};
