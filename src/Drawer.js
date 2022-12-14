import Camera from "./Camera";
import HUD from "./HUD";
import Map from "./Map";

let cx = null;

export default class Drawer {
  constructor() {
    let canvas = document.querySelector("canvas");
    this.canvas = canvas;
    cx = this.canvas.getContext("2d");
    this.camera = new Camera();

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

    this.miniMapObjects = [];
  }

  draw(d) {
    cx.save();
    d();
    cx.restore();
  }

  clearBackground() {
    cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(start, end) {
    this.draw(() => {
      const gradient = cx.createLinearGradient(
        0,
        0,
        this.height - HUD.HUD_HEIGHT,
        this.width
      );

      gradient.addColorStop(0, start);
      gradient.addColorStop(1, end);

      cx.fillStyle = gradient;

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

  triangle({ x, y, adjusted = true, fillColor, rotation, size }) {
    this.draw(() => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      if (rotation) {
        cx.translate(x + size / 2, y + size / 2);
        cx.rotate(rotation);
        cx.translate(-1 * x - size / 2, -1 * y - size / 2);
      }
      if (fillColor) {
        let region = new Path2D();
        region.moveTo(x, y);
        region.lineTo(x + size, y);
        region.lineTo(x, y + size);
        region.closePath();

        cx.fillStyle = fillColor;
        cx.fill(region);
      }
    });
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

  lines({
    lines,
    shadowBlur = 0,
    shadowColor,
    fillColor,
    strokeColor,
    adjusted = true,
  }) {
    cx.beginPath();
    let sx = lines[0][0];
    let sy = lines[0][1];
    if (adjusted) {
      sx = this.camera.adjustX(sx, this.canvas.width);
      sy = this.camera.adjustY(sy, this.canvas.height);
    }
    cx.moveTo(sx, sy);
    lines.slice(1).forEach(([x, y]) => {
      if (adjusted) {
        x = this.camera.adjustX(x, this.canvas.width);
        y = this.camera.adjustY(y, this.canvas.height);
      }
      cx.lineTo(x, y);
    });
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

  miniMap({ x, y, size, sizeX, sizeY, color }) {
    const miniMapSize = 250;
    this.miniMapObjects.push(() =>
      this.rect({
        adjusted: false,
        fillColor: color,
        rect: [
          (x / Map.size) * miniMapSize + HUD.HUD_PADDING,
          this.canvas.height -
            miniMapSize +
            (y / Map.size) * miniMapSize -
            HUD.HUD_PADDING,
          sizeX || size,
          sizeY || size,
        ],
      })
    );
  }

  clearMiniMap() {
    this.miniMapObjects = [];
  }

  renderMiniMap() {
    this.miniMapObjects.forEach((obj) => {
      this.draw(obj);
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
letters["K"] = [
  [1, , , 1],
  [1, , 1],
  [1, 1],
  [1, , 1],
  [1, , , 1],
];
letters["L"] = [[1], [1], [1], [1], [1, 1, 1]];
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
letters["Y"] = [
  [1, , 1],
  [1, , 1],
  [, 1],
  [, 1],
  [, 1],
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
  [, , 1],
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
];
letters["3"] = [
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["4"] = [
  [1, , 1],
  [1, , 1],
  [1, 1, 1],
  [, , 1],
  [, , 1],
];
letters["5"] = [
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["6"] = [
  [1, 1, 1],
  [1, ,],
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
];
letters["7"] = [
  [1, 1, 1],
  [, , 1],
  [, , 1],
  [, , 1],
  [, , 1],
];
letters["8"] = [
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
];
letters["9"] = [
  [1, 1, 1],
  [1, , 1],
  [1, 1, 1],
  [, , 1],
  [1, 1, 1],
];
letters["/"] = [
  [, , 1],
  [, , 1],
  [, 1],
  [1, ,],
  [1, ,],
];
letters["!"] = [
  [, 1],
  [, 1],
  [, 1],
  [, ,],
  [, 1],
];
