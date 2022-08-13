const IDLE = "idle";
const WALKING = "walking";

class Unit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 40;
    this.lifespan = 0;
    this.selected = false;
    this.speed = 5;
    this.path = [];
  }

  setPath(target) {
    this.path = [target];
  }

  calculateSpeed() {
    let [targetX, targetY] = this.path[0];

    // normalize vector
    let u = Math.sqrt(
      Math.pow(this.x - targetX, 2) + Math.pow(this.y - targetY, 2)
    );

    // if close enough to destination, remove waypoint
    if (u > this.speed) {
      this.dx = this.speed * ((targetX - this.x) / Math.abs(u));
      this.dy = this.speed * ((targetY - this.y) / Math.abs(u));
    } else {
      this.path.pop();
    }
  }

  move() {
    if (this.path.length) {
      this.calculateSpeed();
      this.state = WALKING;
    } else {
      this.dx = 0;
      this.dy = 0;
      this.state = IDLE;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  tick({ mouseEvents }) {
    this.lifespan += 1;

    if (
      this.selected &&
      (mouseEvents.rightClickTarget[0] || mouseEvents.rightClickTarget[1])
    ) {
      this.setPath(mouseEvents.rightClickTarget);
    }

    this.move();
  }

  draw(drawer) {
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.size / 2,
          this.y + this.size,
          (this.size + 20) / 2,
          this.size / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#39C",
        strokeWidth: 5,
      });
    }

    drawer.rect({
      fillColor: "#A33",
      rect: [this.x, this.y, this.size, this.size],
    });

    drawer.miniMap({
      x: this.x,
      y: this.y,
      color: "#C33",
      size: Math.ceil(this.size / 20),
    });
  }
}

export default Unit;
