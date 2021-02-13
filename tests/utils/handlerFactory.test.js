// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError')
// const APIFeatures = require('./../utils/apiFeatures');

const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
