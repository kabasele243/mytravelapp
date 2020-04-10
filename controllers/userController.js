const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


const filteredBody = (obj, ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.inlcueds(el))  newObj[el] = obj[el];
    });
    return newObj
}


exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})


exports.updateMe =catchAsync(async (req, res, next) => {
    //1.Create error if user POsts password data
if(req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
}
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findOneAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })
    //2.Update user document
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
})

exports.createUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
})

exports.getUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
})

exports.updateUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
})

exports.deleteUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })
})