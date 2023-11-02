const tasksListElement = document.querySelector(`.tasks__list`);
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

for (const task of taskElements) {
  task.draggable = true;
}

tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
})

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

tasksListElement.addEventListener(`dragover`, (evt) => {
  // to allow dropping elem to this area
  evt.preventDefault();

  // get selected elem
  const activeElement = tasksListElement.querySelector(`.selected`);
  // get hovered elem
  const currentElement = evt.target;
  // Check if drop event fired:
  // 1. on non-selected elem
  // 2. on elem from the list
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);

  // 3. or return if not
  if (!isMoveable) {
    return;
  }

  // evt.clientY — cursor vertical coordinate during event
  const nextElement = getNextElement(evt.clientY, currentElement);

  // check if need to replace elem
  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    // if no need to replace return
    return;
  }

  // insert activeElement before nextElement
  tasksListElement.insertBefore(activeElement, nextElement);
});

const getNextElement = (cursorPosition, currentElement) => {
  // get elem with coordinates and position
  const currentElementCoord = currentElement.getBoundingClientRect();
  // get vertical (y) position of center of elem
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // if cursor position is higher than center of elem return current elem
  // else return next sibling
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement;
};