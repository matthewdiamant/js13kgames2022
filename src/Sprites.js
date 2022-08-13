export const humanoid = (x, y, facing, colors, options = {}) => {
  const { skin, horns, eyes, body } = colors;
  let parts = [];

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

  if (horns)
    parts = parts.concat([
      [horns, [0, -1, 1, 1]], // horn left
      [horns, [4, -1, 1, 1]], // horn right
    ]);

  const mult = options.huge ? 12 : options.big ? 2 : 8;
  // prettier-ignore
  parts = parts.map(([c, r]) => ({
    c,
    r: [
      facing === 1 ? x + (r[0] * mult) : 5 * mult - ((r[0] + r[2]) * mult) + x,
      y + r[1] * mult,
      r[2] * mult,
      r[3] * mult
    ],
  }));

  return parts;
};
