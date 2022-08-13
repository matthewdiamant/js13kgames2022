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

    const INFOXBOX_PADDING = 20;
    if (this.selected.length === 1) {
      // one selected unit
      const [unit] = this.selected;
      drawer.text({
        text: unit.name,
        x: INFOBOX_X + INFOXBOX_PADDING,
        y: INFOBOX_Y + INFOXBOX_PADDING,
        size: 5,
      });
    } else if (this.selected.length > 1) {
      // multiple selected units
    }
  }
}

HUD.HUD_HEIGHT = 250;
HUD.HUD_PADDING = 10;

export default HUD;
