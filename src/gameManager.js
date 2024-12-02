import Gameboard from './gameboard';
import Player from './player';

export default function runGame() {
  let player = new Player('human');
  let computer = new Player('computer');
  computer.placeShipsRandomly();
  player.placeShipsRandomly();

  // while no one has won
  while (!player.board.areAllShipsSunk() && !computer.board.areAllShipsSunk()) {
    // player attacks computer
    let row = parseInt(prompt('row')); // REPLACE WITH DOM INPUT
    let col = parseInt(prompt('col')); // REPLACE WITH DOM INPUT

    if (!computer.board.receiveAttack(row, col)) {
      break;
    }

    console.log('COMPUTER BOARD:'); // REPLACE WITH DOM OUTPUT
    computer.board.board.forEach((row) => console.log(row));

    player.getShotRandomly();
    console.log('PLAYER BOARD:'); // REPLACE WITH DOM OUTPUT
    player.board.board.forEach((row) => console.log(row));
  }
}
