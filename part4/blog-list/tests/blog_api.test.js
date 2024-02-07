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

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('all blogs have an id property', async () => {
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('after you save a blog, it is, in fact, saved', async () => {
  const blog = helper.exBlog
  await api.post('/api/blogs').send(blog).expect(201).expect('Content-type', /application\/json/)

  const blogs = await helper.blogsInEnd()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('when submitting a blog without the likes property, it defaults to zero', async () => {
  const blog = helper.exBlog
  delete blog.likes

  const response = await api.post('/api/blogs').send(blog)
  expect(response.body.likes).toBe(0)
})

test('when submitting a blog without a title or url, reject the request', async () => {
  const problemBlog1 = helper.exBlog
  delete problemBlog1.title

  await api.post('/api/blogs').send(problemBlog1).expect(400)

  const problemBlog2 = helper.exBlog
  delete problemBlog2.url

  await api.post('/api/blogs').send(problemBlog2).expect(400)
})

test('delete by id works', async () => {
  const id = helper.initialBlogs[0]._id
  await api.delete(`/api/blogs/${id}`).expect(204)

  const end = await helper.blogsInEnd()
  expect(end).not.toContainEqual(helper.initialBlogs[0])
})

test('updating a blog works', async () => {
  const changedBlog = helper.initialBlogs[0]
  changedBlog.likes = 999
  await api.put(`/api/blogs/${changedBlog._id}`).send(changedBlog).expect(200)

  const changedBlogtransf = changedBlog
  changedBlogtransf.id = changedBlog._id
  delete changedBlogtransf.__v
  delete changedBlogtransf._id
  const end = await helper.blogsInEnd()

  expect(end).toContainEqual(changedBlogtransf)
})

afterAll(async () => {
  await mongoose.connection.close()
})
