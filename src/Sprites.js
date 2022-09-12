export const humanoid = (x, y, facing, colors, options = {}) => {
  let { skin, eyes, body } = colors;
  let parts = [];

  if (options.blink) {
    eyes = "#0000";
  }

  let upper = [
    [skin, [0, 0, 5, 3]], // head
    [eyes, [1, 1, 1, 1]], // eye left
    [eyes, [4, 1, 1, 1]], // eye right
  ];
  parts = parts.concat(upper);

  let lower = [
    [body, [0, 4, 3, 1]], // body
    [skin, [0, 4, 1, 1]], // left arm
    [skin, [3, 4, 1, 1]], // right arm
  ];

  if (!options.bodyless) {
    parts = parts.concat(lower);
  }

  if (options.horns)
    parts = parts.concat([
      [skin, [0, -1, 1, 1]], // horn left
      [skin, [4, -1, 1, 1]], // horn right
    ]);

  if (options.antenna)
    parts = parts.concat([
      [skin, [1, -1, 1, 1]], // antenna left
      [skin, [0, -2, 1, 1]], // antenna left
      [skin, [3, -1, 1, 1]], // antenna right
      [skin, [4, -2, 1, 1]], // antenna right
      [eyes, [2, 1, 1, 1]], // eye leftmiddle
      [eyes, [3, 1, 1, 1]], // eye rightmiddle
    ]);

  const mult = options.size || 8;
  // prettier-ignore
  parts = parts.map(([c, r]) => ({
    c,
    r: [
      facing === 1 ? x + (r[0] * mult) : 5 * mult - ((r[0] + r[2]) * mult) + x,
      r[1] * mult + y,
      r[2] * mult,
      r[3] * mult
    ],
  }));

  return parts;
};
