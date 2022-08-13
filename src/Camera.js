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

  tick({ keyboard }) {
    const speed = 10;
    if (keyboard.isDown(keyboard.UP)) this.position_y -= speed;
    if (keyboard.isDown(keyboard.DOWN)) this.position_y += speed;
    if (keyboard.isDown(keyboard.LEFT)) this.position_x -= speed;
    if (keyboard.isDown(keyboard.RIGHT)) this.position_x += speed;
    this.clampX(Map.size - this.width);
    this.clampY(Map.size * (Map.tileSizeY / Map.tileSize) - this.height);

    this.x = this.position_x;
    this.y = this.position_y;
    this.applyShake();
  }
}

export default Camera;
