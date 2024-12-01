import Ship from './ship';

export default class Gameboard {
  constructor() {
    /*
    this.gameboard property is a graph with
    - 0 is empty water
    - "miss"
    - new Ship object
    - "hit"
    */
    this.board = new Array(10).fill(new Array(10).fill(0));
    this.ships = [];
  }

  placeShip(length, row, col, direction) {
    if (direction === 'horizontal') {
      // check if ship fits
      if (col + length > 10) return false;
      // check if all cells are empty
      for (let i = 0; i < length; i++) {
        if (this.board[row][col + i] !== 0) return false;
      }

      // create new Ship object
      const ship = new Ship(length);
      // add ship obj to gameboard
      this.ships.push(ship);
      // place new ship on the board
      for (let i = 0; i < length; i++) {
        this.board[row][col + i] = ship;
      }
    }
    if (direction === 'vertical') {
      // check if ship fits
      if (row + length > 10) return false;
      // check if all cells are empty
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] !== 0) return false;
      }

      // create new Ship object
      const ship = new Ship(length);
      // add ship obj to gameboard
      this.ships.push(ship);
      // place new ship on the board
      for (let i = 0; i < length; i++) {
        this.board[row + i][col] = ship;
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];

    // check if cell has already been attacked
    if (cell === 'hit' || cell === 'miss') return false;

    // if attack misses
    if (cell === 0) {
      this.board[row][col] = 'miss';
    }
    // if attack hits
    if (cell instanceof Ship) {
      cell.hit();
      this.board[row][col] = 'hit';
    }

    return true;
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
