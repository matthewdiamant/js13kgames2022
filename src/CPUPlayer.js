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
      const path = [80 * 8 + 80 * Math.random() * 5, 80 * Math.random() * 7];
      unit.setPath(path);
    }
  }

  tick() {
    this.cpuActions();
    Player.tick.call(this);
  }
}

export default CPUPlayer;
