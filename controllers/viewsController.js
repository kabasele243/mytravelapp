const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')


exports.getOverview = catchAsync(async(req, res) => {
    //1. Get tour Data from collection
const tours = await Tour.find()

    //2.Build template


    //3.Render that template using tour data
    res.status(200).render('overview', {
      tours
    });
})


exports.getTour = catchAsync(async (req, res) => {

    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    res.status(200).render('tour', {
      title: `${tour.name} Tour` ,
      tour
    });
})
