class Mine {
  constructor(x, y) {
    this.resources = 10000;
    this.x = x;
    this.y = y;
    this.size = 80 * 2;
    this.inFog = 0;
  }

  draw(drawer) {
    drawer.rect({
      fillColor: "#338",
      rect: [this.x, this.y + this.size / 2, this.size, this.size / 2],
    });
    drawer.ellipse({
      fillColor: "#338",
      ellipse: [
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        this.size / 2,
        0,
        0,
        2 * Math.PI,
      ],
    });

    const DOOR_SIZE = 50;
    drawer.rect({
      fillColor: "#111",
      rect: [
        this.x + this.size / 2 - DOOR_SIZE / 2,
        this.y + this.size - DOOR_SIZE / 2,
        DOOR_SIZE,
        DOOR_SIZE / 2,
      ],
    });
    drawer.ellipse({
      fillColor: "#111",
      ellipse: [
        this.x + this.size / 2,
        this.y + this.size - DOOR_SIZE / 2,
        DOOR_SIZE / 2,
        DOOR_SIZE / 2,
        0,
        0,
        2 * Math.PI,
      ],
    });

    if (!this.inFog) {
      drawer.miniMap({
        x: this.x,
        y: this.y,
        color: "#69c",
        size: Math.ceil(this.size / 20),
      });
    }
  }
}

export default Mine;
