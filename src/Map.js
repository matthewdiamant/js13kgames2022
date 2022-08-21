// prettier-ignore
const level = {
  levelData: "////////+AAAAAAf4AAAAAAHwAAAAAADwAAAAAADgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABwAAAAAADwAAAAAAD4AAAAAAH+AAAAAAf////////",
  mines: [
    [42,4],
    [4,42],
    [4,4],
    [42,42]
  ],
  humanBases: [
    [4,9]
  ],
  cpuBases: [
    [41,36]
  ],
  rows: 48,
}

const tutorial = {
  levelData:
    "////////g+AAAAAPgAAAAAADgAAAAAABgAAAAAABgAAB/wAB//////8B//////+B//////+B//////+B//////+B//////+B//////8B/AAAAAAB4AAAAAADwAAAAAADwAAAAAAHgAAAAAAfgAAAAAA/gD+AAB//gH//////gH//////gH//////gD//////gA//////gAH/////gAA/////gAAAAAP/gAAAAAA/gAAAAAAHgAAAAAADgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABwAAAAAADwAAAAAAH+AP4AAAf////////",
  mines: [
    [41, 43],
    [20, 15],
  ],
  humanBases: [[26, 15]],
  cpuBases: [[43, 37]],
  cpuShades: [
    [41, 41],
    [43, 41],
    [45, 41],
  ],
  cpuGoblins: [
    [41, 39],
    [41, 37],
    [41, 35],
    [43, 35],
    [45, 35],
  ],
  humanShades: [[31, 14]],
  humanGoblins: [
    [2, 3],
    [18, 2],
    [18, 4],
  ],
};

const decode = (encoded, numRows = 48) => {
  const decoded = atob(encoded);
  const pad = (n) => "00000000".substr(n.length) + n;
  const chars = decoded
    .split("")
    .map((c) => pad(c.charCodeAt(0).toString(2)))
    .join("");
  const re = new RegExp(`.{1,${numRows}}`, "g");
  const rows = chars.match(re).map((r) => Array.from(r).map((c) => Number(c)));
  return rows;
};

export const TILE_TYPE = { NORMAL: "NORMAL", HOLE: "HOLE", MINE: "MINE" };
export const TILES = [TILE_TYPE.NORMAL, TILE_TYPE.HOLE, TILE_TYPE.MINE];

class Map {
  constructor() {
    this.loadLevel(tutorial);
  }

  loadLevel(level) {
    this.grid = decode(level.levelData, level.rows);
    this.mines = level.mines;
    this.humanBases = level.humanBases;
    this.humanShades = level.humanShades;
    this.humanGoblins = level.humanGoblins;
    this.cpuBases = level.cpuBases;
    this.cpuShades = level.cpuShades;
    this.cpuGoblins = level.cpuGoblins;
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
