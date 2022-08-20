import Map from "./Map";
import Unit from "./Unit";

export default {
  base: {
    name: "base",
    health: 1000,
    buildTime: 600,
    sizeX: Map.tileSize * 3,
    sizeY: Map.tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = {
        name: "build worker",
        cost: 100,
        time: 5 * 30,
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
            type: "shade",
            x: building.x + building.sizeX + 10,
            y: building.y + building.sizeY + 10,
          });
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      };
    },
  },
  barracks: {
    name: "barracks",
    health: 500,
    buildTime: 300,
    sizeX: Map.tileSize * 3,
    sizeY: Map.tileSize * 3,
    actions: ({ building, output, player }) => {
      output[0] = {
        name: "build goblin",
        cost: 100,
        time: 5 * 30,
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
            type: "goblin",
            x: building.x + building.sizeX + 10,
            y: building.y + building.sizeY + 10,
          });
        },
        drawIcon: (drawer, x, y) => {
          Unit.hudDrawIcon(drawer, x, y);
        },
      };
    },
  },
};
