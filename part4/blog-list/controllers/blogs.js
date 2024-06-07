const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { uName: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  console.log(blog)
  if (blog !== null) {
    const user = await User.findById(blog.user.toString())
    if (user.id !== req.user?.id) {
      return res.status(401).send({ error: 'Mismatched user' })
    }
    user.blogs = user.blogs.filter(blogid => blogid.toString() !== id)
    await Blog.findByIdAndDelete(id)
    await user.save()
  }
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const oldblog = await Blog.findById(req.params.id)
  console.log(oldblog)
  console.log(`Userid:${req.user.id}, blogauthorid:${oldblog.user}`)
  if (req.user?.id !== oldblog.user.toString()) {
    return res.status(401).send({ error: 'Mismatched user' })
  }
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user.id
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
  res.json(updatedBlog)
})

module.exports = blogsRouter
