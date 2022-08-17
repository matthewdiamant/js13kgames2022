import Map from "./Map";
import Mine from "./Mine";

class MineCollection {
  constructor({ map }) {
    this.mines = [];
    map.mines.forEach(([x, y]) => {
      this.mines.push(new Mine(x * Map.tileSize, y * Map.tileSize));
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
