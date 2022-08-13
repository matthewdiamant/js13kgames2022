const DRAG_THRESHOLD = 20;

class Mouse {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    this.canvas.addEventListener("click", (event) => this.click(event));
    this.canvas.addEventListener("mousedown", (event) => this.mousedown(event));
    this.canvas.addEventListener("mouseup", (event) => this.mouseup(event));
    this.canvas.addEventListener("mousemove", (event) => this.mousemove(event));
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.rightClick(event);
    });
    this.clickCoords = [null, null];
    this.dragging = false;
    this.prevDragging = false;
    this.releaseDrag = null;
    this.startDragLocation = [null, null];
  }

  tick({ camera }) {
    this.camera = camera;

    this.releaseDrag = null;
    if (this.prevDragging && !this.dragging) {
      if (
        Math.abs(this.startDragLocation[0] - this.mouseLocation[0]) >
          DRAG_THRESHOLD ||
        Math.abs(this.startDragLocation[1] - this.mouseLocation[1]) >
          DRAG_THRESHOLD
      ) {
        this.releaseDrag = this.startDragLocation.concat(this.mouseLocation);
        this.startDragLocation = [null, null];
      }
    }
    this.prevDragging = this.dragging;

    const clickTarget = this.clickCoords;
    const rightClickTarget = this.rightClickCoords;
    const releaseDrag = this.releaseDrag;
    this.clickCoords = this.rightClickCoords = [null, null];
    return { clickTarget, rightClickTarget, releaseDrag };
  }

  click({ clientX, clientY }) {
    this.clickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  mousedown({ clientX, clientY }) {
    this.startDragLocation = [clientX + this.camera.x, clientY + this.camera.y];
    this.dragging = true;
  }

  mouseup() {
    this.dragging = false;
  }

  mousemove({ clientX, clientY }) {
    this.mouseLocation = [clientX + this.camera.x, clientY + this.camera.y];
  }

  rightClick({ clientX, clientY }) {
    this.rightClickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  draw(drawer) {
    if (this.dragging) {
      drawer.rect({
        rect: [
          this.startDragLocation[0],
          this.startDragLocation[1],
          this.mouseLocation[0] - this.startDragLocation[0],
          this.mouseLocation[1] - this.startDragLocation[1],
        ],
        strokeColor: "#369",
      });
    }
  }
}

export default Mouse;
