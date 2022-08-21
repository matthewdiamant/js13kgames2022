class Level {
  constructor() {
    this.defeat = false;
    this.victory = false;
  }

  tick({ humanPlayer, cpuPlayer }) {
    if (cpuPlayer.entities().length === 0) {
      this.victory = true;
    }
    if (humanPlayer.entities().length === 0) {
      this.defeat = true;
    }
  }

  draw(drawer) {
    const MESSAGE_WIDTH = 1000;
    const MESSAGE_HEIGHT = 200;
    const MESSAGE_Y_OFFSET = -100;
    if (this.victory) {
      drawer.rect({
        adjusted: false,
        rect: [
          (drawer.width - MESSAGE_WIDTH) / 2,
          (drawer.height - MESSAGE_HEIGHT) / 2 + MESSAGE_Y_OFFSET,
          MESSAGE_WIDTH,
          MESSAGE_HEIGHT,
        ],
        fillColor: "#111",
      });
      drawer.text({
        fillColor: "#EEE",
        text: "VICTORY!",
        x: (drawer.width - MESSAGE_WIDTH) / 2 + 140,
        y: (drawer.height - MESSAGE_HEIGHT) / 2 + 48 + MESSAGE_Y_OFFSET,
        size: 20,
      });
    }
    if (this.defeat) {
      drawer.rect({
        adjusted: false,
        rect: [
          (drawer.width - MESSAGE_WIDTH) / 2,
          (drawer.height - MESSAGE_HEIGHT) / 2 + MESSAGE_Y_OFFSET,
          MESSAGE_WIDTH,
          MESSAGE_HEIGHT,
        ],
        fillColor: "#111",
      });
      drawer.text({
        fillColor: "#EEE",
        text: "DEFEAT!",
        x: (drawer.width - MESSAGE_WIDTH) / 2 + 235,
        y: (drawer.height - MESSAGE_HEIGHT) / 2 + 48 + MESSAGE_Y_OFFSET,
        size: 20,
      });
    }
  }
}

export default Level;
