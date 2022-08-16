import Player from "./Player";
import { STATES } from "./Unit";

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
    this.addUnit({ type: "shade", x: 650, y: 580 });
    this.addUnit({ type: "goblin", x: 650, y: 640 });
    this.addUnit({ type: "brute", x: 650, y: 760 });
    this.addBuilding({ type: "base", x: 80 * 4, y: 80 * 6 });
  }

  dragSelect(mouse, entities) {
    const collisions = entities.filter((entity) => {
      let { x, y, size, sizeX, sizeY } = entity;
      let [mx, my, endx, endy] = mouse.releaseDrag;
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

  clickSelect(mouse, entities) {
    let [mouseX, mouseY] = mouse.clickTarget;
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

  select(mouse) {
    const entities = [this.units, this.buildings].flat();
    if (mouse.releaseDrag) {
      this.dragSelect(mouse, entities);
    } else {
      this.clickSelect(mouse, entities);
    }
  }

  enemyEntities({ cpuPlayer, target }) {
    const { buildings, units } = cpuPlayer;
    const enemies = units.concat(buildings);
    return enemies.filter((enemy) =>
      pointCollision(enemy, { x: target[0], y: target[1] })
    );
  }

  tick({ bloods, bloodChunks, cpuPlayer, map, mines, mouse, sound, targets }) {
    this.select(mouse);

    this.units.forEach((unit) => {
      const { rightClickTarget } = mouse;
      if (unit.selected) {
        if (mouse.rightClickTarget[0] || mouse.rightClickTarget[1]) {
          if (unit.canMine) {
            const [mine] = mines.mines.filter((mine) =>
              pointCollision(mine, {
                x: rightClickTarget[0],
                y: rightClickTarget[1],
              })
            );
            if (mine) {
              unit.state = STATES.MINING;
              unit.miningTarget = mine;
              return;
            }
          }

          const [enemy] = this.enemyEntities({
            cpuPlayer,
            target: rightClickTarget,
          });
          if (enemy) {
            unit.setTarget(enemy, map);
            return;
          }

          unit.setPath(mouse.rightClickTarget, map);
          unit.state = STATES.MOVING;
        }
      }
    });

    Player.tick.call(this, { bloods, bloodChunks, map, sound, targets });
  }
}

export default HumanPlayer;
