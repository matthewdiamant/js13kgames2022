import HUD, { ICON_BOX_SIZE, ICON_BOX_MARGIN } from "./HUD";
import Map from "./Map";
import Particle from "./Particle";

class Building {
  constructor(x, y, template, color, built, builder = null, miniMapColor) {
    this.health = template.health;
    this.sizeX = template.sizeX;
    this.sizeY = template.sizeY;
    this.name = template.name;
    this.actionsTemplate = template.actions;
    this.buildingProgress = built ? 0 : template.buildTime;
    this.cost = template.cost;
    this.drawBuilding = template.drawBuilding;

    this.x = x;
    this.y = y;
    this.lifespan = 0;
    this.maxHealth = this.health;
    this.selected = false;
    this.type = "building";
    this.tasks = [];
    this.color = color;
    this.miniMapColor = miniMapColor;
    this.attackSelected = 0;
    this.built = built;
    this.builder = builder;
    this.bloodColor = "#666";
    this.inFog = 0;
  }

  attacked() {
    this.attackSelected = 20;
  }

  takeDamage(amount, { particles, d }) {
    this.health -= amount;
    for (let i = 0; i < amount; i++) {
      particles.add(
        new Particle(
          "blood",
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4 + d.dx * 2,
          Math.random() * -16 - 8 + d.dy * 2,
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
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4,
          Math.random() * -16 - 8,
          this.bloodColor
        )
      );
    }
    for (let i = 0; i < 20; i++) {
      const c = Math.floor(Math.random() * 34 + 51);
      particles.add(
        new Particle(
          "bit",
          this.x + this.sizeX / 2,
          this.y + this.sizeY / 2,
          Math.random() * 8 - 4,
          Math.random() * -16 - 8,
          `#${c}${c}${c}`
        )
      );
    }
  }

  hitbox() {
    return this;
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
    let output = Array(9).fill({});

    const building = this;
    if (!this.built) {
      output[8] = {
        name: "cancel",
        cost: 0,
        actionable: () => true,
        execute: ({ player }) => {
          player.cancelBuilding(this);
          player.selected = [];
        },
        drawIcon: HUD.cancelIcon,
      };
    } else {
      this.actionsTemplate({ building, output, player });
    }
    return output;
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
      adjusted: false,
      strokeColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      adjusted: false,
      fillColor: "#0f0",
      rect: [
        PROGRESS_BAR_X,
        PROGRESS_BAR_Y,
        ((totalTime - time) / totalTime) * PROGRESS_BAR_WIDTH,
        PROGRESS_BAR_HEIGHT,
      ],
    });
    drawer.rect({
      adjusted: false,
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
          adjusted: false,
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

    this.drawBuilding(
      drawer,
      this.x,
      this.y,
      this.sizeX,
      height,
      this.color,
      this.built ? "F" : "4"
    );

    const hitbox = false;
    if (hitbox) {
      drawer.rect({
        fillColor: "#A006",
        rect: [this.x, this.y, this.sizeX, this.sizeY],
      });
    }

    if (!this.inFog) {
      drawer.miniMap({
        x: this.x,
        y: this.y,
        color: this.miniMapColor,
        sizeX: Math.ceil(this.sizeX / 20),
        sizeY: Math.ceil(this.sizeY / 20),
      });
    }
  }
}

Building.hudDrawIcon = (drawer, x, y) => {};

export default Building;
