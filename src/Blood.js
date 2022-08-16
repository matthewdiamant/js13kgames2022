class Blood {
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

  stick({ map }) {
    const [x, y] = map.coordsToTile(this.x, this.y);
    const tile = map.grid[y][x];
    if (tile) this.color = "#0000";
    this.stuck = true;
  }

  tick({ map }) {
    if (this.stuck) return;
    this.x += this.dx;
    this.dy += this.grav;
    this.y += this.dy;

    if (this.y - Math.random() * 10 > this.startingY) this.stick({ map });
  }

  draw(drawer) {
    drawer.rect({
      fillColor: this.color,
      rect: [this.x, this.y, 5, 5],
    });
  }
}

export default Blood;
