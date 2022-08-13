/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Background.js":
/*!***************************!*\
  !*** ./src/Background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Background; });
class Background {
  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground();
    });
  }
}


/***/ }),

/***/ "./src/Building.js":
/*!*************************!*\
  !*** ./src/Building.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");


class Building {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sizeX = _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 3;
    this.sizeY = _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize * 2;
    this.lifespan = 0;
    this.selected = false;
  }

  tick() {}

  draw(drawer) {
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.sizeX / 2,
          this.y + this.sizeY,
          (this.sizeX + 40) / 2,
          this.sizeY / 4,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#39C",
        strokeWidth: 5,
      });
    }

    drawer.rect({
      fillColor: "#A33",
      rect: [this.x, this.y, this.sizeX, this.sizeY],
    });

    drawer.miniMap({
      x: this.x,
      y: this.y,
      color: "#C33",
      sizeX: Math.ceil(this.sizeX / 20),
      sizeY: Math.ceil(this.sizeY / 20),
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Building);


/***/ }),

/***/ "./src/Camera.js":
/*!***********************!*\
  !*** ./src/Camera.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map */ "./src/Map.js");


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
    this.clampX(_Map__WEBPACK_IMPORTED_MODULE_0__["default"].size - this.width);
    this.clampY(_Map__WEBPACK_IMPORTED_MODULE_0__["default"].size * (_Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSizeY / _Map__WEBPACK_IMPORTED_MODULE_0__["default"].tileSize) - this.height);

    this.x = this.position_x;
    this.y = this.position_y;
    this.applyShake();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Camera);


/***/ }),

/***/ "./src/Drawer.js":
/*!***********************!*\
  !*** ./src/Drawer.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Drawer; });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/Camera.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map */ "./src/Map.js");



let cx = null;

class Drawer {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    cx = this.canvas.getContext("2d");
    this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_0__["default"]();

    let container = document.querySelector("body");
    let resize = () => {
      this.camera.height = window.innerHeight;
      this.camera.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      this.height = canvas.height;
      this.width = canvas.width;
    };
    resize();
    container.onresize = resize;
  }

  draw(d) {
    cx.save();
    d();
    cx.restore();
  }

  clearBackground() {
    cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.draw(() => {
      cx.fillStyle = "#242";
      cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  rect({
    rect,
    fillColor,
    strokeColor,
    shadowBlur = 0,
    shadowColor = "none",
    opacity,
    lineWidth = 1,
    adjusted = true,
    rotation,
    size,
    crisp = true,
  }) {
    if (crisp) {
      rect[0] = Math.floor(rect[0]);
      rect[1] = Math.floor(rect[1]);
    }
    if (adjusted) {
      rect[0] = this.camera.adjustX(rect[0], this.canvas.width);
      rect[1] = this.camera.adjustY(rect[1], this.canvas.height);
    }
    if (rotation) {
      cx.translate(rect[0] + size / 2, rect[1] + size / 2);
      cx.rotate(rotation);
      cx.translate(-1 * rect[0] - size / 2, -1 * rect[1] - size / 2);
    }
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (opacity) {
      cx.globalAlpha = opacity;
    }
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fillRect(...[rect[0], rect[1], ...rect.slice(2)]);
    }
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.lineWidth = lineWidth;
      cx.strokeRect(...[rect[0], rect[1], ...rect.slice(2)]);
    }
    cx.shadowBlur = 0;
    cx.globalAlpha = 1;
  }

  ellipse({
    ellipse,
    adjusted = true,
    fillColor,
    strokeColor,
    strokeWidth = 1,
    shadowBlur,
    shadowColor,
  }) {
    if (adjusted) {
      ellipse[0] = this.camera.adjustX(ellipse[0], this.canvas.width);
      ellipse[1] = this.camera.adjustY(ellipse[1], this.canvas.height);
    }
    cx.beginPath();
    cx.ellipse(...ellipse);
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.lineWidth = strokeWidth;
      cx.stroke();
    }
    cx.shadowBlur = 0;
  }

  text({ text, x, y, fillColor = "#fff", size = 1 }) {
    cx.fillStyle = fillColor;

    let currX = 0;

    text
      .toUpperCase()
      .split("")
      .map((c) => {
        if (!letters[c]) console.log(c);
        return letters[c];
      })
      .forEach((letter) => {
        let currY = 0;
        let addX = 0;
        letter.forEach((row) => {
          row.forEach((bit, i) => {
            bit && cx.fillRect(currX + i * size + x, currY + y, size, size);
          });
          addX = Math.max(addX, row.length * size);
          currY += size;
        });
        currX += size + addX;
      });
  }

  lines({ lines, shadowBlur = 0, shadowColor, fillColor, strokeColor }) {
    cx.beginPath();
    cx.moveTo(lines[0][0], lines[0][1]);
    lines.slice(1).map((line) => cx.lineTo(line[0], line[1]));
    cx.closePath();
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.stroke();
    }
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
  }

  emoji({ emoji, x, y, flipped, adjusted = true }) {
    this.draw(() => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      if (flipped) {
        // cx.scale(-1, 1);
        // cx.translate(canvasWidth.width / 2, canvasHeight.height / 2);
      }

      cx.font = "6px serif";
      cx.fillText(emoji, x, y + 2);
    });
  }

  miniMap({ x, y, size, sizeX, sizeY, color }) {
    this.draw(() => {
      this.rect({
        adjusted: false,
        fillColor: color,
        rect: [
          this.canvas.width - 200 + (x / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size) * 200,
          this.canvas.height - 200 + (y / _Map__WEBPACK_IMPORTED_MODULE_1__["default"].size) * 200,
          sizeX || size,
          sizeY || size,
        ],
      });
    });
  }

  hitbox({ x, y, size }) {
    this.rect({
      rect: [x - size / 2, y - size / 2, size, size],
      color: "#f00",
    });
  }
}

