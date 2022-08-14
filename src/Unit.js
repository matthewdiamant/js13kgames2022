import { humanoid } from "./Sprites";

const IDLE = "idle";
const WALKING = "walking";

const makeColors = ([skin, horns, eyes, body]) => ({
  skin,
  horns,
  eyes,
  body,
});

class Unit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 8 * 5;
    this.lifespan = 0;
    this.selected = false;
    this.speed = 5;
    this.path = [];
    this.facing = 1;
    this.colors = makeColors(["#50c878", "#50c878", "#c00", "#a00"]);
    this.name = "WORKER";
    this.type = "unit";
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
      this.facing = this.dx > 0 ? 1 : 0;
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

  actions() {
    return [
      {
        name: "move",
        cost: 0,
        drawIcon: (drawer, x, y) => {},
      },
    ];
  }

  hudDrawIcon(drawer, x, y) {
    Unit.hudDrawIcon(drawer, x, y);
  }

  hudDraw(drawer, x, y) {
    const colors = {
      skin: "#0f0",
      horns: "#0f0",
      eyes: "#666",
      body: "#666",
    };
    humanoid(x, y, 1, colors, { size: 12 }).forEach(({ c, r }) =>
      drawer.rect({
        adjusted: false,
        fillColor: c,
        rect: r,
      })
    );
  }

  draw(drawer) {
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.size / 2,
          this.y + this.size,
          (this.size + 15) / 2,
          this.size / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#39C",
        strokeWidth: 5,
      });
    }

    humanoid(this.x, this.y, this.facing, this.colors).forEach(({ c, r }) =>
      drawer.rect({
        fillColor: c,
        rect: r,
      })
    );

    // hitbox?
    const hitbox = false;
    if (hitbox) {
      drawer.rect({
        fillColor: "#c66",
        rect: [this.x, this.y, this.size, this.size],
      });
    }

    drawer.miniMap({
      x: this.x,
      y: this.y,
      color: "#0f0",
      size: Math.ceil(this.size / 20),
    });
  }
}

Unit.hudDrawIcon = (drawer, x, y) => {
  const colors = {
    skin: "#0f0",
    horns: "#0f0",
    eyes: "#666",
    body: "#666",
  };
  humanoid(x + 14, y + 18, 1, colors, { size: 6 }).forEach(({ c, r }) =>
    drawer.rect({
      adjusted: false,
      fillColor: c,
      rect: r,
    })
  );
};

export default Unit;
