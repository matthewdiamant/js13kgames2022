export default class Background {
  constructor({ cw, ch }) {
    this.stars = Array(500)
      .fill(0)
      .map((_) => [
        Math.random() * cw,
        Math.random() * ch,
        Math.floor(Math.random() * 6),
      ]);
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground("#600c0c", "#0c6060");
    });

    this.stars.forEach(([x, y, o]) => {
      drawer.rect({
        adjusted: false,
        fillColor: "#fff" + o,
        rect: [x, y, 8 - o, 8 - o],
      });
    });
  }
}