const letters = {};
letters["A"] = [
  [, 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
];
letters["B"] = [
  [1, 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, 1],
];
letters["C"] = [[1, 1, 1], [1], [1], [1], [1, 1, 1]];
letters["D"] = [
  [1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1],
];
letters["E"] = [[1, 1, 1], [1], [1, 1, 1], [1], [1, 1, 1]];
letters["F"] = [[1, 1, 1], [1], [1, 1], [1], [1]];
letters["G"] = [[, 1, 1], [1], [1, , 1, 1], [1, , , 1], [, 1, 1]];
letters["H"] = [
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
];
letters["I"] = [
  [1, 1, 1],
  [, 1],
  [, 1],
  [, 1],
  [1, 1, 1],
];
letters["J"] = [
  [1, 1, 1],
  [, , 1],
  [, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["K"] = [
  [1, , , 1],
  [1, , 1],
  [1, 1],
  [1, , 1],
  [1, , , 1],
];
letters["L"] = [[1], [1], [1], [1], [1, 1, 1]];
letters["M"] = [
  [1, 1, 1, 1, 1],
  [1, , 1, , 1],
  [1, , 1, , 1],
  [1, , , , 1],
  [1, , , , 1],
];
letters["N"] = [
  [1, , , 1],
  [1, 1, , 1],
  [1, , 1, 1],
  [1, , , 1],
  [1, , , 1],
];
letters["O"] = [
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["P"] = [[1, 1, 1], [1, , 1], [1, 1, 1], [1], [1]];
letters["Q"] = [
  [0, 1, 1],
  [1, , , 1],
  [1, , , 1],
  [1, , 1, 1],
  [1, 1, 1, 1],
];
letters["R"] = [
  [1, 1],
  [1, , 1],
  [1, , 1],
  [1, 1],
  [1, , 1],
];
letters["S"] = [[1, 1, 1], [1], [1, 1, 1], [, , 1], [1, 1, 1]];
letters["T"] = [
  [1, 1, 1],
  [, 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["U"] = [
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["V"] = [
  [1, , , , 1],
  [1, , , , 1],
  [, 1, , 1],
  [, 1, , 1],
  [, , 1],
];
letters["W"] = [
  [1, , , , 1],
  [1, , , , 1],
  [1, , , , 1],
  [1, , 1, , 1],
  [1, 1, 1, 1, 1],
];
letters["X"] = [
  [1, , , , 1],
  [, 1, , 1],
  [, , 1],
  [, 1, , 1],
  [1, , , , 1],
];
letters["Y"] = [
  [1, , 1],
  [1, , 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["Z"] = [
  [1, 1, 1, 1, 1],
  [, , , 1],
  [, , 1],
  [, 1],
  [1, 1, 1, 1, 1],
];
letters[" "] = [
  [, ,],
  [, ,],
  [, ,],
  [, ,],
  [, ,],
];
letters["0"] = [
  [1, 1, 1],
  [1, , 1],
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
];
letters["1"] = [
  [, 1],
  [, 1],
  [, 1],
  [, 1],
  [, 1],
];
letters["2"] = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];
letters["3"] = [
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
];
letters["4"] = [
  [1, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
];
letters["5"] = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
];
letters["6"] = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
letters["7"] = [
  [1, 1, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
];
letters["8"] = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
letters["9"] = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 0, 1],
  [1, 1, 1],
];


/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Keyboard {
  constructor() {
    document.addEventListener("keyup", (event) => this.onKeyup(event));
    document.addEventListener("keydown", (event) => this.onKeydown(event));

    this._pressed = {};

    this.SPACE = { keyboard: [32], controller: [0, 1, 5, 7] };
    this.LEFT = { keyboard: [37, 65], controller: [14], dir: "l" };
    this.UP = { keyboard: [38, 87, 16, 17], controller: [12, 2, 3] };
    this.RIGHT = { keyboard: [39, 68], controller: [15], dir: "r" };
    this.DOWN = { keyboard: [40, 83], controller: [13] };
  }

  isDownControllerStick(dir) {
    if (!navigator.getGamepads()[0]) return false;
    const axes = navigator.getGamepads()[0].axes;

    return {
      l: axes[0] < 0,
      r: axes[0] > 0,
    }[dir];
  }

  isDownController(keyCode) {
    if (!navigator.getGamepads()[0]) return false;

    return navigator
      .getGamepads()[0]
      .buttons.reduce((acc, b, i) => (b.pressed ? acc.concat([i]) : acc), [])
      .some((b) => keyCode.includes(b));
  }

  isDownKeyboard(keyCode) {
    return keyCode.some((key) => this._pressed[key]);
  }

  isDown(keyCode) {
    return (
      this.isDownControllerStick(keyCode.dir) ||
      this.isDownKeyboard(keyCode.keyboard) ||
      this.isDownController(keyCode.controller) ||
      false
    );
  }

  onKeydown(event) {
    this._pressed[event.keyCode] = true;
  }

  onKeyup(event) {
    delete this._pressed[event.keyCode];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Keyboard);


/***/ }),

/***/ "./src/Map.js":
/*!********************!*\
  !*** ./src/Map.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Map {
  constructor() {
    this.map = [];
    for (let y = 0; y < Map.size / Map.tileSize; y++) {
      const row = [];
      for (let x = 0; x < Map.size / Map.tileSize; x++) {
        row.push((x + y) % 2);
      }
      this.map.push(row);
    }
  }

  tick() {}

  draw(drawer) {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const color = cell ? "#bbb" : "#ddd";
        drawer.rect({
          fillColor: color,
          rect: [
            x * Map.tileSizeX,
            y * Map.tileSizeY,
            Map.tileSizeX,
            Map.tileSizeY,
          ],
        });
      });
    });

    // minimap
    const minimapSize = 200;
    drawer.rect({
      adjusted: false,
      fillColor: "#eee",
      rect: [
        drawer.width - minimapSize,
        drawer.height - minimapSize,
        minimapSize,
        minimapSize,
      ],
    });

    const x =
      drawer.width -
      minimapSize +
      (drawer.camera.position_x / Map.size) * minimapSize;
    const y =
      drawer.height -
      minimapSize +
      (drawer.camera.position_y / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
        minimapSize;
    drawer.rect({
      adjusted: false,
      strokeColor: "#333",
      rect: [
        x,
        y,
        (drawer.width / Map.size) * minimapSize,
        (drawer.height / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
          minimapSize,
      ],
    });
  }
}

Map.mapAdjust = (x, y) => [
  (x * Map.tileSizeX) / Map.tileSize,
  (y * Map.tileSizeY) / Map.tileSize,
];

Map.size = 4000;
Map.tileSize = 80;
Map.tileSizeX = 80;
Map.tileSizeY = 80;

/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./src/Mouse.js":
/*!**********************!*\
  !*** ./src/Mouse.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DRAG_THRESHOLD = 20;

class Mouse {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    this.canvas.addEventListener("click", (event) => this.click(event));
    this.canvas.addEventListener("mousedown", (event) => this.mousedown(event));
    this.canvas.addEventListener("mouseup", (event) => this.mouseup(event));
    this.canvas.addEventListener("mousemove", (event) => this.mousemove(event));
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.rightClick(event);
    });
    this.clickCoords = [null, null];
    this.dragging = false;
    this.prevDragging = false;
    this.releaseDrag = null;
    this.startDragLocation = [null, null];
  }

  tick({ camera }) {
    this.camera = camera;

    this.releaseDrag = null;
    if (this.prevDragging && !this.dragging) {
      if (
        Math.abs(this.startDragLocation[0] - this.mouseLocation[0]) >
          DRAG_THRESHOLD ||
        Math.abs(this.startDragLocation[1] - this.mouseLocation[1]) >
          DRAG_THRESHOLD
      ) {
        this.releaseDrag = this.startDragLocation.concat(this.mouseLocation);
        this.startDragLocation = [null, null];
      }
    }
    this.prevDragging = this.dragging;

    const clickTarget = this.clickCoords;
    const rightClickTarget = this.rightClickCoords;
    const releaseDrag = this.releaseDrag;
    this.clickCoords = this.rightClickCoords = [null, null];
    return { clickTarget, rightClickTarget, releaseDrag };
  }

  click({ clientX, clientY }) {
    this.clickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  mousedown({ clientX, clientY }) {
    this.startDragLocation = [clientX + this.camera.x, clientY + this.camera.y];
    this.dragging = true;
  }

  mouseup() {
    this.dragging = false;
  }

  mousemove({ clientX, clientY }) {
    this.mouseLocation = [clientX + this.camera.x, clientY + this.camera.y];
  }

  rightClick({ clientX, clientY }) {
    this.rightClickCoords = [clientX + this.camera.x, clientY + this.camera.y];
  }

  draw(drawer) {
    if (this.dragging) {
      drawer.rect({
        rect: [
          this.startDragLocation[0],
          this.startDragLocation[1],
          this.mouseLocation[0] - this.startDragLocation[0],
          this.mouseLocation[1] - this.startDragLocation[1],
        ],
        strokeColor: "#369",
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Mouse);


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Building__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Building */ "./src/Building.js");
/* harmony import */ var _Unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Unit */ "./src/Unit.js");



const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.h + rect1.y > rect2.y;

class Player {
  constructor() {
    this.units = [
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](100, 200),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](300, 200),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](500, 200),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](700, 200),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](100, 400),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](300, 400),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](500, 400),
      new _Unit__WEBPACK_IMPORTED_MODULE_1__["default"](700, 400),
    ];

    this.buildings = [new _Building__WEBPACK_IMPORTED_MODULE_0__["default"](400, 80 * 8)];
    this.selected = null;
  }

  dragSelect(mouseEvents, entities) {
    const collisions = entities.filter((entity) => {
      let { x, y, size, sizeX, sizeY } = entity;
      let [mx, my, endx, endy] = mouseEvents.releaseDrag;
      return boxCollision(
        { x, y, w: sizeX || size, h: sizeY || size },
        { x: mx, y: my, w: endx - mx, h: endy - my }
      );
    });
    if (collisions.length) {
      entities.forEach((entity) => (entity.selected = false));
      collisions.forEach((entity) => (entity.selected = true));
    }
  }

  clickSelect(mouseEvents, entities) {
    let [mouseX, mouseY] = mouseEvents.clickTarget;
    if (mouseX || mouseY) {
      entities.forEach((entity) => {
        let { x, y, size, sizeX, sizeY } = entity;
        if (
          mouseX >= x &&
          mouseX < x + (size || sizeX) &&
          mouseY >= y &&
          mouseY < y + (size || sizeY)
        ) {
          entities.forEach((entity) => (entity.selected = false));
          this.selected = entity;
          entity.selected = true;
        }
      });
    }
  }

  select(mouseEvents) {
    const entities = [this.units, this.buildings].flat();
    if (mouseEvents.releaseDrag) {
      this.dragSelect(mouseEvents, entities);
    } else {
      this.clickSelect(mouseEvents, entities);
    }
  }

  tick({ mouseEvents }) {
    this.select(mouseEvents);
    this.units.forEach((u) => u.tick({ mouseEvents }));
    this.buildings.forEach((b) => b.tick());
  }

  draw(drawer) {
    this.units.forEach((u) => u.draw(drawer));
    this.buildings.forEach((b) => b.draw(drawer));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./src/Unit.js":
/*!*********************!*\
  !*** ./src/Unit.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const IDLE = "idle";
const WALKING = "walking";

class Unit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 40;
    this.lifespan = 0;
    this.selected = false;
    this.speed = 5;
    this.path = [];
  }

  setPath(target) {
    this.path = [target];
  }

  calculateSpeed() {
    let [targetX, targetY] = this.path[0];

    // normalize vector
    let u = Math.sqrt(
      Math.pow(this.x - targetX, 2) + Math.pow(this.y - targetY, 2)
    );

    // if close enough to destination, remove waypoint
    if (u > this.speed) {
      this.dx = this.speed * ((targetX - this.x) / Math.abs(u));
      this.dy = this.speed * ((targetY - this.y) / Math.abs(u));
    } else {
      this.path.pop();
    }
  }

  move() {
    if (this.path.length) {
      this.calculateSpeed();
      this.state = WALKING;
    } else {
      this.dx = 0;
      this.dy = 0;
      this.state = IDLE;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  tick({ mouseEvents }) {
    this.lifespan += 1;

    if (
      this.selected &&
      (mouseEvents.rightClickTarget[0] || mouseEvents.rightClickTarget[1])
    ) {
      this.setPath(mouseEvents.rightClickTarget);
    }

    this.move();
  }

  draw(drawer) {
    if (this.selected) {
      drawer.ellipse({
        ellipse: [
          this.x + this.size / 2,
          this.y + this.size,
          (this.size + 20) / 2,
          this.size / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#39C",
        strokeWidth: 5,
      });
    }

    drawer.rect({
      fillColor: "#A33",
      rect: [this.x, this.y, this.size, this.size],
    });

    drawer.miniMap({
      x: this.x,
      y: this.y,
      color: "#C33",
      size: Math.ceil(this.size / 20),
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Unit);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Background */ "./src/Background.js");
/* harmony import */ var _Drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Drawer */ "./src/Drawer.js");
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Map */ "./src/Map.js");
/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Mouse */ "./src/Mouse.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Player */ "./src/Player.js");







