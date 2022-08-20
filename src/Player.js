import Building from "./Building";
import Unit, { STATES } from "./Unit";
import buildingTypes from "./buildingTypes";
import unitTypes from "./unitTypes";

class Player {
  constructor() {
    this.resources = 500;

    this.units = [];

    this.buildings = [];
  }

  addUnit({ type, x, y }) {
    const unitType = unitTypes[type];
    const colors = unitType.colors(this.color);
    const newUnit = new Unit(x, y, { ...unitType, colors });
    this.units.push(newUnit);
  }

  addBuilding({ type, x, y, built = true, unit = null }) {
    const building = buildingTypes[type];
    const newBuilding = new Building(x, y, building, this.color, built, unit);
    this.buildings.push(newBuilding);
    return newBuilding;
  }

  cancelBuilding(building) {
    building.builder.buildingTarget = null;
    building.builder.state = STATES.IDLE;
    this.buildings = this.buildings.filter((b) => b !== building);
    this.resources += 400;
  }

  placeBuildingForConstruction({ building, x, y, map, unit }) {
    this.resources -= 400;
    const b = this.addBuilding({ type: building, x, y, built: false, unit });
    unit.buildBuilding({ building: b });
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
        if (this.selected && this.selected.includes(unit)) {
          this.selected = this.selected.filter((u) => u !== unit);
        }
      } else {
        units.push(unit);
      }
      return units;
    }, []);
    this.buildings.forEach((b) => b.tick({ player: this }));
    this.buildings = this.buildings.reduce((buildings, building) => {
      if (building.health <= 0) {
        // building.explode({ bloods, bloodChunks, sound });
        if (this.selected && this.selected.includes(building)) {
          this.selected = this.selected.filter((u) => u !== building);
        }
      } else {
        buildings.push(building);
      }
      return buildings;
    }, []);
  }

  static draw(drawer) {
    this.buildings.forEach((b) => b.draw(drawer));
    this.units.forEach((u) => u.draw(drawer));
  }
}

export default Player;
