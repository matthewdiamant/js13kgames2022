import Building from "./Building";
import Unit from "./Unit";

const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.h + rect1.y > rect2.y;

class Player {
  constructor() {
    this.units = [
      new Unit(100, 200),
      new Unit(300, 200),
      new Unit(500, 200),
      new Unit(700, 200),
      new Unit(100, 400),
      new Unit(300, 400),
      new Unit(500, 400),
      new Unit(700, 400),
    ];

    this.buildings = [new Building(400, 80 * 8)];
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
    if (collisions.length) {
      entities.forEach((entity) => (entity.selected = false));
      collisions.forEach((entity) => (entity.selected = true));
    }
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

  tick({ mouseEvents }) {
    this.select(mouseEvents);
    this.units.forEach((u) => u.tick({ mouseEvents }));
    this.buildings.forEach((b) => b.tick());
  }

  draw(drawer) {
    this.units.forEach((u) => u.draw(drawer));
    this.buildings.forEach((b) => b.draw(drawer));
  }
}

export default Player;
