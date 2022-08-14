import Player from "./Player";

class CPUPlayer extends Player {
  constructor() {
    super();
  }

  tick({ mouseEvents }) {
    Player.tick.call(this, { mouseEvents });
  }
}

export default CPUPlayer;
