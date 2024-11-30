import Gameboard from '../gameboard';

const board = new Gameboard();

beforeEach(() => {
  board.board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  board.ships = [];
});

it('gameboard property starts as a graph filled with objects {type: water, isHit: false}', () => {
  expect(board.board).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});
it('gameboard adds ship to the ships property', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  expect(board.ships).toEqual([{ length: 3, hits: 0, sunk: false }]);
});
it('gameboard correctly places ship horizontally', () => {
  board.placeShip(2, 3, 5, 'horizontal');
  expect(board.board[3][5]).toEqual({ length: 2, hits: 0, sunk: false });
  expect(board.board[3][6]).toEqual({ length: 2, hits: 0, sunk: false });
  expect(board.board[3][7]).toEqual(0);
});
it('gameboard correctly places ship vertically', () => {
  board.placeShip(2, 3, 5, 'vertical');
  expect(board.board[3][5]).toEqual({ length: 2, hits: 0, sunk: false });
  expect(board.board[4][5]).toEqual({ length: 2, hits: 0, sunk: false });
  expect(board.board[5][5]).toEqual(0);
});
it('gameboard doesnt place ships where there already are ships', () => {
  board.placeShip(2, 3, 5, 'vertical');
  expect(board.placeShip(5, 4, 4, 'horizontal')).toBeFalsy();
});
it('gameboard doesnt place ships where there beyond the board', () => {
  expect(board.placeShip(5, 0, 9, 'vertical')).toBeFalsy();
});
