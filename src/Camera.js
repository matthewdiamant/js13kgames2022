import HUD from "./HUD";
import Map from "./Map";

class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.position_x = 0;
    this.position_y = 0;
    this.shakeRemaining = 0;
    this.shakeForce = 0;
  }

  setX(x) {
    this.position_x = this.clampX(x);
  }

  setY(y) {
    this.position_y = this.clampY(y);
  }

  adjustX(x) {
    return x - this.x;
  }

  adjustY(y) {
    return y - this.y;
  }

  clampX(x) {
    return Math.min(Math.max(0, x), Map.size - this.width);
  }

  clampY(y) {
    return Math.min(
      Math.max(0, y),
      Map.size * (Map.tileSizeY / Map.tileSize) - this.height
    );
  }

  tick({ keyboard, mouse }) {
    const SPEED = 15;
    const THRESHOLD = HUD.HUD_PADDING;
    const [mx, my] = mouse.mouseScreenLocation;

    if (keyboard.isDown(keyboard.UP) || my < THRESHOLD)
      this.position_y -= SPEED;
    if (keyboard.isDown(keyboard.DOWN) || my > this.height - THRESHOLD)
      this.position_y += SPEED;
    if (keyboard.isDown(keyboard.LEFT) || mx < THRESHOLD)
      this.position_x -= SPEED;
    if (keyboard.isDown(keyboard.RIGHT) || mx > this.width - THRESHOLD)
      this.position_x += SPEED;

    this.setX(this.position_x);
    this.setY(this.position_y);

    this.x = this.position_x;
    this.y = this.position_y;
  }
}

export default Camera;
