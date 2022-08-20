const makeColors = ([skin, horns, eyes, body]) => ({ skin, horns, eyes, body });

// prettier-ignore
export const shadeColors = (color) => makeColors(["#999", "#999", color, color]);
// prettier-ignore
export const goblinColors = (color) => makeColors(["#50c878", "#50c878", color, color]);
// prettier-ignore
export const bruteColors = (color) => makeColors(["#c80", "#c80", color, color]);

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
  bouncy: true,
  attackSound: "gun",
  canMine: false,
  flying: false,
  builder: false,

  range: 300,
  cooldownTotalTime: 90,
  firingTotalTime: 60,
};

export default {
  shade: {
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
    cooldownTotalTime: 5,
    firingTotalTime: 5,
  },
  goblin: {
    ...defaultUnit,
  },
  brute: {
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
};
