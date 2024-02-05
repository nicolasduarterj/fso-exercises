const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const initBlogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = initBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('all notes have an id property', async () => {
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})
