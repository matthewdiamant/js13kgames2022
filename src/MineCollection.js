import Mine from "./Mine";

class MineCollection {
  constructor() {
    this.mines = [new Mine(100, 600)];
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
