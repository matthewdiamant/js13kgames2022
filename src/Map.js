class Map {
  constructor() {
    this.map = [];
    for (let y = 0; y < Map.size / Map.tileSize; y++) {
      const row = [];
      for (let x = 0; x < Map.size / Map.tileSize; x++) {
        row.push((x + y) % 2);
      }
      this.map.push(row);
    }
  }

  tick() {}

  draw(drawer) {
    this.map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const color = cell ? "#bbb" : "#ddd";
        drawer.rect({
          fillColor: color,
          rect: [
            x * Map.tileSizeX,
            y * Map.tileSizeY,
            Map.tileSizeX,
            Map.tileSizeY,
          ],
        });
      });
    });

    // minimap
    const minimapSize = 200;
    drawer.rect({
      adjusted: false,
      fillColor: "#eee",
      rect: [
        drawer.width - minimapSize,
        drawer.height - minimapSize,
        minimapSize,
        minimapSize,
      ],
    });

    const x =
      drawer.width -
      minimapSize +
      (drawer.camera.position_x / Map.size) * minimapSize;
    const y =
      drawer.height -
      minimapSize +
      (drawer.camera.position_y / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
        minimapSize;
    drawer.rect({
      adjusted: false,
      strokeColor: "#333",
      rect: [
        x,
        y,
        (drawer.width / Map.size) * minimapSize,
        (drawer.height / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
          minimapSize,
      ],
    });
  }
}

Map.mapAdjust = (x, y) => [
  (x * Map.tileSizeX) / Map.tileSize,
  (y * Map.tileSizeY) / Map.tileSize,
];

Map.size = 4000;
Map.tileSize = 80;
Map.tileSizeX = 80;
Map.tileSizeY = 80;

export default Map;
