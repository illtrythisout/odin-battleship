import Player from './player';
import DOM from './dom';

export default class GameManager {
  constructor() {
    this.player = new Player('human');
    this.computer = new Player('computer');
    this.dom = new DOM();

    // place ships
    this.computer.placeShipsRandomly();
    this.player.placeShipsRandomly();

    this.initGame();
  }

  initGame() {
    this.dom.renderBoard(this.player, 'player');
    this.dom.renderBoard(this.computer, 'computer', true);

    // initialize event listeners
    this.dom.onCellClick((row, col) => this.handlePlayerMove(row, col));
  }

  handlePlayerMove(row, col) {
    // player attacks computer
    const success = this.computer.board.receiveAttack(row, col); // execute receive attack, and store true or false in success
    if (!success) return; // stop the method from running further and wait for the player to click another cell
    if (this.computer.board.board[row][col] === 'hit') {
      this.dom.updateCell('computer', row, col, 'hit');
    } else {
      this.dom.updateCell('computer', row, col, 'miss');
    }

    // check if the player has won
    if (this.computer.board.areAllShipsSunk()) {
      this.dom.displayMessage('Player Wins!');
      this.dom.onCellClickRemove((row, col) => this.handlePlayerMove(row, col));
      return;
    }

    // computer's turn
    this.handleComputerMove();
  }

  handleComputerMove() {
    let coords = this.player.getShotRandomly();

    // to aid in debugging
    if (
      !coords ||
      coords.row < 0 ||
      coords.row >= 10 ||
      coords.col < 0 ||
      coords.col >= 10
    ) {
      console.warn('Invalid coordinates returned by getShotRandomly:', coords);
      return;
    }

    const cell = this.player.board.board[coords.row][coords.col];
    const status = cell === 'hit' ? 'hit' : 'miss';
    if (status) this.dom.updateCell('player', coords.row, coords.col, status);

    // check if the computer has won
    if (this.player.board.areAllShipsSunk()) {
      this.dom.displayMessage('Computer Wins!');
      this.dom.onCellClickRemove((row, col) => this.handlePlayerMove(row, col));
      return;
    }
  }
}
