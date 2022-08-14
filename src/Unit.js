import { humanoid } from "./Sprites";

const IDLE = "idle";
const MOVING = "moving";

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
    this.pathY = y;
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
    this.bounce = 0;
    this.bounceTime = 0;
    this.blink = 0;
  }

  setPath(target) {
    this.path = [target];
  }

  calculateSpeed() {
    let [targetX, targetY] = this.path[0];

    // normalize vector
    let u = Math.sqrt(
      Math.pow(this.x - targetX, 2) + Math.pow(this.pathY - targetY, 2)
    );

    // if close enough to destination, remove waypoint
    if (u > this.speed) {
      this.dx = this.speed * ((targetX - this.x) / Math.abs(u));
      this.dy = this.speed * ((targetY - this.pathY) / Math.abs(u));
    } else {
      this.path.pop();
    }
  }

  move() {
    if (this.path.length) {
      this.calculateSpeed();
      this.state = MOVING;
      this.facing = this.dx > 0 ? 1 : 0;
    } else {
      this.dx = 0;
      this.dy = 0;
      this.state = IDLE;
    }
    this.x += this.dx;
    this.pathY += this.dy;
    this.y = this.pathY - this.bounce;
  }

  tick({ mouseEvents }) {
    this.lifespan += 1;

    if (
      this.selected &&
      (mouseEvents.rightClickTarget[0] || mouseEvents.rightClickTarget[1])
    ) {
      this.setPath(mouseEvents.rightClickTarget);
    }

    // blink
    if (Math.random() < 0.005) {
      this.blink = 10;
    }
    if (this.blink > 0) {
      this.blink -= 1;
    }

    if (this.state === IDLE && Math.random() < 0.001) {
      this.facing = this.facing ? 0 : 1;
    }

    // bounce
    const BOUNCE_HEIGHT = 12;
    const BOUNCE_DURATION = 12;
    const shouldMoveBounce = this.state === MOVING && this.bounceTime === 0;
    const shouldIdleBounce = this.state === IDLE && Math.random() < 0.01;
    if (shouldMoveBounce || shouldIdleBounce) {
      this.bounceTime = BOUNCE_DURATION;
    }
    if (this.bounceTime > 0) {
      this.bounceTime -= 1;
      const a =
        BOUNCE_DURATION * (Math.sqrt(BOUNCE_HEIGHT) / (BOUNCE_HEIGHT * 2));
      this.bounce =
        -Math.pow(this.bounceTime / a - Math.sqrt(BOUNCE_HEIGHT), 2) +
        BOUNCE_HEIGHT;
    }

    this.move();
  }

  actions() {
    return [
      {
        name: "move",
        cost: 0,
        actionable: () => true,
        drawIcon: (drawer, x, y) => {},
        execute: () => {
          console.log("move");
        },
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
        strokeColor: "#4AC",
        strokeWidth: 5,
      });
    }

    humanoid(this.x, this.y, this.facing, this.colors, {
      blink: this.blink > 0,
    }).forEach(({ c, r }) =>
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
