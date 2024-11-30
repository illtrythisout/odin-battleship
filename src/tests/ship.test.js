import Ship from '../ship';

const ship = new Ship(3);

afterEach(() => {
  ship.hits = 0;
});

it('Constructor properties work with inputs', () => {
  const ship = new Ship(5, 2, true);

  expect(ship).toEqual({ length: 5, hits: 2 });
});
it('Constructor properties work with default inputs', () => {
  expect(ship).toEqual({ length: 3, hits: 0 });
});

it('hit() function works', () => {
  ship.hit();
  expect(ship).toEqual({ length: 3, hits: 1 });
});

it('isSunk() function works', () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
