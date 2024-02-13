const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./user_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const initUsers = helper.initialUsers.map(user => new User(user))
  const promiseArray = initUsers.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('adding one user works', async () => {
  await api.post('/api/users').send(helper.newuser).expect(201)
})

test('only unique usernames accepted', async () => {
  await api.post('/api/users').send(helper.newuser)
  await api.post('/api/users').send(helper.newuser).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
