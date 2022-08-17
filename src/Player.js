import Building from "./Building";
import Unit from "./Unit";
import unitTypes from "./unitTypes";

class Player {
  constructor() {
    this.resources = 1000;

    this.units = [];

    this.buildings = [];
  }

  addUnit({ type, x, y }) {
    const unitType = unitTypes[type];
    const colors = unitType.colors(this.color);
    const newUnit = new Unit(x, y, { ...unitType, colors });
    this.units.push(newUnit);
  }

  addBuilding({ type, x, y }) {
    const newBuilding = new Building(x, y, this.color);
    this.buildings.push(newBuilding);
  }

  entities() {
    return this.units.concat(this.buildings);
  }

  static tick({ bloods, bloodChunks, map, sound, targets }) {
    this.units.forEach((u) =>
      u.tick({ bloods, map, player: this, sound, targets })
    );
    this.units = this.units.reduce((units, unit) => {
      if (unit.health <= 0) {
        unit.explode({ bloods, bloodChunks, sound });
      } else {
        units.push(unit);
      }
      return units;
    }, []);
    this.buildings.forEach((b) => b.tick({ player: this }));
  }

  draw(drawer) {
    this.buildings.forEach((b) => b.draw(drawer));
    this.units.forEach((u) => u.draw(drawer));
  }
}

export default Player;
