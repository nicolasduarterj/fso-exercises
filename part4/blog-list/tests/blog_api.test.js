const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const userhelper = require('./user_helper')

const logintoken = async (index) => {
  const response = await api.post('/api/login').send({ uName: userhelper.initialUsers[index].uName, pass: userhelper.initialUsers[index].pass })
  return `Bearer ${response.body.token}`
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Promise.all(userhelper.initialUsers.map(user => api.post('/api/users').send(user)))
})

test('all blogs are returned', async () => {
  const token = await logintoken(0)
  const blogspromisearray = helper.initialBlogs.map(blog => api.post('/api/blogs').set('Authorization', token).send(blog))
  await Promise.all(blogspromisearray)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})
test('all blogs have an id property', async () => {
  const token = await logintoken(0)
  const blogspromisearray = helper.initialBlogs.map(blog => api.post('/api/blogs').set('Authorization', token).send(blog))
  await Promise.all(blogspromisearray)
  const response = await api.get('/api/blogs')
  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('after you save a blog, it is, in fact, saved', async () => {
  const token = await logintoken(0)
  const blog = helper.exBlog
  await api.post('/api/blogs').set('Authorization', token).send(blog).expect(201).expect('Content-type', /application\/json/)

  const blogs = await helper.blogsInEnd()
  expect(blogs).toHaveLength(1)
})
test('when submitting a blog without the likes property, it defaults to zero', async () => {
  const token = await logintoken(0)
  const blog = helper.exBlog
  delete blog.likes

  const response = await api.post('/api/blogs').set('Authorization', token).send(blog)
  expect(response.body.likes).toBe(0)
})

test('when submitting a blog without a title or url, reject the request', async () => {
  const token = await logintoken(0)
  const problemBlog1 = helper.exBlog
  delete problemBlog1.title

  await api.post('/api/blogs').set('Authorization', token).send(problemBlog1).expect(400)

  const problemBlog2 = helper.exBlog
  delete problemBlog2.url

  await api.post('/api/blogs').set('Authorization', token).send(problemBlog2).expect(400)
})
test('delete by id works', async () => {
  const token = await logintoken(0)
  const blogspromisearray = helper.initialBlogs.map(blog => api.post('/api/blogs').set('Authorization', token).send(blog))
  await Promise.all(blogspromisearray)
  const blog = await Blog.findOne({ name: helper.initialBlogs[0].name })
  const id = blog.id
  await api.delete(`/api/blogs/${id}`).set('Authorization', token).expect(204)

  const end = await helper.blogsInEnd()
  expect(end).not.toContainEqual(helper.initialBlogs[0])
})

test('updating a blog works', async () => {
  const token = await logintoken(0)
  const blogspromisearray = helper.initialBlogs.map(blog => api.post('/api/blogs').set('Authorization', token).send(blog))
  await Promise.all(blogspromisearray)
  const changedBlog = helper.initialBlogs[0]
  const bloginserver = await Blog.findOne({ name: changedBlog.name })
  console.log(bloginserver)
  const id = bloginserver.id
  changedBlog.likes = 999
  await api.put(`/api/blogs/${id}`).set('Authorization', token).send(changedBlog).expect(200)

  const changedBlogtransf = changedBlog
  changedBlogtransf.id = id
  delete changedBlogtransf.__v
  delete changedBlogtransf._id
  const user = await User.findOne({ uName: userhelper.initialUsers[0].uName })
  changedBlogtransf.user = user.id
  const end = await helper.blogsInEnd()
  end[0].user = end[0].user.toString()
  expect(end[0]).toEqual(changedBlogtransf)
})

afterAll(async () => {
  await mongoose.connection.close()
})
