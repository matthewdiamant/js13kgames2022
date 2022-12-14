import AStarFinder, { Grid, smoothenPath } from "./AStar";
import HUD from "./HUD";
import { humanoid } from "./Sprites";
import Particle from "./Particle";
import buildingTypes from "./buildingTypes";
import unitTypes from "./unitTypes";
import { boxCollision } from "./collision";
import { distance } from "./distance";

export const STATES = {
  IDLE: 0,
  MOVING: 1,
  ATTACKING: 2,
  MINING: 3,
  RETURNING_RESOURCE: 4,
  BUILD_BUILDING: 5,
};

const MENU_STATES = {
  INITIAL: 0,
  BUILDING: 1,
  PLACE_BUILDING: 2,
};

const AGGRO_DISTANCE = 400;

class Unit {
  constructor(x, y, unitType) {
    Object.entries(unitType).forEach(([key, value]) => {
      this[key] = value;
    });

    this.x = x;
    this.y = y;
    this.pathY = y;
    this.dx = 0;
    this.dy = 0;
    this.maxHealth = this.health;
    this.lifespan = 0;
    this.selected = false;
    this.path = [[x + Math.random() * 100, y + Math.random() * 200 - 100]];
    this.facing = 1;
    this.type = "unit";
    this.bounce = 0;
    this.bounceTime = 0;
    this.blink = 0;
    this.target = null;
    this.attackSelected = 0;
    this.recalculateTarget = 0;
    this.state = STATES.MOVING;
    this.menuState = MENU_STATES.INITIAL;
    this.inFog = 0;

    // worker things
    this.carryingResource = false;
    this.miningTarget = null;
    this.baseTarget = null;
    this.buildingTarget = null;

    this.cooldownTime = 0;
    this.firingTime = 0;
  }

  attacked() {
    this.attackSelected = 30;
  }

  setPath(target, map) {
    const [targetX, targetY] = target;
    if (this.flying) {
      this.path = [target];
      return true;
    }

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

    const distanceFromTarget = distance(this, this.target);
    const targetInRange = distanceFromTarget <= this.range;
    if (!targetInRange) {
      this.setPath([this.target.x, this.target.y], map);
    }
  }

  setMining(mine) {
    this.path = [];
    this.miningTarget = mine;
    this.state = STATES.MINING;
  }

  buildBuilding({ building }) {
    this.buildingTarget = building;
    this.state = STATES.BUILD_BUILDING;
  }

  calculateSpeed() {
    let [targetX, targetY] = this.path[0];
    let d = distance({ x: this.x, y: this.pathY }, { x: targetX, y: targetY });

    // if close enough to destination, remove waypoint
    if (d > this.speed) {
      this.dx = this.speed * ((targetX - this.x) / Math.abs(d));
      this.dy = this.speed * ((targetY - this.pathY) / Math.abs(d));
    } else {
      this.path.shift();
    }
  }

  takeDamage(amount, { particles, d }) {
    this.health -= amount;
    for (let i = 0; i < amount; i++) {
      particles.add(
        new Particle(
          "blood",
          this.x,
          this.y + this.size / 2,
          Math.random() * 6 - 3 + d.dx * 4,
          Math.random() * -10 - 5 + d.dy * 4,
          this.bloodColor
        )
      );
    }
    return this.health <= 0;
  }

  explode({ particles, sound }) {
    sound.play("death");
    for (let i = 0; i < 100; i++) {
      particles.add(
        new Particle(
          "blood",
          this.x,
          this.y,
          Math.random() * 10 - 5,
          Math.random() * -12 - 6,
          this.bloodColor
        )
      );
    }
    for (let i = 0; i < 5; i++) {
      particles.add(
        new Particle(
          "chunk",
          this.x,
          this.y,
          Math.random() * 6 - 3,
          Math.random() * -6 - 6,
          "red"
        )
      );
    }
  }

