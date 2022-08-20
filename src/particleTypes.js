export default {
  blood: {
    draw: function (drawer) {
      drawer.rect({
        fillColor: this.color,
        rect: [this.x, this.y, 5, 5],
      });
    },
  },
  chunk: {
    draw: function (drawer) {
      const glistenColor = "#FF77A8";
      drawer.rect({
        fillColor: this.color,
        rect: [this.x, this.y - 10, 10, 15],
      });

      [
        [1, 2],
        [2, 3],
      ].forEach(([x, y]) => {
        drawer.rect({
          fillColor: this.color,
          rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
        });
      });

      [
        [2, 0],
        [1, 1],
        [0, 2],
        [1, 3],
      ].forEach(([x, y]) => {
        drawer.rect({
          fillColor: glistenColor,
          rect: [this.x + (x - 2) * 5, this.y + (y - 2) * 5, 5, 5],
        });
      });
    },
  },
  bit: {},
};
