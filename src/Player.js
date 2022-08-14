import Unit from "./Unit";

const sample_army = [
  new Unit(400, 300),
  new Unit(500, 300),
  new Unit(600, 300),
  new Unit(700, 300),
  new Unit(800, 300),
  new Unit(900, 300),
  new Unit(1000, 300),
  new Unit(1100, 300),

  new Unit(400, 400),
  new Unit(500, 400),
  new Unit(600, 400),
  new Unit(700, 400),
  new Unit(800, 400),
  new Unit(900, 400),
  new Unit(1000, 400),
  new Unit(1100, 400),

  new Unit(400, 500),
  new Unit(500, 500),
  new Unit(600, 500),
  new Unit(700, 500),
  new Unit(800, 500),
  new Unit(900, 500),
  new Unit(1000, 500),
  new Unit(1100, 500),
];

class Player {
  constructor() {
    this.resources = 1000;

    this.units = [];

    this.buildings = [];
  }

  addUnit({ type, x, y }) {
    const newUnit = new Unit(x, y);
    this.units.push(newUnit);
  }

  static tick() {
    this.units.forEach((u) => u.tick());
    this.buildings.forEach((b) => b.tick({ player: this }));
  }

  draw(drawer) {
    this.buildings.forEach((b) => b.draw(drawer));
    this.units.forEach((u) => u.draw(drawer));
  }
}

export default Player;
