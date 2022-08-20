// prettier-ignore
const level = {
  "levelData": "////////4RAAAAAfwVAAAAAHgVAAAAADgVAAAAADgVAAAAABgVAAAAABgVAAAAABgVAAAAABgVAAAAABgVAAAAABgVAAAAABwEAAAAAB//+AAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABwAAAAAADwAAAAAAD4AAAAAAH+AAAAAAf////////",
  "mines": [
    [42,4],
    [4,42],
    [3,3],
    [13,3]
  ],
  "humanBases": [
    [3,8]
  ],
  "cpuBases": [
    [13,8]
  ]
}

const decode = (encoded) => {
  const decoded = atob(encoded);
  const pad = (n) => "00000000".substr(n.length) + n;
  const chars = decoded
    .split("")
    .map((c) => pad(c.charCodeAt(0).toString(2)))
    .join("");
  const rows = chars
    .match(/.{1,48}/g)
    .map((r) => Array.from(r).map((c) => Number(c)));
  return rows;
};

export const TILE_TYPE = { NORMAL: "NORMAL", HOLE: "HOLE", MINE: "MINE" };
export const TILES = [TILE_TYPE.NORMAL, TILE_TYPE.HOLE, TILE_TYPE.MINE];

class Map {
  constructor() {
    this.grid = decode(level.levelData);
    this.mines = level.mines;
    this.humanBases = level.humanBases;
    this.cpuBases = level.cpuBases;
    this.height = this.grid.length;
    this.width = this.grid[0].length;
  }

  tick() {}

  coordsToTile(x, y) {
    return [Math.floor(x / Map.tileSize), Math.floor(y / Map.tileSize)];
  }

  tileToCoords(x, y, middle = true) {
    return [
      x * Map.tileSize + (middle ? Map.tileSize / 2 : 0),
      y * Map.tileSize + (middle ? Map.tileSize / 2 : 0),
    ];
  }

  draw(drawer) {
    this.grid.forEach((row, y) => {
      let normalColor = !!(y % 2);
      row.forEach((cell, x) => {
        normalColor = !normalColor;
        const tileType = TILES[cell];

        const debug = false;
        const debugColor = normalColor ? "#ddd" : "#e6e6e6";
        const color = debug ? debugColor : "#223";
        if (tileType !== TILE_TYPE.HOLE) {
          drawer.rect({
            fillColor: color,
            rect: [
              x * Map.tileSizeX,
              y * Map.tileSizeY,
              Map.tileSizeX,
              Map.tileSizeY,
            ],
          });
        }
      });
    });
  }
}

Map.mapAdjust = (x, y) => [
  (x * Map.tileSizeX) / Map.tileSize,
  (y * Map.tileSizeY) / Map.tileSize,
];

Map.size = 80 * 48;
Map.tileSize = 80;
Map.tileSizeX = 80;
Map.tileSizeY = 80;

export default Map;
