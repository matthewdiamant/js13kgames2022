const level = {
  levelData:
    "////////4Af/4AAPwAD+AAAHgAD+AAADgAAAAAADgAAAAAABgAAAAAABwAAAAAABwAA8AAABwAD/gAAD4AD/gAAD/A//wAAD////4AAB//////gB//////gB//////gB/////+AB///wAAAB//4AAAAB/gAAAAAB8AAAAAAB4AAAAAAB4AAAAAABwAAAAAABwAAAAAAHgAAAAAAfgAAAAAH/gAAAAD//gAAAAP//gAAAA///gAAAB///gAAAD///gAAAH///gAAAH///gAAAH///gAAAH/8HwAAAP+ADwAAAP4ABwAAADgABwAAAAAABwAAAAAABgAAAAAABgAAAAAABgAAAAAABgAAAAAABwAAAAAADwAAAAAAf////////",

  mines: [
    [4, 2],
    [43, 43],
    [38, 2],
    [3, 44],
  ],
  humanBases: [[4, 6]],
  cpuBases: [
    [38, 43],
    [38, 6],
    [3, 39],
  ],
  cpuShades: [
    [40, 40],
    [43, 40],
    [7, 43],
    [7, 45],
    [42, 3],
    [42, 5],
  ],
  cpuGoblins: [
    [35, 42],
    [35, 44],
    [33, 44],
    [33, 42],
    [33, 40],
    [35, 40],
    [31, 44],
    [31, 42],
    [31, 40],
  ],
  humanShades: [[7, 3]],
  humanGoblins: [[9, 3]],
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
    this.loadLevel(level);
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
        const opacity = (((x ** 3 + y ** 2) % (3 * 16)) + 12 * 16).toString(16);
        const color = debug ? debugColor : "#202028" + opacity;
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
