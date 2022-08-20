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

  adjustX(x) {
    return x - this.x;
  }

  adjustY(y) {
    return y - this.y;
  }

  clampX(maxX) {
    this.position_x = Math.min(Math.max(0, this.position_x), maxX);
  }

  clampY(maxY) {
    this.position_y = Math.min(Math.max(0, this.position_y), maxY);
  }

  shake(force, duration) {
    if (force >= this.shakeForce || this.shakeRemaining === 0) {
      this.shakeRemaining = duration;
      this.shakeForce = force;
    }
  }

  applyShake() {
    this.shakeRemaining = Math.max(0, this.shakeRemaining - 1);
    if (!this.shakeRemaining) return;
    const shakeX = Math.random() * this.shakeForce * 2 - this.shakeForce;
    const shakeY = Math.random() * this.shakeForce * 2 - this.shakeForce;
    this.x += shakeX;
    this.y += shakeY;
  }

  tick({ keyboard, mouse }) {
    const SPEED = 15;
    const THRESHOLD = 50;
    const [mx, my] = mouse.mouseScreenLocation;

    if (keyboard.isDown(keyboard.UP) || my < THRESHOLD)
      this.position_y -= SPEED;
    if (keyboard.isDown(keyboard.DOWN) || my > this.height - THRESHOLD)
      this.position_y += SPEED;
    if (keyboard.isDown(keyboard.LEFT) || mx < THRESHOLD)
      this.position_x -= SPEED;
    if (keyboard.isDown(keyboard.RIGHT) || mx > this.width - THRESHOLD)
      this.position_x += SPEED;

    this.clampX(Map.size - this.width);
    this.clampY(Map.size * (Map.tileSizeY / Map.tileSize) - this.height);

    this.x = this.position_x;
    this.y = this.position_y;
    this.applyShake();
  }
}

export default Camera;
