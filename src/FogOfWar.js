import Map from "./Map";

class FogOfWar {
  constructor() {
    this.tiles = [];
  }

  tick({ humanPlayer, map }) {
    const tiles = [];
    for (let y = 0; y < map.height; y++) {
      const row = [];
      for (let x = 0; x < map.width; x++) {
        row.push(1);
      }
      tiles.push(row);
    }
    humanPlayer.entities().forEach((e) => {
      const [tileX, tileY] = map.coordsToTile(e.x, e.y);
      tiles[tileY][tileX] = 0;
    });
    this.tiles = tiles;
  }

  draw(drawer) {
    this.tiles.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          drawer.rect({
            fillColor: "#0008",
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

export default FogOfWar;
