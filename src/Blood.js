class Blood {
  constructor(x, y, dx, dy, color) {
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.stuck = false;
    this.grav = 0.4;
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
      rect: [this.x, this.y, 5, 5],
    });
  }
}

export default Blood;
