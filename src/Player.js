import Building from "./Building";
import Unit from "./Unit";

const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.h + rect1.y > rect2.y;

class Player {
  constructor() {
    this.resources = 1000;

    this.units = [
      new Unit(400, 300),
      new Unit(500, 300),
      new Unit(600, 300),
      new Unit(700, 300),
      new Unit(800, 300),
      new Unit(900, 300),
      new Unit(1000, 300),
      new Unit(1100, 300),

      new Unit(400, 400),
      new Unit(500, 400),
      new Unit(600, 400),
      new Unit(700, 400),
      new Unit(800, 400),
      new Unit(900, 400),
      new Unit(1000, 400),
      new Unit(1100, 400),

      new Unit(400, 500),
      new Unit(500, 500),
      new Unit(600, 500),
      new Unit(700, 500),
      new Unit(800, 500),
      new Unit(900, 500),
      new Unit(1000, 500),
      new Unit(1100, 500),
    ];

    this.buildings = [new Building(80 * 1, 80 * 5)];
    this.selected = [];
  }

  dragSelect(mouseEvents, entities) {
    const collisions = entities.filter((entity) => {
      let { x, y, size, sizeX, sizeY } = entity;
      let [mx, my, endx, endy] = mouseEvents.releaseDrag;
      return boxCollision(
        { x, y, w: sizeX || size, h: sizeY || size },
        { x: mx, y: my, w: endx - mx, h: endy - my }
      );
    });
    if (collisions.length === 0) return;
    entities.forEach((entity) => (entity.selected = false));
    collisions.forEach((entity) => (entity.selected = true));
    this.selected = collisions;
  }

  clickSelect(mouseEvents, entities) {
    let [mouseX, mouseY] = mouseEvents.clickTarget;
    if (mouseX || mouseY) {
      entities.forEach((entity) => {
        let { x, y, size, sizeX, sizeY } = entity;
        if (
          mouseX >= x &&
          mouseX < x + (size || sizeX) &&
          mouseY >= y &&
          mouseY < y + (size || sizeY)
        ) {
          entities.forEach((entity) => (entity.selected = false));
          this.selected = [entity];
          entity.selected = true;
        }
      });
    }
  }

  select(mouseEvents) {
    const entities = [this.units, this.buildings].flat();
    if (mouseEvents.releaseDrag) {
      this.dragSelect(mouseEvents, entities);
    } else {
      this.clickSelect(mouseEvents, entities);
    }
  }

  addUnit({ type, x, y }) {
    const newUnit = new Unit(x, y);
    this.units.push(newUnit);
  }

  tick({ mouseEvents }) {
    this.select(mouseEvents);
    this.units.forEach((u) => u.tick({ mouseEvents }));
    this.buildings.forEach((b) => b.tick({ player: this }));
  }

  draw(drawer) {
    this.buildings.forEach((b) => b.draw(drawer));
    this.units.forEach((u) => u.draw(drawer));
  }
}

export default Player;
