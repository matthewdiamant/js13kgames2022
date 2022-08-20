const DRAG_THRESHOLD = 2;

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
    this.rightClickCoords = [null, null];
    this.mouseLocation = [null, null];
    this.mouseScreenLocation = [null, null];

    // dragging
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

    this.clickTarget = this.clickCoords;
    this.rightClickTarget = this.rightClickCoords;
    this.clickCoords = this.rightClickCoords = [null, null];
  }

  click({ clientX, clientY }) {
    this.clickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  mousedown({ clientX, clientY, which }) {
    if (which === 1) {
      this.startDragLocation = [
        clientX + this.camera.x,
        clientY + this.camera.y,
      ];
      this.dragging = true;
    }
  }

  mouseup() {
    this.dragging = false;
  }

  mousemove({ clientX, clientY }) {
    if (this.camera) {
      this.mouseLocation = [clientX + this.camera.x, clientY + this.camera.y];
      this.mouseScreenLocation = [clientX, clientY];
    }
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
