class Mine {
  constructor(x, y) {
    this.resources = 10000;
    this.x = x;
    this.y = y;
    this.size = 200;
  }

  tick() {}

  draw(drawer) {
    drawer.rect({
      fillColor: "#33A",
      rect: [this.x, this.y, this.size, this.size],
    });
  }
}

export default Mine;