  returnResource(player, map, baseTarget = null) {
    this.path = [];
    let base = baseTarget;
    if (!base) {
      const bases = player.buildings.filter((b) => b.name === "base");
      if (bases.length) {
        bases.sort((a, b) => distance(this, a) - distance(this, b));
        base = bases[0];
      }
    }
    if (base) {
      this.baseTarget = base;
      this.setPath([base.x + base.sizeX / 2, base.y + base.sizeY / 2], map);
      this.state = STATES.RETURNING_RESOURCE;
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
  }

  tick({ map, particles, player, sound, targets }) {
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
    if (this.bouncy) {
      const BOUNCE_HEIGHT = 12;
      const BOUNCE_DURATION = 12;
      const shouldMoveBounce =
        (this.state === STATES.MOVING || this.state === STATES.ATTACKING) &&
        this.bounceTime === 0;
      const shouldIdleBounce =
        this.state === STATES.IDLE && Math.random() < 0.01;
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
    }

    // building
    if (this.state === STATES.BUILD_BUILDING) {
      if (this.path.length === 0) {
        this.setPath(
          [
            this.buildingTarget.x + this.buildingTarget.sizeX / 2,
            this.buildingTarget.y + this.buildingTarget.sizeY / 2,
          ],
          map
        );
      }
      if (boxCollision(this.hitbox(), this.buildingTarget)) {
        this.buildingTarget.buildingProgress -= 1;
        if (this.buildingTarget.buildingProgress <= 0) {
          this.buildingTarget.built = true;
          this.state = STATES.IDLE;
          this.menuState = MENU_STATES.INITIAL;
        }
      }
    }

    // mining
    if (this.state === STATES.MINING) {
      if (!this.carryingResource && this.path.length === 0) {
        this.setPath(
          [
            this.miningTarget.x + this.miningTarget.size / 2,
            this.miningTarget.y + this.miningTarget.size / 2,
          ],
          map
        );
      } else if (this.carryingResource) {
        this.returnResource(player, map);
      }
      if (boxCollision(this.hitbox(), this.miningTarget)) {
        this.carryingResource = true;
        this.returnResource(player, map);
      }
    }
    if (this.state === STATES.RETURNING_RESOURCE) {
      if (
        boxCollision(this.hitbox(), this.baseTarget) &&
        this.carryingResource
      ) {
        player.resources += 5;
        this.carryingResource = false;
        this.setPath(
          [
            this.miningTarget.x + this.miningTarget.size / 2,
            this.miningTarget.y + this.miningTarget.size / 2,
          ],
          map
        );
        this.state = STATES.MINING;
      }
    }

    // find targets while idle
    if (this.aggro && this.state === STATES.IDLE) {
      const [nearTarget] = targets.filter(
        (entity) => distance(this, entity) <= AGGRO_DISTANCE
      );
      if (nearTarget) {
        this.setTarget(nearTarget, map);
      }
    }

    // attacking
    if (this.target && this.target.health <= 0) {
      this.target = null;
      this.state = STATES.IDLE;
      this.path = [];
    }
    if (this.firingTime > 0) this.firingTime -= 1;
    if (this.cooldownTime > 0) this.cooldownTime -= 1;
    if (this.state === STATES.ATTACKING) {
      const distanceFromTarget = distance(this, this.target);
      const targetInRange = distanceFromTarget <= this.range;

      this.recalculateTarget -= 1;
      if (this.recalculateTarget < 0 && !targetInRange) {
        this.setPath([this.target.x, this.target.y], map);
        this.recalculateTarget = 15;
      }

      if (targetInRange && this.cooldownTime === 0) {
        sound.play(this.attackSound);
        this.cooldownTime = this.cooldownTotalTime;
        this.firingTime = this.firingTotalTime;
        this.path = [];

        const d = distance(this, this.target);
        const dx = (this.target.x - this.x) / d;
        const dy = (this.target.y - this.pathY) / d;
        this.target.takeDamage(this.damage, {
          particles,
          d: { dx, dy },
        });
      }
    }

    if (this.firingTime === 0) {
      this.move();
    }
    this.y = this.pathY - this.bounce;

    if (this.attackSelected > 0) this.attackSelected -= 1;
  }

  actions({ player }) {
    const output = Array(9).fill({});

    const cancel = {
      name: "cancel",
      cost: 0,
      actionable: () => true,
      drawIcon: HUD.cancelIcon,
      execute: () => {
        this.menuState = MENU_STATES.INITIAL;
        player.cancelPlaceBuilding();
        if (this.buildingTarget) {
          player.cancelBuilding(this.buildingTarget);
        }
        this.state = STATES.IDLE;
      },
    };

    const buildBuilding = (building) => ({
      name: `build ${building["name"]}`,
      cost: building["cost"],
      actionable: function () {
        return this.cost <= player.resources;
      },
      drawIcon: (drawer, x, y) => {
        building.drawIcon(drawer, x, y);
      },
      execute: () => {
        player.placeBuildingMode({ unit: this, building: building["name"] });
        this.menuState = MENU_STATES.PLACE_BUILDING;
      },
    });

    if (this.state === MENU_STATES.BUILD_BUILDING) {
      output[5] = cancel;
    } else if (this.menuState === MENU_STATES.BUILDING) {
      output[0] = buildBuilding(buildingTypes["base"]);
      output[1] = buildBuilding(buildingTypes["barracks"]);
      output[5] = cancel;
    } else if (this.menuState === MENU_STATES.PLACE_BUILDING) {
      output[5] = cancel;
    } else {
      if (this.builder) {
        output[0] = {
          name: "build",
          cost: 0,
          actionable: () => true,
          drawIcon: (drawer, x, y) => {
            drawer.triangle({
              adjusted: false,
              x: x + 17,
              y: y + 18,
              fillColor: "#0F0",
              rotation: Math.PI * 0.25,
              size: 26,
            });
            drawer.rect({
              adjusted: false,
              rect: [x + 18, y + 25, 24, 20],
              fillColor: "#0F0",
            });
            drawer.rect({
              adjusted: false,
              rect: [x + 26, y + 37, 7, 8],
              fillColor: "#111",
            });
          },
          execute: () => {
            this.menuState = MENU_STATES.BUILDING;
          },
        };
      }
    }
    return output;
  }

  hudDrawIcon(drawer, x, y, name) {
    const options = unitTypes[name];
    Unit.hudDrawIcon(drawer, x, y, { ...options, bodyless: this.bodyless });
  }

  hudDraw(drawer, x, y, name) {
    const options = unitTypes[name];
    const colors = {
      skin: "#0f0",
      eyes: "#666",
      body: "#666",
    };
    humanoid(x, y, 1, colors, { ...options, size: 12 }).forEach(({ c, r }) =>
      drawer.rect({
        adjusted: false,
        fillColor: c,
        rect: r,
      })
    );
  }

  hitbox() {
    const x = this.x - this.size / 2;
    const y = this.y - this.size / 2;
    return { x, y, size: this.size };
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
    if (this.attackSelected > 0 && this.attackSelected % 10 > 5)
      drawRing("#A00");

    humanoid(x, y, this.facing, this.colors, {
      bodyless: this.bodyless,
      brute: this.brute,
      horns: this.horns,
      antenna: this.antenna,

      blink: this.blink > 0,
      size: this.size / 5,
    }).forEach(({ c, r }) =>
      drawer.rect({
        fillColor: c,
        rect: r,
      })
    );

    if (this.carryingResource) {
      drawer.draw(() => {
        drawer.rect({
          fillColor: "#39ca",
          rect: [x + (this.facing ? 5 : -35) + this.size / 2, y + 10, 30, 30],
          rotation: Math.PI * -0.05,
          size: 30,
        });
      });
    }

    if (this.firingTotalTime - this.firingTime < 5) {
      // prettier-ignore
      [
        [(this.facing === 1 ? 8 : -1), 3, 1, 1],
        [(this.facing === 1 ? 7 : 0), 4, 2, 3],
      ].forEach(([sx, sy, dx, dy]) =>
        drawer.rect({
          fillColor: "yellow",
          rect: [x + sx * 6, y + sy * 6, dx * 6, dy * 6],
        })
      );

      // prettier-ignore
      [
        [(this.facing === 1 ? 8 : -1), 4, 2, 2],
        [(this.facing === 1 ? 10 : -3), 4, 1, 1],
      ].forEach(([sx, sy, dx, dy]) =>
        drawer.rect({
          fillColor: "white",
          rect: [x + sx * 6, y + sy * 6, dx * 6, dy * 6],
        })
      );
    }

    if (!this.inFog) {
      drawer.miniMap({
        x: x,
        y: y,
        color: this.miniMapColor,
        size: Math.ceil(this.size / 20),
      });
    }
  }
}

Unit.hudDrawIcon = (drawer, x, y, options) => {
  const colors = {
    skin: "#0f0",
    eyes: "#666",
    body: "#666",
  };
  humanoid(x + 14, y + 18, 1, colors, { ...options, size: 6 }).forEach(
    ({ c, r }) =>
      drawer.rect({
        adjusted: false,
        fillColor: c,
        rect: r,
      })
  );
};

export default Unit;
