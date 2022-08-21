import particleTypes from "./particleTypes";

class Particle {
  constructor(type, x, y, dx, dy, color) {
    const template = particleTypes[type];

    this.type = type;
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.stuck = false;
    this.invisible = false;
    this.grav = 0.6;
    this.particleDraw = template.draw;
  }

  stick({ map }) {
    const [x, y] = map.coordsToTile(this.x, this.y);
    const tile = map.grid[y][x];
    if (tile) this.invisible = true;
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
    if (this.invisible) return;
    this.particleDraw.call(this, drawer);
  }
}

export default Particle;
