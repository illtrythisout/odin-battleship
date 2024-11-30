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

// create gameboard
it('board property starts as a graph filled with objects {type: water, isHit: false}', () => {
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
it('board adds ship to the ships property', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  expect(board.ships).toEqual([{ length: 3, hits: 0 }]);
});

// placeShip
it('board correctly places ship horizontally', () => {
  board.placeShip(2, 3, 5, 'horizontal');
  expect(board.board[3][5]).toEqual({ length: 2, hits: 0 });
  expect(board.board[3][6]).toEqual({ length: 2, hits: 0 });
  expect(board.board[3][7]).toEqual(0);
});
it('board correctly places ship vertically', () => {
  board.placeShip(2, 3, 5, 'vertical');
  expect(board.board[3][5]).toEqual({ length: 2, hits: 0 });
  expect(board.board[4][5]).toEqual({ length: 2, hits: 0 });
  expect(board.board[5][5]).toEqual(0);
});
it("board does'nt place ships when there already are ships", () => {
  board.placeShip(2, 3, 5, 'vertical');
  expect(board.placeShip(5, 4, 4, 'horizontal')).toBeFalsy();
});
it("board does'nt place ships when there beyond the board", () => {
  expect(board.placeShip(5, 9, 0, 'vertical')).toBeFalsy();
});

// receiveAttack
it('board changes attacked ship coords to hit', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  board.receiveAttack(3, 5);
  expect(board.board[3][5]).toEqual('hit');
});
it('board changes attacked water coords to miss', () => {
  board.receiveAttack(3, 5);
  expect(board.board[3][5]).toEqual('miss');
});
it('hit ships increase hits property', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  board.receiveAttack(3, 5);
  expect(board.ships[0].hits).toEqual(1);
});
it('cannot attack hit ships', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  board.receiveAttack(3, 5);
  expect(board.receiveAttack(3, 5)).toBeFalsy();
});
it('cannot attack previous missed shots in water', () => {
  board.receiveAttack(3, 5);
  expect(board.receiveAttack(3, 5)).toBeFalsy();
});

// areAllShipsSunk
it('all ships are sunk', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  board.receiveAttack(3, 5);
  board.receiveAttack(3, 6);
  board.receiveAttack(3, 7);
  expect(board.areAllShipsSunk()).toBeTruthy();
});
it('all ships are not sunk', () => {
  board.placeShip(3, 3, 5, 'horizontal');
  board.receiveAttack(3, 5);
  board.receiveAttack(3, 6);
  board.receiveAttack(3, 7);

  board.placeShip(3, 5, 5, 'horizontal');
  expect(board.areAllShipsSunk()).toBeFalsy();
});
