import Player from "./Player";

class CPUPlayer extends Player {
  constructor() {
    super();
  }

  tick() {
    Player.tick.call(this);
  }
}

export default CPUPlayer;
