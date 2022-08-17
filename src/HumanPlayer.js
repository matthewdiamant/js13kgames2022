import Player from "./Player";
import { STATES } from "./Unit";
import { boxCollision, pointCollision } from "./collision";

class HumanPlayer extends Player {
  constructor({ map }) {
    super();
    this.selected = [];
    this.color = "#A00";
    this.addUnit({ type: "shade", x: 650, y: 580 });
    this.addUnit({ type: "goblin", x: 650, y: 640 });
    this.addUnit({ type: "brute", x: 650, y: 760 });
    map.humanBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
    });
  }

  dragSelect(mouse, entities) {
    let collisions = entities.filter((entity) => {
      let [mx, my, endx, endy] = mouse.releaseDrag;
      return boxCollision(entity, {
        x: mx,
        y: my,
        sizeX: endx - mx,
        sizeY: endy - my,
      });
    });
    if (collisions.map((c) => c.type).includes("unit")) {
      collisions = collisions.filter((c) => c.type === "unit");
    }
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
              unit.path = [];
              unit.miningTarget = mine;
              unit.state = STATES.MINING;
              return;
            }
            if (unit.carryingResource) {
              const [base] = this.buildings.filter(
                (building) =>
                  building.name === "base" &&
                  pointCollision(building, {
                    x: rightClickTarget[0],
                    y: rightClickTarget[1],
                  })
              );
              if (base) {
                unit.returnResource(this, map, base);
                return;
              }
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
