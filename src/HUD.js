import Map from "./Map";

export const ICON_BOX_SIZE = 60;
export const ICON_BOX_MARGIN = 10;

const INFOBOX_ICON_ROW_MAX = 8;

const INFOBOX_PADDING = 20;

const ACTIONBOX_ROW_MAX = 3;

const miniMapSize = 250;

class HUD {
  constructor() {
    this.selected = [];
  }

  tick({ camera, drawer, map, mouse, player, sound }) {
    this.selected = player.selected;
    this.resources = player.resources;
    this.drawerWidth = drawer.width;
    this.drawerHeight = drawer.height;
    this.actionboxX = this.drawerWidth - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.actionboxY = this.drawerHeight - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.infoboxX = miniMapSize + HUD.HUD_PADDING * 2;
    this.infoboxY = drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.actionBoxes = this.getActionBoxes({ player });
    this.actionBoxText = "";

    if (this.selected.length) {
      if (mouse.clickTarget[0] || mouse.clickTarget[1]) {
        this.clickAction({ camera, mouse, player });
      }
      if (mouse.mouseLocation[0] || mouse.mouseLocation[1]) {
        this.hoverActions({ camera, mouse });
      }
    }

    this.miniMapClick({ camera, drawer, mouse, player });
    this.miniMapRightClick({ camera, drawer, map, mouse, player, sound });
  }

  miniMapClick({ camera, drawer, mouse, player }) {
    const miniMapSize = 250;
    const { clicked, x, y } = player.inMiniMap(
      mouse.clickTarget,
      mouse.clicked,
      drawer,
      camera
    );
    if (clicked) {
      const width = (drawer.width / Map.size) * miniMapSize;
      const height =
        (drawer.height / ((Map.tileSizeY / Map.tileSize) * Map.size)) *
        miniMapSize;
      const cameraX = ((x - width / 2) / miniMapSize) * 80 * 48;
      const cameraY = ((y - height / 2) / miniMapSize) * 80 * 48;
      camera.setX(cameraX);
      camera.setY(cameraY);
    }
  }

  miniMapRightClick({ camera, drawer, map, mouse, player, sound }) {
    const miniMapSize = 250;
    const { clicked, x, y } = player.inMiniMap(
      mouse.rightClickTarget,
      mouse.rightClicked,
      drawer,
      camera
    );
    if (clicked) {
      const mapX = (x / miniMapSize) * 80 * 48;
      const mapY = (y / miniMapSize) * 80 * 48;
      player.moveGroup(player.selected, map, [mapX, mapY], sound);
    }
  }

  clickAction({ camera, mouse, player }) {
    let [mouseX, mouseY] = mouse.clickTarget;
    this.actionBoxes.forEach(({ x, y, width, height, action }) => {
      if (!action.name) return;
      if (
        mouseX - camera.x >= x &&
        mouseX - camera.x < x + width &&
        mouseY - camera.y >= y &&
        mouseY - camera.y < y + height
      ) {
        if (action.actionable()) {
          action.execute({ player });
        }
      }
    });
  }

  hoverActions({ camera, mouse }) {
    let [mouseX, mouseY] = mouse.mouseLocation;
    this.actionBoxes.forEach(({ x, y, width, height, action }) => {
      if (
        mouseX - camera.x >= x &&
        mouseX - camera.x < x + width &&
        mouseY - camera.y >= y &&
        mouseY - camera.y < y + height
      ) {
        this.actionBoxText = action.name;
      }
    });
  }

  getActionBoxes({ player }) {
    if (this.selected.length === 0) return [];
    const [entity] = this.selected;
    return entity.actions({ player }).map((action, i) => {
      const x =
        this.actionboxX +
        INFOBOX_PADDING +
        ICON_BOX_SIZE * (i % ACTIONBOX_ROW_MAX) +
        ICON_BOX_MARGIN * ((i % ACTIONBOX_ROW_MAX) - 1);
      const y =
        this.infoboxY +
        INFOBOX_PADDING +
        ICON_BOX_SIZE * Math.floor(i / ACTIONBOX_ROW_MAX) +
        ICON_BOX_MARGIN * (Math.floor(i / ACTIONBOX_ROW_MAX) - 1);
      return {
        x,
        y,
        width: ICON_BOX_SIZE,
        height: ICON_BOX_SIZE,
        icon: action.drawIcon,
        action,
      };
    });
  }

