import Building from "./Building";
import Map from "./Map";
import Player from "./Player";
import { STATES } from "./Unit";
import { boxCollision, pointCollision } from "./collision";

const MODES = { NORMAL: 0, PLACE_BUILDING: 1 };

class HumanPlayer extends Player {
  constructor({ map }) {
    super();
    this.selected = [];
    this.color = "#A00";
    this.addUnit({ type: "shade", x: 500, y: 380 });
    this.addUnit({ type: "goblin", x: 500, y: 440 });
    this.addUnit({ type: "brute", x: 500, y: 560 });
    map.humanBases.forEach(([x, y]) => {
      this.addBuilding({ type: "base", x: 80 * x, y: 80 * y });
    });
    this.mode = MODES.NORMAL;
    this.placeBuildingUnit = null;
    this.placeBuildingBuilding = null;
    this.drawPlaceBuilding = null;
    this.moveFeedback = null;
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

  selectedUnitActions({ cpuPlayer, map, mines, mouse, sound, unit }) {
    const { rightClickTarget } = mouse;

    if (unit.state === STATES.BUILD_BUILDING) return;
    if (mouse.rightClickTarget[0] || mouse.rightClickTarget[1]) {
      if (unit.canMine) {
        const [mine] = mines.mines.filter((mine) =>
          pointCollision(mine, {
            x: rightClickTarget[0],
            y: rightClickTarget[1],
          })
        );
        if (mine) {
          unit.setMining(mine);
          sound.play("click");
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
            sound.play("click");
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
        sound.play("click");
        return;
      }

      unit.setPath(rightClickTarget, map);
      this.moveFeedback = {
        x: rightClickTarget[0],
        y: rightClickTarget[1],
        time: 30,
      };
      unit.state = STATES.MOVING;
      sound.play("click");
    }
  }

  placeBuildingMode({ unit, building }) {
    this.mode = MODES.PLACE_BUILDING;
    this.placeBuildingUnit = unit;
    this.placeBuildingBuilding = building;
  }

  cancelPlaceBuilding() {
    this.mode = MODES.INITIAL;
    this.placeBuildingUnit = null;
    this.placeBuildingBuilding = null;
  }

  placeBuildingActions(map, mouse) {
    const { clickTarget, mouseLocation } = mouse;
    if (this.mode === MODES.PLACE_BUILDING) {
      const [mx, my] = mouseLocation;
      const [tx, ty] = map.coordsToTile(mx, my);
      const [x, y] = map.tileToCoords(tx, ty, false);

      if (mouseLocation) {
        this.drawPlaceBuilding = (drawer) => {
          Building.drawBuilding(
            drawer,
            x,
            y,
            Map.tileSize * 3,
            Map.tileSize * 2,
            this.color,
            "4"
          );
        };
      }

      if (clickTarget[0] || clickTarget[1]) {
        this.placeBuildingForConstruction({
          building: this.placeBuildingBuilding,
          x,
          y,
          map,
          unit: this.placeBuildingUnit,
        });
        this.cancelPlaceBuilding();
      }
    }
  }

  tick({ bloods, bloodChunks, cpuPlayer, map, mines, mouse, sound, targets }) {
    this.select(mouse);

    this.placeBuildingActions(map, mouse);

    this.units.forEach((unit) => {
      if (unit.selected) {
        this.selectedUnitActions({ cpuPlayer, map, mines, mouse, sound, unit });
      }
    });

    if (this.moveFeedback) {
      this.moveFeedback.time -= 1;
      if (this.moveFeedback.time <= 0) {
        this.moveFeedback = null;
      }
    }

    Player.tick.call(this, { bloods, bloodChunks, map, sound, targets });
  }

  draw(drawer) {
    if (this.mode === MODES.PLACE_BUILDING && this.drawPlaceBuilding) {
      this.drawPlaceBuilding(drawer);
    }

    if (this.moveFeedback && this.moveFeedback.time % 10 < 5) {
      drawer.ellipse({
        ellipse: [
          this.moveFeedback.x + 20,
          this.moveFeedback.y + 40,
          (40 + 15) / 2,
          40 / 3,
          0,
          0,
          2 * Math.PI,
        ],
        strokeColor: "#4AC",
        strokeWidth: 5,
      });
    }
    Player.draw.call(this, drawer);
  }
}

export default HumanPlayer;
