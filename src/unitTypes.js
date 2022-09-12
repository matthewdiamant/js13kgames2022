const makeColors = ([skin, eyes, body]) => ({ skin, eyes, body });

// prettier-ignore
export const shadeColors = (color) => makeColors(["#999", color, color]);
// prettier-ignore
export const goblinColors = (color) => makeColors(["#50c878", color, color]);
// prettier-ignore
export const bruteColors = (color) => makeColors(["#c80", color, color]);
// prettier-ignore
export const speederColors = (color) => makeColors(["#cff", color, color]);

const defaultUnit = {
  name: "goblin",
  health: 50,
  damage: 10,
  size: 8 * 5,
  cost: 100,
  buildTime: 5 * 30,
  bloodColor: "#A00",
  aggro: true,
  colors: goblinColors,
  speed: 5,
  bodyless: false,
  horns: true,
  antenna: false,
  bouncy: true,
  attackSound: "gun",
  canMine: false,
  flying: false,
  builder: false,

  range: 300,
  cooldownTotalTime: 90,
  firingTotalTime: 60,
};

// prettier-ignore
export default {
  "shade": {
    ...defaultUnit,
    name: "shade",
    damage: 1,
    aggro: false,
    colors: shadeColors,
    speed: 3,
    bodyless: true,
    bouncy: false,
    attackSound: "minigun",
    canMine: true,
    flying: true,
    builder: true,

    range: 50,
    cooldownTotalTime: 10,
    firingTotalTime: 10,
  },
  "goblin": {
    ...defaultUnit,
  },
  "brute": {
    ...defaultUnit,
    name: "brute",
    health: 100,
    damage: 15,
    size: 8 * 10,
    cost: 200,
    buildTime: 10 * 30,
    colors: bruteColors,
    speed: 3,

    range: 100,
  },
  "speeder": {
    ...defaultUnit,
    name: "speeder",
    health: 150,
    damage: 5,
    cost: 200,
    horns: false,
    antenna: true,
    buildTime: 10 * 30,
    colors: speederColors,
    speed: 8,

    range: 50,
  }
};
