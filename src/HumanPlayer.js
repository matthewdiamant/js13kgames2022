import Player from "./Player";

const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.h + rect1.y > rect2.y;

class HumanPlayer extends Player {
  constructor() {
    super();
    this.selected = [];
    this.color = "#A00";
    this.addUnit({ type: "worker", x: 0, y: 0 });
    this.addBuilding({ type: "base", x: 80 * 1, y: 80 * 4 });
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

  tick({ map, mouseEvents }) {
    this.select(mouseEvents);

    this.units.forEach((unit) => {
      if (
        unit.selected &&
        (mouseEvents.rightClickTarget[0] || mouseEvents.rightClickTarget[1])
      ) {
        unit.setPath(mouseEvents.rightClickTarget, map);
      }
    });

    Player.tick.call(this);
  }
}

export default HumanPlayer;
