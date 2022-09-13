class Keyboard {
  constructor() {
    document.addEventListener("keyup", (event) => this.onKeyup(event));
    document.addEventListener("keydown", (event) => this.onKeydown(event));

    this._pressed = {};

    this.LEFT = { keyboard: [37], dir: "l" };
    this.UP = { keyboard: [38] };
    this.RIGHT = { keyboard: [39], dir: "r" };
    this.DOWN = { keyboard: [40] };
  }

  isDownKeyboard(keyCode) {
    return keyCode.some((key) => this._pressed[key]);
  }

  isDown(keyCode) {
    return this.isDownKeyboard(keyCode.keyboard) || false;
  }

  onKeydown(event) {
    this._pressed[event.keyCode] = true;
  }

  onKeyup(event) {
    delete this._pressed[event.keyCode];
  }
}

export default Keyboard;
