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
      Unit.hudDrawIcon(drawer, x, y);
    },
  };
};

function drawBuilding(drawer, x, y, width, height, color, opacity = "F") {
  drawer.rect({
    fillColor: "#A33" + opacity,
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
    fillColor: "#A33" + opacity,
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
    fillColor: "#A55" + opacity,
  });

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
    drawBuilding,
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
    },
    drawBuilding,
  },
};
