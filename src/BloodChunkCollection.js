class BloodChunkCollection {
  constructor() {
    this.bloodChunks = [];
  }

  add(bloodChunk) {
    this.bloodChunks.push(bloodChunk);
  }

  tick() {
    if (this.bloodChunks.length > 1000) {
      this.bloodChunks = this.bloodChunks.slice(this.bloodChunks.length - 1000);
    }
    this.bloodChunks.forEach((bloodChunk) => bloodChunk.tick());
  }

  draw(drawer) {
    this.bloodChunks.forEach((bloodChunk) => bloodChunk.draw(drawer));
  }
}

export default BloodChunkCollection;