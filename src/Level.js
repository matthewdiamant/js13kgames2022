class Level {
  constructor() {}

  tick({ humanPlayer, cpuPlayer }) {
    if (cpuPlayer.entities().length === 0) {
      console.log("VICTORY");
    }
    if (humanPlayer.entities().length === 0) {
      console.log("DEFEAT");
    }
  }

  draw(drawer) {}
}

export default Level;
