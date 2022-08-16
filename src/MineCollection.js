import Map, { TILE_TYPE, TILES } from "./Map";
import Mine from "./Mine";

class MineCollection {
  constructor({ map }) {
    this.mines = [];
    map.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === TILES.indexOf(TILE_TYPE.MINE)) {
          this.mines.push(new Mine(x * Map.tileSize, y * Map.tileSize));
        }
      });
    });
  }

  tick() {
    this.mines.forEach((mine) => {
      mine.tick();
    });
  }

  draw(drawer) {
    this.mines.forEach((mine) => {
      mine.draw(drawer);
    });
  }
}

export default MineCollection;
