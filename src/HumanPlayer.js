import Player from "./Player";

const boxCollision = (rect1, rect2) =>
  rect1.x < rect2.x + rect2.w &&
  rect1.x + rect1.w > rect2.x &&
  rect1.y < rect2.y + rect2.h &&
  rect1.h + rect1.y > rect2.y;

const pointCollision = (rect, point) =>
  point.x >= rect.x &&
  point.x < rect.x + (rect.size || rect.sizeX) &&
  point.y >= rect.y &&
  point.y < rect.y + (rect.size || rect.sizeY);

class HumanPlayer extends Player {
  constructor() {
    super();
    this.selected = [];
    this.color = "#A00";
    this.addUnit({ type: "worker", x: 400, y: 580 });
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
        if (pointCollision(entity, { x: mouseX, y: mouseY })) {
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

  enemyEntities({ cpuPlayer, target }) {
    const { buildings, units } = cpuPlayer;
    const enemies = units.concat(buildings);
    return enemies.filter((enemy) => {
      return pointCollision(enemy, { x: target[0], y: target[1] });
    });
  }

  tick({ cpuPlayer, map, mouseEvents }) {
    this.select(mouseEvents);

    this.units.forEach((unit) => {
      if (unit.selected) {
        if (
          mouseEvents.rightClickTarget[0] ||
          mouseEvents.rightClickTarget[1]
        ) {
          const [enemy] = this.enemyEntities({
            cpuPlayer,
            target: mouseEvents.rightClickTarget,
          });
          if (enemy) {
            unit.setTarget(enemy, map);
          } else {
            unit.setPath(mouseEvents.rightClickTarget, map);
          }
        }
      }
    });

    Player.tick.call(this);
  }
}

export default HumanPlayer;
