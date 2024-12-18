import Ship from './ship';

export default class DOM {
  constructor() {
    this.playerBoard = document.querySelector('#playerGameboard .board');
    this.computerBoard = document.querySelector('#computerGameboard .board');
    this.messageContainer = document.querySelector('.message');
    this.cellClickHandler = null; // Store event listener references
  }

  renderBoard(player, type, hideShips = false) {
    const board = type === 'player' ? this.playerBoard : this.computerBoard;
    board.innerHTML = ''; // clear existing board

    // loop through board, create elements and assign ship class to ships
    player.board.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;

        if (cell instanceof Ship && !hideShips) cellDiv.classList.add('ship');

        board.appendChild(cellDiv);
      });
    });
  }

  updateCell(type, row, col, state) {
    const board = type === 'player' ? this.playerBoard : this.computerBoard;
    const cellDiv = board.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );

    // to aid in debugging
    if (cellDiv) {
      cellDiv.classList.add(state);
    } else {
      console.console.warn(`Cell not found for row: ${row}, col: ${col}`);
      return;
    }
  }

  onCellClick(callback, type = 'computer') {
    const board = type === 'player' ? this.playerBoard : this.computerBoard;

    // Save the event listener reference
    this.cellClickHandler = (e) => {
      const cell = e.target;
      if (cell.classList.contains('cell')) {
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);
        callback(row, col);
      }
    };

    board.addEventListener('click', this.cellClickHandler);
  }

  onCellClickRemove(callback, type = 'computer') {
    const board = type === 'player' ? this.playerBoard : this.computerBoard;

    // Use the stored reference to remove the listener
    if (this.cellClickHandler) {
      board.removeEventListener('click', this.cellClickHandler);
      this.cellClickHandler = null; // Clean up the reference
    }
  }

  displayMessage(message) {
    this.messageContainer.textContent = message;
  }
}
