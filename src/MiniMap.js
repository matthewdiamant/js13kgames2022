import HUD from "./HUD";
import Map from "./Map";

class MiniMap {
  constructor() {}

  draw(drawer) {
    const minimapSize = 250;
    drawer.rect({
      adjusted: false,
      fillColor: "#666",
      rect: [
        0,
        drawer.height - minimapSize - HUD.HUD_PADDING * 2,
        minimapSize + HUD.HUD_PADDING * 2,
        minimapSize + HUD.HUD_PADDING * 2,
      ],
    });
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [
        HUD.HUD_PADDING,
        drawer.height - minimapSize - HUD.HUD_PADDING,
        minimapSize,
        minimapSize,
      ],
    });

    const x =
      (drawer.camera.position_x / Map.size) * minimapSize + HUD.HUD_PADDING;
    const y =
      drawer.height -
      minimapSize +
      (drawer.camera.position_y / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
        minimapSize -
      HUD.HUD_PADDING;
    drawer.rect({
      adjusted: false,
      strokeColor: "#fff",
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
