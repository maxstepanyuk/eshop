export function toggleActiveCless(elements, activeElement, activeClass) {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
}
