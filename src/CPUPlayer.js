import Player from "./Player";

class CPUPlayer extends Player {
  constructor() {
    super();
    this.color = "#00A";
    this.addUnit({ type: "worker", x: 900, y: 580 });
    this.addBuilding({ type: "base", x: 80 * 12, y: 80 * 4 });
  }

  tick() {
    Player.tick.call(this);
  }
}

export default CPUPlayer;
