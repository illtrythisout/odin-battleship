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
        if (this.board[row][col + i]) return false;
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
        if (this.board[row + i][col]) return false;
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
}
