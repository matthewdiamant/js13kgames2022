const MAX_PARTICLES = 5000;

class ParticleCollection {
  constructor() {
    this.particles = [];
  }

  add(particle) {
    this.particles.push(particle);
  }

  tick({ map }) {
    if (this.particles.length > MAX_PARTICLES) {
      this.particles = this.particles.slice(
        this.particles.length - MAX_PARTICLES
      );
    }
    this.particles.forEach((particle) => particle.tick({ map }));
  }

  draw(drawer) {
    this.particles.forEach((particle) => particle.draw(drawer));
  }
}

export default ParticleCollection;
