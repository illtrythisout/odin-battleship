import Ship from '../ship';

const ship = new Ship(3);

afterEach(() => {
  ship.hits = 0;
  ship.sunk = false;
});

it('Constructor properties work with inputs', () => {
  const ship = new Ship(5, 2, true);

  expect(ship).toEqual({ length: 5, hits: 2, sunk: true });
});
it('Constructor properties work with default inputs', () => {
  expect(ship).toEqual({ length: 3, hits: 0, sunk: false });
});

it('hit() function works', () => {
  ship.hit();
  expect(ship).toEqual({ length: 3, hits: 1, sunk: false });
});
it('hit() updates sunk property', () => {
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship).toEqual({ length: 3, hits: 3, sunk: true });
});
it("hit() does'nt increase hits if sunk", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship).toEqual({ length: 3, hits: 3, sunk: true });
});

it('isSunk() function works', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
