const TIME = 300;

class SplashScreen {
  constructor() {
    this.time = TIME - 1;
    this.click = false;
  }

  tick({ mouse, music }) {
    const [x, y] = mouse.clickTarget;
    if (!this.click && (x || y)) {
      this.click = true;
      music.startMusic();
    }
    if (this.time > 0 && this.click) this.time -= 1;
  }

  draw(drawer) {
    const opacity =
      (this.time < 19 ? "0" : "") +
      Math.floor((this.time / TIME) * 256).toString(16);
    const fillColor = "#FFFFFF" + opacity;
    drawer.rect({
      adjusted: false,
      rect: [0, 0, drawer.width, drawer.height],
      fillColor: "#111111" + opacity,
    });
    const x = drawer.width / 2 - (19 * 40) / 2;
    const y = drawer.height / 2 - 300;
    drawer.text({
      text: "THERE CAN",
      x: 30 + x,
      y: 0 + y,
      size: 20,
      fillColor,
    });
    drawer.text({
      text: "BE ONLY",
      x: 110 + x,
      y: 150 + y,
      size: 20,
      fillColor,
    });
    drawer.text({
      text: "DEATH",
      x: 0 + x,
      y: 300 + y,
      size: 40,
      fillColor,
    });
    drawer.text({
      text: "Click to start",
      x: drawer.width / 2 - 135,
      y: 600 + y,
      size: 5,
      fillColor,
    });
  }
}

export default SplashScreen;
