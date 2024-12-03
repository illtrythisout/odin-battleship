import Gameboard from './gameboard';

export default class Player {
  constructor(type) {
    this.type = type; // human or computer
    this.board = new Gameboard();
  }

  placeShipsRandomly() {
    const shipLengths = [2, 3, 3, 4, 5];

    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        // if it is possible to place the ship, place it
        if (this.board.placeShip(length, row, col, direction)) placed = true;
      }
    });
  }

  getShotRandomly() {
    let shot = false;

    while (!shot) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);

      if (this.board.receiveAttack(row, col)) {
        shot = true;
        return { row: row, col: col };
      }
    }
  }
}
