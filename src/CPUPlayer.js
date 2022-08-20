import Player from "./Player";
import { STATES } from "./Unit";
import { distance } from "./distance";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends Player {
  constructor({ map }) {
    super();
    this.color = "#00A";
    this.addUnit({ type: "shade", x: 80 * 18, y: 80 * 6 });
    this.addUnit({ type: "goblin", x: 80 * 18, y: 80 * 6 });
    map.cpuBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
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

    // build one barracks
    if (
      this.buildings.filter((b) => b.name === "barracks").length === 0 &&
      this.resources >= 250
    ) {
      const builder = sample(this.units.filter((u) => u.builder));
      this.placeBuildingForConstruction({
        building: "barracks",
        x: 80 * 20,
        y: 80 * 8,
        map,
        unit: builder,
      });
    }

    // randomly build goblins
    const [barracks] = this.buildings.filter((b) => b.name === "barracks");
    if (barracks && barracks.built && Math.random() < GOBLIN_BUILD_RATE) {
      this.tryAction(barracks, "build goblin");
    }

    // randomly build workers
    if (Math.random() < WORKER_BUILD_RATE) {
      const [base] = this.buildings.filter((b) => b.name === "base");
      this.tryAction(base, "build worker");
    }
  }

  tryAction(building, actionName) {
    const [action] = building
      .actions({ player: this })
      .filter(({ name }) => name === actionName);

    const success = action.execute({ player: this });
    console.log(
      `cpu executing ${action.name} on ${building.name}${
        success ? "" : ", but failed"
      }, and has ${this.resources} left`
    );
  }

  tick({ bloods, bloodChunks, map, mines, sound, targets }) {
    this.cpuActions({ map, mines });
    Player.tick.call(this, { bloods, bloodChunks, map, sound, targets });
  }

  draw(drawer) {
    Player.draw.call(this, drawer);
  }
}

export default CPUPlayer;
