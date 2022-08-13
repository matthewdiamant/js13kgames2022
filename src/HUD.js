class HUD {
  constructor() {
    this.selected = [];
  }

  tick({ player }) {
    this.selected = player.selected;
  }

  draw(drawer) {
    // background
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
    const INFOBOX_X = HUD.HUD_HEIGHT + HUD.HUD_PADDING * 2;
    const INFOBOX_Y = drawer.height - HUD.HUD_HEIGHT - HUD.HUD_PADDING;
    drawer.rect({
      adjusted: false,
      fillColor: "#111",
      rect: [
        INFOBOX_X,
        INFOBOX_Y,
        drawer.width - HUD.HUD_HEIGHT - HUD.HUD_PADDING * 3,
        HUD.HUD_HEIGHT,
      ],
    });

    const INFOBOX_PADDING = 20;
    if (this.selected.length === 1) {
      // one selected unit
      const [unit] = this.selected;
      drawer.text({
        text: unit.name,
        x: INFOBOX_X + INFOBOX_PADDING,
        y: INFOBOX_Y + INFOBOX_PADDING,
        size: 5,
      });
    } else if (this.selected.length > 1) {
      // multiple selected units
      const MULTISELECT_BOX_SIZE = 50;
      const MULTISELECT_BOX_PADDING = 10;
      const MULTISELECT_ROW_MAX = 8;
      const units = this.selected.slice(0, MULTISELECT_ROW_MAX * 3);
      units.forEach((unit, i) => {
        drawer.rect({
          adjusted: false,
          strokeColor: "#0f0",
          rect: [
            INFOBOX_X +
              INFOBOX_PADDING +
              MULTISELECT_BOX_SIZE * (i % MULTISELECT_ROW_MAX) +
              MULTISELECT_BOX_PADDING * ((i % MULTISELECT_ROW_MAX) - 1),
            INFOBOX_Y +
              INFOBOX_PADDING +
              MULTISELECT_BOX_SIZE * Math.floor(i / MULTISELECT_ROW_MAX) +
              MULTISELECT_BOX_PADDING *
                (Math.floor(i / MULTISELECT_ROW_MAX) - 1),
            MULTISELECT_BOX_SIZE,
            MULTISELECT_BOX_SIZE,
          ],
        });
      });
    }
  }
}

HUD.HUD_HEIGHT = 250;
HUD.HUD_PADDING = 10;

export default HUD;
