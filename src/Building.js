import Map from "./Map";
import Unit from "./Unit";

class Building {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeX = Map.tileSize * 3;
    this.sizeY = Map.tileSize * 2;
    this.lifespan = 0;
    this.selected = false;
    this.name = "base";
    this.type = "building";
    this.tasks = [];
  }

  clickAction([x, y]) {
    console.log(x, y);
  }

  tick() {
    this.lifespan += 1;
  }

  queueTask(type) {}

  actions() {
    return [
      {
        name: "build worker",
        cost: 100,
        action: () => {
          this.queueTask("worker");
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
      {
        name: "build worker",
        cost: 10000,
        action: () => {
          this.queueTask("worker");
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      },
    ];
  }

  hudDrawIcon(drawer, x, y) {
    Building.hudDrawIcon(drawer, x, y);
  }

  draw(drawer) {
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.sizeX / 2,
          this.y + this.sizeY,
          (this.sizeX + 40) / 2,
          this.sizeY / 4,
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
      rect: [this.x, this.y, this.sizeX, this.sizeY],
    });

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
