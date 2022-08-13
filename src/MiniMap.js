import Map from "./Map";

class MiniMap {
  constructor() {}

  draw(drawer) {
    const minimapSize = 250;
    drawer.rect({
      adjusted: false,
      fillColor: "#eee",
      rect: [0, drawer.height - minimapSize, minimapSize, minimapSize],
    });

    const x = (drawer.camera.position_x / Map.size) * minimapSize;
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

    drawer.renderMiniMap();
  }
}

export default MiniMap;
