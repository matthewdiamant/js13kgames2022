import Building from "./Building";
import HUD from "./HUD";
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
    this.moveFeedback = [];
  }

  dragSelect(mouse, entities, sound) {
    let collisions = entities.filter((entity) => {
      let [mx, my, endx, endy] = mouse.releaseDrag;
      return boxCollision(entity.hitbox(), {
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
    sound.play("click");
    entities.forEach((entity) => (entity.selected = false));
    collisions.forEach((entity) => (entity.selected = true));
    this.selected = collisions;
  }

  clickSelect(mouse, entities, sound) {
    let [mouseX, mouseY] = mouse.clickTarget;
    if (mouseX || mouseY) {
      entities.forEach((entity) => {
        if (pointCollision(entity.hitbox(), { x: mouseX, y: mouseY })) {
          entities.forEach((entity) => (entity.selected = false));
          this.selected = [entity];
          entity.selected = true;
          sound.play("click");
        }
      });
    }
  }

  select(mouse, sound) {
    const entities = [this.units, this.buildings].flat();
    if (mouse.releaseDrag) {
      this.dragSelect(mouse, entities, sound);
    } else {
      this.clickSelect(mouse, entities, sound);
    }
  }

  enemyEntities({ cpuPlayer, target }) {
    const { buildings, units } = cpuPlayer;
    const enemies = units.concat(buildings);
    return enemies.filter((enemy) =>
      pointCollision(enemy.hitbox(), { x: target[0], y: target[1] })
    );
  }

  unitActions({ cpuPlayer, map, mines, mouse, sound, unit }) {
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
              pointCollision(building.hitbox(), {
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

      return true;
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

  placeBuildingActions(map, mouse, sound) {
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
        sound.play("click");
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

  moveGroup(units, map, mouse, sound) {
    const X_OFFSET = 70;
    const Y_OFFSET = 70;
    const MAX_ROW = 8;
    const { rightClickTarget } = mouse;
    units.forEach((unit, i) => {
      const [x, y] = [
        rightClickTarget[0] + (i % MAX_ROW) * X_OFFSET,
        rightClickTarget[1] + Math.floor(i / MAX_ROW) * Y_OFFSET,
      ];
      unit.setPath([x, y], map);
      this.moveFeedback.push({ x, y, time: 20 });
      unit.state = STATES.MOVING;
    });
    sound.play("click");
  }

  mouseActions({ drawer, cpuPlayer, map, mines, mouse, sound }) {
    if (
      (mouse.clicked &&
        mouse.clickTarget[1] >=
          drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING * 2) ||
      (mouse.rightClicked &&
        mouse.rightClickTarget[1] >=
          drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING * 2)
    ) {
      console.log("hud click");
    } else {
      this.select(mouse, sound);

      this.placeBuildingActions(map, mouse, sound);

      const movingUnits = [];
      this.units.forEach((unit) => {
        if (!unit.selected) return;
        if (this.unitActions({ cpuPlayer, map, mines, mouse, sound, unit })) {
          movingUnits.push(unit);
        }
      });
      if (movingUnits.length) {
        this.moveGroup(movingUnits, map, mouse, sound);
      }
    }
  }

  tick({ cpuPlayer, drawer, map, mines, mouse, particles, sound, targets }) {
    this.mouseActions({ cpuPlayer, drawer, map, mines, mouse, sound });

    this.moveFeedback = this.moveFeedback
      .map((mf) => ({ ...mf, time: mf.time - 1 }))
      .filter((mf) => mf.time > 0);

    Player.tick.call(this, { map, particles, sound, targets });
  }

  draw(drawer) {
    if (this.mode === MODES.PLACE_BUILDING && this.drawPlaceBuilding) {
      this.drawPlaceBuilding(drawer);
    }

    this.moveFeedback.forEach((mf) => {
      if (mf.time % 10 >= 5) return;
      drawer.ellipse({
        ellipse: [mf.x, mf.y, 23, 13, 0, 0, 2 * Math.PI],
        strokeColor: "#4AC",
        strokeWidth: 5,
      });
    });

    Player.draw.call(this, drawer);
  }
}

export default HumanPlayer;
