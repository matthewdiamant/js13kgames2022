import AStarFinder, { Grid, smoothenPath } from "./AStar";
import { humanoid } from "./Sprites";

const IDLE = "idle";
const MOVING = "moving";
const ATTACKING = "attacking";

export const STATES = { IDLE, MOVING, ATTACKING };

class Unit {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.size = 8 * 5;
    this.speed = 5;
    this.colors = colors;
    this.name = "WORKER";

    this.range = 200;
    this.cooldown = 60;
    this.firingTotalTime = 30 * 3;

    this.pathY = y;
    this.dx = 0;
    this.dy = 0;
    this.lifespan = 0;
    this.selected = false;
    this.path = [];
    this.facing = 1;
    this.type = "unit";
    this.bounce = 0;
    this.bounceTime = 0;
    this.blink = 0;
    this.target = null;
    this.attackSelected = 0;
    this.recalculateTarget = 0;
    this.state = STATES.IDLE;

    this.firingTime = 0;
  }

  attacked() {
    this.attackSelected = 30;
  }

  setPath(target, map) {
    const [targetX, targetY] = target;

    const [startX, startY] = map.coordsToTile(this.x, this.pathY);
    const [endX, endY] = map.coordsToTile(targetX, targetY);

    const finder = new AStarFinder();
    const grid = new Grid(map.grid);
    const p = finder.findPath(startX, startY, endX, endY, grid);

    if (p.length === 0) return false;
    const smoothPath = smoothenPath(grid, p);

    const path = smoothPath
      .map(([x, y]) => map.tileToCoords(x, y))
      .slice(1, -1)
      .concat([target]);

    this.path = path;

    return true;
  }

  setTarget(enemy, map) {
    this.target = enemy;
    this.state = STATES.ATTACKING;
    this.recalculateTarget = 15;
    this.target.attacked();
    this.setPath([this.target.x, this.target.y], map);
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
      this.path.shift();
    }
  }

  move() {
    if (this.path.length) {
      this.calculateSpeed();
      this.facing = this.dx > 0 ? 1 : 0;
    } else {
      this.dx = 0;
      this.dy = 0;
      if (this.state === STATES.MOVING) this.state = STATES.IDLE;
    }
    this.x += this.dx;
    this.pathY += this.dy;
    this.y = this.pathY - this.bounce;
  }

  tick({ map }) {
    this.lifespan += 1;

    // blink
    if (Math.random() < 0.005) {
      this.blink = 10;
    }
    if (this.blink > 0) {
      this.blink -= 1;
    }

    if (this.state === STATES.IDLE && Math.random() < 0.001) {
      this.facing = this.facing ? 0 : 1;
    }

    // bounce
    const BOUNCE_HEIGHT = 12;
    const BOUNCE_DURATION = 12;
    const shouldMoveBounce =
      this.state === STATES.MOVING && this.bounceTime === 0;
    const shouldIdleBounce = this.state === STATES.IDLE && Math.random() < 0.01;
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

    // attacking
    if (this.state === ATTACKING) {
      this.recalculateTarget -= 1;
      if (this.recalculateTarget === 0) {
        this.setPath([this.target.x, this.target.y], map);
        this.recalculateTarget = 15;
      }

      const dx = Math.abs(this.x - this.target.x);
      const dy = Math.abs(this.y - this.target.y);
      const distanceFromTarget = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if (this.firingTime > 0) this.firingTime -= 1;
      if (distanceFromTarget <= this.range && this.firingTime === 0) {
        this.firingTime = this.firingTotalTime;
        console.log("fire");
      }
    }

    if (this.firingTime === 0) {
      this.move();
    }

    if (this.attackSelected > 0) this.attackSelected -= 1;
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
    const x = this.x - this.size / 2;
    const y = this.y - this.size / 2;

    const drawRing = (color) => {
      drawer.ellipse({
        ellipse: [
          x + this.size / 2,
          y + this.size,
          (this.size + 15) / 2,
          this.size / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: color,
        strokeWidth: 5,
      });
    };
    if (this.selected) drawRing("#4AC");
    if (this.attackSelected > 0) drawRing("#A00");

    humanoid(x, y, this.facing, this.colors, {
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
        rect: [x, y, this.size, this.size],
      });
    }

    drawer.miniMap({
      x: x,
      y: y,
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
