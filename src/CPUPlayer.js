import Player from "./Player";

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

class CPUPlayer extends Player {
  constructor() {
    super();
    this.color = "#00A";
    this.addUnit({ type: "worker", x: 900, y: 580 });
    this.addBuilding({ type: "base", x: 80 * 12, y: 80 * 4 });
  }

  cpuActions() {
    if (Math.random() < 0.01) {
      const unit = sample(this.units);
      const path = [
        Math.floor(80 * 8 + 80 * Math.random() * 5),
        Math.floor(80 * Math.random() * 7),
      ];
      unit.setPath(path);
      console.log(`cpu moving ${unit.name} to ${path}`);
    }
    if (Math.random() < 0.001) {
      const base = this.buildings[0];
      const [buildWorker] = base
        .actions({ player: this })
        .filter(({ name }) => name === "build worker");

      buildWorker.execute({ player: this });
      console.log(
        `cpu executing ${buildWorker.name} on ${base.name} and has ${this.resources} left`
      );
    }
  }

  tick() {
    this.cpuActions();
    Player.tick.call(this);
  }
}

export default CPUPlayer;
