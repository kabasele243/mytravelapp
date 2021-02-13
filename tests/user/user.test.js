const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory')


const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


// exports.getMe = (req, res , next) => {
//     req.params.id = req.user.id;
//     next();
// }
test('Should Get Current User', (req, res, next) => {
  const response = await request(app).post('/users').send({
      name: 'Franck',
      email: 'franck@example.com',
      password: 'MyPass777!'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
      user: {
          name: 'Franck',
          email: 'franck@example.com'
      }
  })
  expect(user.password).not.toBe('MyPass777!')
})

// exports.updateMe = catchAsync(async (req, res, next) => {
//     //1.Create error if user POsts password data
// if(req.body.password || req.body.passwordConfirm) {
//     return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
// }
//     const filteredBody = filterObj(req.body, 'name', 'email');
//     const updatedUser = await User.findOneAndUpdate(req.user.id, filteredBody, {
//         new: true,
//         runValidators: true
//     })
//     //2.Update user document
//     res.status(200).json({
//         status: 'success',
//         data: {
//             user: updatedUser
//         }
//     })
// })

test('Should Update Current User', (req, res, next) => {
  const response = await request(app).post('/users').send({
      name: 'Franck',
      email: 'franck@example.com',
      password: 'MyPass777!'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
      user: {
          name: 'Franck',
          email: 'franck@example.com'
      }
  })
  expect(user.password).not.toBe('MyPass777!')
})


// exports.deleteMe = catchAsync(async(req, res, next) => {
//     await User.findByIdAndUpdate(req.user.id, { active: false});

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// })

test('Should Delete Current User', (req, res, next) => {
  const response = await request(app).post('/users').send({
      name: 'Franck',
      email: 'franck@example.com',
      password: 'MyPass777!'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
      user: {
          name: 'Franck',
          email: 'franck@example.com'
      }
  })
  expect(user.password).not.toBe('MyPass777!')
})

// exports.getAllUsers = factory.getAll(User);
test('Should Should Get All the User', (req, res, next) => {
  const response = await request(app).post('/users').send({
      name: 'Franck',
      email: 'franck@example.com',
      password: 'MyPass777!'
  }).expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(response.body).toMatchObject({
      user: {
          name: 'Franck',
          email: 'franck@example.com'
      }
  })
  expect(user.password).not.toBe('MyPass777!')
})


// exports.getUser =factory.getOne(User);
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);



test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
      email: userOne.email,
      password: userOne.password
  }).expect(200)
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/users/login').send({
      email: userOne.email,
      password: 'thisisnotmypass'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
      .get('/users/me')
      .send()
      .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account for unauthenticate user', async () => {
  await request(app)
      .delete('/users/me')
      .send()
      .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
      .post('/users/me/avatar')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .attach('avatar', 'tests/fixtures/profile-pic.jpg')
      .expect(200)
  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
          name: 'Jess'
      })
      .expect(200)
  const user = await User.findById(userOneId)
  expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async () => {
  await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
          location: 'Philadelphia'
      })
      .expect(400)
})