let fps = 60,
  interval = 1000 / fps,
  lastTime = 0,
  delta = 0;

/*
import Sound from "./Sound";
import CollisionDetector from "./CollisionDetector";

import Level from "./Level";
import Map from "./Map";
import HUD from "./HUD";
import EnemyCollection from "./EnemyCollection";
import ProjectileCollection from "./ProjectileCollection";
import BloodCollection from "./BloodCollection";
import PackageCollection from "./PackageCollection";
*/

window.onload = () => {
  let drawer = new _Drawer__WEBPACK_IMPORTED_MODULE_1__["default"]();

  let background = new _Background__WEBPACK_IMPORTED_MODULE_0__["default"]({
    cw: drawer.canvas.width,
    ch: drawer.canvas.height,
  });
  let keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_2__["default"]();
  let mouse = new _Mouse__WEBPACK_IMPORTED_MODULE_4__["default"]();

  let map = new _Map__WEBPACK_IMPORTED_MODULE_3__["default"]();
  let player = new _Player__WEBPACK_IMPORTED_MODULE_5__["default"]();

  /*
  let sound = new Sound();
  let collisionDetector = new CollisionDetector();


  let level = new Level();
  let hud = new HUD();
  let enemies = new EnemyCollection();
  let projectiles = new ProjectileCollection();
  let spurts = new BloodCollection();
  let chunks = { chunks: [] };
  let packages = new PackageCollection();

  level.initializeLevel(1, {
    player,
    enemies,
    chunks,
    spurts,
    packages,
    map,
  });
  */

  let gameLoop = (currentTime) => {
    window.requestAnimationFrame(gameLoop);
    if (currentTime - lastTime) {
      tick();
      drawer.clearBackground();
      drawObjects().map((object) => object.draw(drawer));
      lastTime = currentTime - (delta % interval);
    }
  };

  let tick = () => {
    const { camera } = drawer;
    camera.tick({ keyboard });
    const mouseEvents = mouse.tick({ camera });
    player.tick({ mouseEvents });

    /*
    level.tick({
      player,
      enemies,
      chunks,
      spurts,
      packages,
      sound,
      map,
      background,
    });
    player.tick({ camera, keyboard, map, projectiles, sound, chunks, spurts });
    enemies.tick({
      camera,
      map,
      projectiles,
      spurts,
      chunks,
      player,
      sound,
      level,
    });
    camera.tick({ player, map });
    projectiles.tick();
    spurts.tick();

    if (chunks.chunks.length > 1000) {
      chunks.chunks = chunks.chunks.slice(chunks.chunks.length - 1000);
    }
    chunks.chunks.forEach((chunk) => chunk.tick());

    hud.tick(player, enemies, level.level.enemyColor);
    packages.tick(map, level.level.level);
    */
  };

  let drawObjects = () => [background, map, player, mouse];

  gameLoop();
};


/***/ })

/******/ });
//# sourceMappingURL=main.js.map