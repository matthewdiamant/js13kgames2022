import Map from "./Map";

class FogOfWar {
  constructor() {
    this.tiles = [];
  }

  tick({ humanPlayer, cpuPlayer, mines, map }) {
    const tiles = [];
    for (let y = 0; y < map.height; y++) {
      const row = [];
      for (let x = 0; x < map.width; x++) {
        row.push(1);
      }
      tiles.push(row);
    }

    const clampX = (x) => Math.min(Math.max(0, x), map.width - 1);
    const clampY = (y) => Math.min(Math.max(0, y), map.height - 1);

    humanPlayer.entities().forEach((e) => {
      const SIGHT = 10;

      const [x, y] = map.coordsToTile(e.x, e.y);

      for (let dy = clampY(y - SIGHT); dy <= clampY(y + SIGHT); dy++) {
        const d = Math.floor(
          Math.sqrt(Math.abs(SIGHT ** 2 - Math.abs(dy - y) ** 2))
        );
        for (let dx = clampX(x - d); dx <= clampX(x + d); dx++) {
          tiles[dy][dx] = 0;
        }
      }
    });

    cpuPlayer
      .entities()
      .concat(mines.mines)
      .forEach((e) => {
        const { x, y } = e;
        e.inFog =
          tiles[Math.floor(y / Map.tileSize)][Math.floor(x / Map.tileSize)];
      });

    this.tiles = tiles;
  }

  draw(drawer) {
    // return;
    this.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (!tile) return;
        drawer.rect({
          fillColor: "#222",
          rect: [
            x * Map.tileSizeX,
            y * Map.tileSizeY,
            Map.tileSizeX,
            Map.tileSizeY,
          ],
        });
      });
    });
  }
}

export default FogOfWar;
