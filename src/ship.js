export default class Ship {
  constructor(length, hits = 0, sunk = false) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    if (this.hits < this.length) this.hits++;

    if (this.hits === this.length) this.sunk = true;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
