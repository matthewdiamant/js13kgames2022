import Player from "./Player";
import { STATES } from "./Unit";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends Player {
  constructor({ map }) {
    super();
    this.color = "#00A";
    this.addUnit({ type: "shade", x: 80 * 18, y: 80 * 6 });
    map.cpuBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
    });
  }

  cpuActions({ map }) {
    const MOVE_RATE = 0.01;
    const WORKER_BUILD_RATE = 0.001;
    if (Math.random() < MOVE_RATE) {
      const unit = sample(this.units);
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
    if (Math.random() < WORKER_BUILD_RATE) {
      const base = this.buildings[0];
      const [action] = base
        .actions({ player: this })
        .filter(({ name }) => name === "build worker");

      const success = action.execute({ player: this });
      console.log(
        `cpu executing ${action.name} on ${base.name}${
          success ? "" : ", but failed"
        }, and has ${this.resources} left`
      );
    }
  }

  tick({ bloods, bloodChunks, map, sound, targets }) {
    this.cpuActions({ map });
    Player.tick.call(this, { bloods, bloodChunks, map, sound, targets });
  }
}

export default CPUPlayer;