  draw(drawer) {
    // resources
    const RESOURCES_X = drawer.width - 140;
    const RESOURCES_Y = 15;
    drawer.rect({
      adjusted: false,
      fillColor: "#69c",
      rect: [RESOURCES_X, RESOURCES_Y + 2, 20, 20],
    });
    drawer.text({
      text: `${this.resources}`,
      x: RESOURCES_X + 30,
      y: RESOURCES_Y,
      size: 5,
    });

    // hud background
    drawer.rect({
      adjusted: false,
      fillColor: "#666",
      rect: [
        0,
        drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING * 2,
        drawer.width,
        HUD.HUD_HEIGHT + HUD.HUD_PADDING * 2,
      ],
    });

    // infobox
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [
        this.infoboxX,
        this.infoboxY,
        drawer.width - HUD.HUD_HEIGHT - miniMapSize - HUD.HUD_PADDING * 4,
        HUD.HUD_HEIGHT,
      ],
    });

    if (this.selected.length === 1) {
      // one selected
      const [entity] = this.selected;
      drawer.text({
        text: entity.name,
        x: this.infoboxX + INFOBOX_PADDING,
        y: this.infoboxY + INFOBOX_PADDING,
        size: 5,
      });

      entity.hudDraw(
        drawer,
        this.infoboxX + INFOBOX_PADDING,
        this.infoboxY + INFOBOX_PADDING + 60
      );

      drawer.text({
        text: `${entity.health} / ${entity.maxHealth}`,
        x: this.infoboxX + INFOBOX_PADDING,
        y: this.infoboxY + INFOBOX_PADDING + 140,
        size: 3,
      });
    } else if (this.selected.length > 1) {
      // multiple selected
      const units = this.selected.slice(0, INFOBOX_ICON_ROW_MAX * 3);
      units.forEach((unit, i) => {
        const x =
          this.infoboxX +
          INFOBOX_PADDING +
          ICON_BOX_SIZE * (i % INFOBOX_ICON_ROW_MAX) +
          ICON_BOX_MARGIN * ((i % INFOBOX_ICON_ROW_MAX) - 1);
        const y =
          this.infoboxY +
          INFOBOX_PADDING +
          ICON_BOX_SIZE * Math.floor(i / INFOBOX_ICON_ROW_MAX) +
          ICON_BOX_MARGIN * (Math.floor(i / INFOBOX_ICON_ROW_MAX) - 1);
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, ICON_BOX_SIZE, ICON_BOX_SIZE],
        });
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, ICON_BOX_SIZE, ICON_BOX_SIZE],
        });
        unit.hudDrawIcon(drawer, x, y);
      });
    }

    // actions
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [this.actionboxX, this.actionboxY, HUD.HUD_HEIGHT, HUD.HUD_HEIGHT],
    });
    if (this.selected.length === 1) {
      this.actionBoxes.forEach(({ x, y, width, height, icon, action }) => {
        if (!action.name) return;
        drawer.rect({
          adjusted: false,
          strokeColor: action.actionable()
            ? "#0f0"
            : "rgba(100, 100, 100, 0.7)",
          rect: [x, y, width, height],
        });
        icon(drawer, x, y);
        if (!action.actionable()) {
          drawer.rect({
            adjusted: false,
            fillColor: "rgba(100, 100, 100, 0.7)",
            rect: [x, y, width, height],
          });
        }
      });
    }

    if (this.actionBoxText) {
      drawer.text({
        text: this.actionBoxText,
        x: this.actionboxX + ICON_BOX_MARGIN,
        y:
          this.actionboxY +
          (ICON_BOX_SIZE + ICON_BOX_MARGIN) * 3 +
          ICON_BOX_MARGIN,
        size: 3,
      });
    }
  }
}

HUD.cancelIcon = (drawer, x, y) => {
  drawer.ellipse({
    adjusted: false,
    ellipse: [
      x + ICON_BOX_SIZE / 2,
      y + ICON_BOX_SIZE / 2,
      20,
      20,
      0,
      0,
      2 * Math.PI,
    ],
    strokeColor: "#0F0",
    strokeWidth: 6,
  });
  drawer.draw(() => {
    drawer.rect({
      adjusted: false,
      rect: [x + ICON_BOX_SIZE / 4, y + ICON_BOX_SIZE / 4, 40, 6],
      fillColor: "#0F0",
      rotation: Math.PI / 4,
      size: 6,
    });
  });
};

HUD.HUD_HEIGHT = 220;
HUD.HUD_PADDING = 10;

export default HUD;
