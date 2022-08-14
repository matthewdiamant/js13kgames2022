import Player from "./Player";

class CPUPlayer extends Player {
  constructor() {
    super();
    this.color = "#00A";
    this.addUnit({ type: "worker", x: 900, y: 580 });
  }

  tick() {
    Player.tick.call(this);
  }
}

export default CPUPlayer;
