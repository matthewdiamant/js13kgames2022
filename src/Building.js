import Map from "./Map";

class Building {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeX = Map.tileSize * 3;
    this.sizeY = Map.tileSize * 2;
    this.lifespan = 0;
    this.selected = false;
  }

  tick() {}

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
      color: "#C33",
      sizeX: Math.ceil(this.sizeX / 20),
      sizeY: Math.ceil(this.sizeY / 20),
    });
  }
}

export default Building;
