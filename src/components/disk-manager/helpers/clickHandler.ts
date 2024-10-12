export function handleLeftClick(event: MouseEvent) {
  if (event.button === 0) {
    if (event.detail === 1) {
      // it was a single click
      console.log("left button clicked 1 time");
    } else if (event.detail === 2) {
      // it was a double click
      console.log("left button double clicked");
    }
  }
}

export function createItemPopup(event: Event) {
  event.preventDefault();
  console.log("coordinats are" + event.clientX + "  " + event.clientY);
  console.log("right btn clicked");
}

export function createDiskManagerPopup(event: Event) {
  event.preventDefault();
  console.log(
    "manager clicked, coordinats are" +
      "  " +
      event.clientX +
      "  " +
      event.clientY
  );
}
