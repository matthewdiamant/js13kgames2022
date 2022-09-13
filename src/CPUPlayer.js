import Player from "./Player";
import { STATES } from "./Unit";
import { distance } from "./distance";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends Player {
  constructor({ map }) {
    super();
    this.color = "#00A";
    this.miniMapColor = "#F00";
    map.cpuBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
      this.addBuilding({ type: "barracks", x: 80 * x - 400, y: 80 * y });
    });
    this.addBuilding({ type: "barracks", x: 80 * 38, y: 80 * 41 });
    map.cpuShades.forEach(([x, y]) => {
      this.addUnit({ type: "shade", x: 80 * x, y: 80 * y });
    });
    map.cpuGoblins.forEach(([x, y]) => {
      this.addUnit({ type: "goblin", x: 80 * x, y: 80 * y });
    });
    this.lifespan = 0;
  }

  cpuActions({ map, mines }) {
    const MOVE_RATE = 0.0;
    const bases = this.buildings.filter((b) => b.name === "base");

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

    // build workers
    const MAX_WORKERS = 10;
    const builders = this.units.filter((u) => u.builder);
    const [base] = bases;
    if (base && !(this.lifespan % 300) && builders.length < MAX_WORKERS) {
      this.tryAction(base, "build shade");
    }

    // build goblins
    const MAX_FIGHTERS = 20;
    const fighters = this.units.filter((u) => !u.builder);
    const [barracks] = this.buildings.filter((b) => b.name === "barracks");
    if (barracks && !(this.lifespan % 300) && fighters.length < MAX_FIGHTERS) {
      this.tryAction(barracks, "build goblin");
      if (bases.length < 3) this.tryAction(barracks, "build brute");
      if (bases.length < 2) this.tryAction(barracks, "build speeder");
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
    this.lifespan += 1;
    this.cpuActions({ map, mines });
    Player.tick.call(this, { map, particles, sound, targets });
  }

  draw(drawer) {
    Player.draw.call(this, drawer);
  }
}

export default CPUPlayer;
