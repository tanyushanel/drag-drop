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

  // find elem to insert before 
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
      currentElement.nextElementSibling :
      currentElement;

  // insert activeElement before nextElement
  tasksListElement.insertBefore(activeElement, nextElement);
});