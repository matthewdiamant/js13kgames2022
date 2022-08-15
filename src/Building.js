import { ICON_BOX_SIZE, ICON_BOX_MARGIN } from "./HUD";
import Map from "./Map";
import Unit from "./Unit";

class Building {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.health = 1000;
    this.sizeX = Map.tileSize * 3;
    this.sizeY = Map.tileSize * 3;
    this.lifespan = 0;
    this.selected = false;
    this.name = "base";
    this.type = "building";
    this.tasks = [];
    this.color = color;
    this.attackSelected = 0;
  }

  attacked() {
    this.attackSelected = 30;
  }

  takeDamage(amount) {
    this.health -= amount;
  }

  tick({ player }) {
    this.lifespan += 1;
    const [currentTask] = this.tasks;
    if (currentTask) {
      currentTask.time -= 1;
      if (currentTask.time <= 0) {
        const { complete } = this.tasks.shift();
        complete({ player });
      }
    }

    if (this.attackSelected > 0) this.attackSelected -= 1;
  }

  queueTask(task, { player }) {
    this.tasks.push({ ...task, totalTime: task.time });
  }

  actions({ player }) {
    const building = this;
    return [
      {
        name: "build worker",
        cost: 100,
        time: 5 * 30,
        actionable: function () {
          return this.cost <= player.resources;
        },
        execute: function ({ player }) {
          if (building.tasks.length < 5 && player.resources >= this.cost) {
            player.resources -= this.cost;
            building.queueTask(this, { player });
            return true;
          }
          return false;
        },
        complete: ({ player }) => {
          player.addUnit({
            type: "worker",
            x: building.x + building.sizeX + 10,
            y: building.y + building.sizeY + 10,
          });
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        cost: 10000,
        actionable: function () {
          return this.cost <= player.resources;
        },
        execute: ({ player }) => {
          this.queueTask("worker", { player });
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build big worker",
        actionable: () => {},
        execute: () => {},
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
    ];
  }

  hudDrawCurrentTask(drawer, x, y) {
    const { name, time, totalTime, drawIcon } = this.tasks[0];
    drawer.text({
      text: `${name}`,
      x: x + 200 + ICON_BOX_SIZE + ICON_BOX_MARGIN,
      y: y + 13,
      size: 5,
    });

    // progress bar
    const PROGRESS_BAR_WIDTH = 200;
    const PROGRESS_BAR_HEIGHT = 10;
    const PROGRESS_BAR_X = x + 200 + ICON_BOX_SIZE + ICON_BOX_MARGIN;
    const PROGRESS_BAR_Y = y + ICON_BOX_SIZE - PROGRESS_BAR_HEIGHT;
    drawer.rect({
      strokeColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      fillColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        ((totalTime - time) / totalTime) * PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      strokeColor: "#0f0",
      rect: [x + 200, y, ICON_BOX_SIZE, ICON_BOX_SIZE],
    });
    drawIcon(drawer, x + 200, y);
  }

  hudDraw(drawer, x, y) {
    if (this.tasks.length) {
      this.hudDrawCurrentTask(drawer, x, y);
      this.tasks.slice(1).forEach(({ drawIcon }, i) => {
        drawer.rect({
          strokeColor: "#0f0",
          rect: [
            x + 200 + (ICON_BOX_MARGIN + ICON_BOX_SIZE) * i,
            y + ICON_BOX_SIZE + ICON_BOX_MARGIN,
            ICON_BOX_SIZE,
            ICON_BOX_SIZE,
          ],
        });
        drawIcon(
          drawer,
          x + 200 + (ICON_BOX_MARGIN + ICON_BOX_SIZE) * i,
          y + ICON_BOX_MARGIN + ICON_BOX_SIZE
        );
      });
    }
  }

  hudDrawIcon(drawer, x, y) {
    Building.hudDrawIcon(drawer, x, y);
  }

  draw(drawer) {
    const height = this.sizeY - Map.tileSize;
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.sizeX / 2,
          this.y + height + Map.tileSize,
          (this.sizeX + 40) / 2,
          height / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#4AC",
        strokeWidth: 5,
      });
    }

    const drawRing = (color) => {
      drawer.ellipse({
        ellipse: [
          this.x + this.sizeX / 2,
          this.y + height + Map.tileSize,
          (this.sizeX + 40) / 2,
          height / 3,
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

    drawer.rect({
      fillColor: "#A33",
      rect: [this.x, this.y + Map.tileSize, this.sizeX, height],
    });

    drawer.ellipse({
      ellipse: [
        this.x + this.sizeX / 2,
        this.y + height + Map.tileSize,
        this.sizeX / 2,
        height / 4,
        0,
        0,
        2 * Math.PI,
      ],
      fillColor: "#A33",
    });

    drawer.ellipse({
      ellipse: [
        this.x + this.sizeX / 2,
        this.y + Map.tileSize,
        this.sizeX / 2,
        height / 4,
        0,
        0,
        2 * Math.PI,
      ],
      fillColor: "#A55",
    });

    const FLAGPOLE_WIDTH = 10;
    const FLAGPOLE_HEIGHT = 100;
    drawer.rect({
      fillColor: "#666",
      rect: [
        this.x + this.sizeX / 2 - FLAGPOLE_WIDTH / 2,
        this.y - FLAGPOLE_HEIGHT + Map.tileSize,
        FLAGPOLE_WIDTH,
        FLAGPOLE_HEIGHT,
      ],
    });
    drawer.rect({
      fillColor: this.color,
      rect: [
        this.x + this.sizeX / 2 + FLAGPOLE_WIDTH / 2,
        this.y - FLAGPOLE_HEIGHT + Map.tileSize,
        60,
        40,
      ],
    });

    const hitbox = false;
    if (hitbox) {
      drawer.rect({
        fillColor: "#A006",
        rect: [this.x, this.y, this.sizeX, this.sizeY],
      });
    }

    drawer.miniMap({
      x: this.x,
      y: this.y,
      color: "#0f0",
      sizeX: Math.ceil(this.sizeX / 20),
      sizeY: Math.ceil(this.sizeY / 20),
    });
  }
}

Building.hudDrawIcon = (drawer, x, y) => {};

export default Building;
