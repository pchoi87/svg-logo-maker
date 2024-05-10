const { Circle, Triangle, Square } = require('./shapes');

test('Circle render method returns correct SVG string', () => {
  const circle = new Circle('blue');
  expect(circle.render()).toBe('<circle cx="150" cy="100" r="80" fill="blue" />');
});

test('Triangle render method returns correct SVG string', () => {
  const triangle = new Triangle('green');
  expect(triangle.render()).toBe('<polygon points="150,20 100,180 200,180" fill="green" />');
});

test('Square render method returns correct SVG string', () => {
  const square = new Square('yellow');
  expect(square.render()).toBe('<rect x="100" y="50" width="100" height="100" fill="yellow" />');
});
