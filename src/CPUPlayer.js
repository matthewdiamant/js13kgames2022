import Player from "./Player";
import { STATES } from "./Unit";
import { distance } from "./distance";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends Player {
  constructor({ map }) {
    super();
    this.color = "#00A";
    map.cpuBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
      this.addUnit({ type: "shade", x: 80 * x - 20, y: 80 * y });
    });
  }

  cpuActions({ map, mines }) {
    const MOVE_RATE = 0.05;
    const WORKER_BUILD_RATE = 0.001;
    const GOBLIN_BUILD_RATE = 0.001;

    // idle workers mine
    this.units
      .filter((unit) => unit.name === "shade" && unit.state === STATES.IDLE)
      .forEach((unit) => {
        mines.mines.sort((a, b) => distance(unit, a) - distance(unit, b));
        const [mine] = mines.mines;
        unit.setMining(mine);
      });

    // idle units randomly wander
    if (Math.random() < MOVE_RATE) {
      const unit = sample(this.units.filter((u) => u.state === STATES.IDLE));
      if (unit) {
        const path = [
          Math.floor(80 * 18 + 80 * Math.random() * 5),
          Math.floor(80 + 80 * Math.random() * 7),
        ];
        const success = unit.setPath(path, map);
        if (success) unit.state = STATES.MOVING;
        console.log(
          `cpu moving ${unit.name} to ${path}${success ? "" : ", but failed"}`
        );
      }
    }

    // randomly build workers
    const [base] = this.buildings.filter((b) => b.name === "base");
    if (Math.random() < WORKER_BUILD_RATE) {
      this.tryAction(base, "build shade");
    }

    // build one barracks
    if (
      this.buildings.filter((b) => b.name === "barracks").length === 0 &&
      this.resources >= 250
    ) {
      const builder = sample(this.units.filter((u) => u.builder));
      this.placeBuildingForConstruction({
        building: "barracks",
        x: base.x - 300,
        y: base.y,
        map,
        unit: builder,
      });
    }

    // randomly build goblins
    const [barracks] = this.buildings.filter((b) => b.name === "barracks");
    if (Math.random() < GOBLIN_BUILD_RATE) {
      this.tryAction(barracks, "build goblin");
    }
  }

  tryAction(building, actionName) {
    if (!building || !building.built) return false;
    const [action] = building
      .actions({ player: this })
      .filter(({ name }) => name === actionName);

    try {
      const success = action.execute({ player: this });
      console.log(
        `cpu executing ${action.name} on ${building.name}${
          success ? "" : ", but failed"
        }, and has ${this.resources} left`
      );
    } catch (e) {
      console.log("cpu errored on action", building, actionName);
    }
  }

  tick({ map, mines, particles, sound, targets }) {
    this.cpuActions({ map, mines });
    Player.tick.call(this, { map, particles, sound, targets });
  }

  draw(drawer) {
    Player.draw.call(this, drawer);
  }
}

export default CPUPlayer;
