import Mine from "./Mine";

class MineCollection {
  constructor() {
    this.mines = [new Mine(80 * 6, 80)];
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
