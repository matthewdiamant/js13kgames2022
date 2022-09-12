import Map from "./Map";
import Unit from "./Unit";
import unitTypes from "./unitTypes";

const buildUnit = (type, building, player) => {
  const { name, cost, buildTime } = unitTypes[type];
  return {
    name: `build ${name}`,
    cost: cost,
    time: buildTime,
    actionable: function () {
      return this.cost <= player.resources;
    },
    execute: function ({ player }) {
      if (building.tasks.length < 5 && player.resources >= this.cost) {
        player.resources -= this.cost;
        building.queueTask(this, { player });
        return true;
      }
      return false;
    },
    complete: ({ player }) => {
      player.addUnit({
        type,
        x: building.x + building.sizeX + 10,
        y: building.y + building.sizeY + 10,
      });
    },
    drawIcon: (drawer, x, y) => {
      const options = unitTypes[name];
      Unit.hudDrawIcon(drawer, x, y, options);
    },
  };
};

const drawBuilding = (
  drawer,
  x,
  y,
  width,
  height,
  color,
  opacity = "F",
  accessory
) => {
  drawer.rect({
    fillColor: "#544" + opacity,
    rect: [x, y + Map.tileSize, width, height],
  });

  drawer.ellipse({
    ellipse: [
      x + width / 2,
      y + height + Map.tileSize,
      width / 2,
      height / 4,
      0,
      0,
      2 * Math.PI,
    ],
    fillColor: "#544" + opacity,
  });

  drawer.ellipse({
    ellipse: [
      x + width / 2,
      y + Map.tileSize,
      width / 2,
      height / 4,
      0,
      0,
      2 * Math.PI,
    ],
    fillColor: "#655" + opacity,
  });

  if (accessory === "flag") {
    const FLAGPOLE_WIDTH = 10;
    const FLAGPOLE_HEIGHT = 100;
    drawer.rect({
      fillColor: "#666" + opacity,
      rect: [
        x + width / 2 - FLAGPOLE_WIDTH / 2,
        y - FLAGPOLE_HEIGHT + Map.tileSize,
        FLAGPOLE_WIDTH,
        FLAGPOLE_HEIGHT,
      ],
    });
    drawer.rect({
      fillColor: color + opacity,
      rect: [
        x + width / 2 + FLAGPOLE_WIDTH / 2,
        y - FLAGPOLE_HEIGHT + Map.tileSize,
        60,
        40,
      ],
    });
  }

  if (accessory === "shield") {
    const sx = 70;
    const sy = 150;
    drawer.ellipse({
      ellipse: [x + sx, y + sy, 100, 100, 0, 0, Math.PI / 3],
      fillColor: color + opacity,
    });
    drawer.ellipse({
      ellipse: [
        x + sx + 100,
        y + sy,
        100,
        100,
        0,
        (2 * Math.PI) / 3,
        (3 * Math.PI) / 3,
      ],
      fillColor: color + opacity,
    });
    drawer.lines({
      lines: [
        [x + sx, y + sy],
        [x + sx + 100, y + sy],
        [x + sx + 50, y + sy + (100 * 3 ** (1 / 2)) / 2],
      ],
      fillColor: color + opacity,
    });
  }
};
export default {
  base: {
    name: "base",
    health: 50,
    buildTime: 600,
    cost: 400,
    sizeX: Map.tileSize * 3,
    sizeY: Map.tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = buildUnit("shade", building, player);
    },
    drawBuilding: (...args) => drawBuilding(...args, "flag"),
    drawIcon: (drawer, x, y) => {
      drawer.rect({
        adjusted: false,
        rect: [x + 14, y + 12, 7, 35],
        fillColor: "#666",
      });
      drawer.rect({
        adjusted: false,
        rect: [x + 21, y + 13, 25, 18],
        fillColor: "#0f0",
      });
    },
  },
  barracks: {
    name: "barracks",
    health: 50,
    buildTime: 300,
    cost: 150,
    sizeX: Map.tileSize * 3,
    sizeY: Map.tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = buildUnit("goblin", building, player);
      output[1] = buildUnit("brute", building, player);
      output[2] = buildUnit("speeder", building, player);
    },
    drawBuilding: (...args) => drawBuilding(...args, "shield"),
    drawIcon: (drawer, x, y) => {
      const sx = 11.5;
      const sy = 13;
      drawer.ellipse({
        adjusted: false,
        ellipse: [x + sx, y + sy, 36, 36, 0, 0, Math.PI / 3],
        fillColor: "#0f0",
      });
      drawer.ellipse({
        adjusted: false,
        ellipse: [
          x + sx + 36,
          y + sy,
          36,
          36,
          0,
          (2 * Math.PI) / 3,
          (3 * Math.PI) / 3,
        ],
        fillColor: "#0f0",
      });
      drawer.lines({
        adjusted: false,
        lines: [
          [x + sx, y + sy],
          [x + sx + 36, y + sy],
          [x + sx + 18, y + sy + (36 * 3 ** (1 / 2)) / 2],
        ],
        fillColor: "#0f0",
      });
    },
  },
};
