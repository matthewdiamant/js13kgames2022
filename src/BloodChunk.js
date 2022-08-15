class BloodChunk {
  constructor(x, y, dx, dy, color) {
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.stuck = false;
    this.grav = 0.6;
  }

  stick() {
    this.stuck = true;
  }

  tick() {
    if (this.stuck) return;
    this.x += this.dx;
    this.dy += this.grav;
    this.y += this.dy;

    if (this.y - Math.random() * 10 > this.startingY) this.stick();
  }

  draw(drawer) {
    drawer.rect({
      fillColor: this.color,
      rect: [this.x, this.y - 10, 10, 15],
    });

    [
      [1, 2],
      [2, 3],
    ].forEach(([x, y]) => {
      drawer.rect({
        fillColor: this.color,
        rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
      });
    });

    [
      [2, 0],
      [1, 1],
      [0, 2],
      [1, 3],
    ].forEach(([x, y]) => {
      drawer.rect({
        fillColor: "#FF77A8",
        rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
      });
    });
  }
}

export default BloodChunk;
