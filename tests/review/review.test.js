const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory')


const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// exports.setTourUserIds = ( req, res, next ) => {
//     if(!req.body.tour) req.body.tour = req.params.tourId;
//     if(!req.body.user) req.body.user = req.user.id;
//     next();
// }
// exports.getAllReviews = factory.getAll(Review)
// exports.getReview = factory.getOne(Review);
// exports.createReview = factory.createOne(Review);
// exports.deleteReview = factory.deleteOne(Review);
// exports.updateReview = factory.updateOne(Review);