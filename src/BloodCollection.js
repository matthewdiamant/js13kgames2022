class BloodCollection {
  constructor() {
    this.bloods = [];
  }

  add(blood) {
    this.bloods.push(blood);
  }

  tick() {
    if (this.bloods.length > 1000) {
      this.bloods = this.bloods.slice(this.bloods.length - 1000);
    }
    this.bloods.forEach((blood) => blood.tick());
  }

  draw(drawer) {
    this.bloods.forEach((blood) => blood.draw(drawer));
  }
}

export default BloodCollection;
