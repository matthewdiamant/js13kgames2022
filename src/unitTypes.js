const makeColors = ([skin, horns, eyes, body]) => ({ skin, horns, eyes, body });

// prettier-ignore
export const shadeColors = (color) => makeColors(["#999", "#999", color, color]);
// prettier-ignore
export const goblinColors = (color) => makeColors(["#50c878", "#50c878", color, color]);
// prettier-ignore
export const bruteColors = (color) => makeColors(["#600", "#600", color, color]);

export default {
  shade: {
    type: "shade",
    health: 50,
    damage: 1,
    size: 5,
    bloodColor: "#A00",
    aggro: false,
    colors: shadeColors,
    speed: 3,
    bodyless: true,
    bouncy: false,
    attackSound: "minigun",

    range: 50,
    cooldownTotalTime: 0,
    firingTotalTime: 0,
  },
  goblin: {
    type: "goblin",
    health: 50,
    damage: 10,
    size: 5,
    bloodColor: "#A00",
    aggro: true,
    colors: goblinColors,
    speed: 5,
    bodyless: false,
    bouncy: true,
    attackSound: "gun",

    range: 300,
    cooldownTotalTime: 90,
    firingTotalTime: 60,
  },
  brute: {
    type: "brute",
    health: 100,
    damage: 15,
    size: 10,
    bloodColor: "#A00",
    aggro: true,
    colors: bruteColors,
    speed: 3,
    bouncy: true,
    attackSound: "gun",

    range: 100,
    cooldownTotalTime: 90,
    firingTotalTime: 60,
  },
};
