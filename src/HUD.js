const MULTISELECT_BOX_SIZE = 60;
const MULTISELECT_BOX_MARGIN = 10;
const MULTISELECT_ROW_MAX = 8;

const INFOBOX_PADDING = 20;

const ACTIONBOX_ROW_MAX = 3;

class HUD {
  constructor() {
    this.selected = [];
  }

  tick({ drawer, mouseEvents, player }) {
    this.selected = player.selected;
    this.resources = player.resources;
    this.drawerWidth = drawer.width;
    this.drawerHeight = drawer.height;
    this.actionboxX = this.drawerWidth - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.actionboxY = this.drawerHeight - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    this.infoboxX = HUD.HUD_HEIGHT + HUD.HUD_PADDING * 2;
    this.infoboxY = drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING;

    if (
      this.selected.length &&
      (mouseEvents.clickTarget[0] || mouseEvents.clickTarget[1])
    ) {
      console.log(this.selected[0]);
    }
  }

  actionBoxes() {
    const [entity] = this.selected;
    return entity.actions().map((action, i) => {
      const x =
        this.actionboxX +
        INFOBOX_PADDING +
        MULTISELECT_BOX_SIZE * (i % ACTIONBOX_ROW_MAX) +
        MULTISELECT_BOX_MARGIN * ((i % ACTIONBOX_ROW_MAX) - 1);
      const y =
        this.infoboxY +
        INFOBOX_PADDING +
        MULTISELECT_BOX_SIZE * Math.floor(i / ACTIONBOX_ROW_MAX) +
        MULTISELECT_BOX_MARGIN * (Math.floor(i / ACTIONBOX_ROW_MAX) - 1);
      const actionable = action.cost <= this.resources;
      return [
        x,
        y,
        MULTISELECT_BOX_SIZE,
        MULTISELECT_BOX_SIZE,
        actionable,
        action.drawIcon,
      ];
    });
  }

  draw(drawer) {
    // resources
    const RESOURCES_X = drawer.width - 120;
    const RESOURCES_Y = 15;
    drawer.rect({
      adjusted: false,
      fillColor: "#69c",
      rect: [RESOURCES_X, RESOURCES_Y + 2, 20, 20],
    });
    drawer.text({
      text: `${this.resources}`,
      x: RESOURCES_X + 25,
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
        drawer.width - HUD.HUD_HEIGHT * 2 - HUD.HUD_PADDING * 4,
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

      if (entity.type === "unit") {
        entity.hudDraw(
          drawer,
          this.infoboxX + INFOBOX_PADDING,
          this.infoboxY + INFOBOX_PADDING + 60
        );
      }
    } else if (this.selected.length > 1) {
      // multiple selected
      const units = this.selected.slice(0, MULTISELECT_ROW_MAX * 3);
      units.forEach((unit, i) => {
        const x =
          this.infoboxX +
          INFOBOX_PADDING +
          MULTISELECT_BOX_SIZE * (i % MULTISELECT_ROW_MAX) +
          MULTISELECT_BOX_MARGIN * ((i % MULTISELECT_ROW_MAX) - 1);
        const y =
          this.infoboxY +
          INFOBOX_PADDING +
          MULTISELECT_BOX_SIZE * Math.floor(i / MULTISELECT_ROW_MAX) +
          MULTISELECT_BOX_MARGIN * (Math.floor(i / MULTISELECT_ROW_MAX) - 1);
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, MULTISELECT_BOX_SIZE, MULTISELECT_BOX_SIZE],
        });
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [x, y, MULTISELECT_BOX_SIZE, MULTISELECT_BOX_SIZE],
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
      this.actionBoxes().forEach((actionBox) => {
        const [x, y, width, height, actionable, icon] = actionBox;

        drawer.rect({
          adjusted: false,
          strokeColor: actionable ? "#0f0" : "rgba(100, 100, 100, 0.7)",
          rect: [x, y, width, height],
        });
        icon(drawer, x, y);
        if (!actionable) {
          drawer.rect({
            adjusted: false,
            fillColor: "rgba(100, 100, 100, 0.7)",
            rect: [x, y, width, height],
          });
        }
      });
    }
  }
}

HUD.HUD_HEIGHT = 250;
HUD.HUD_PADDING = 10;

export default HUD;
