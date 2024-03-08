const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (req, res) => {
  const { uName, name, pass } = req.body
  if (pass.length < 3) {
    const e = new Error('Validation Error: password must be at least 3 characters long')
    e.name = 'ValidationError'
    throw e
  }
  const passHash = await bcrypt.hash(pass, 10)
  const user = new User({
    uName,
    name,
    passHash,
    blogs: []
  })

  const savedUser = await user.save()
  logger.info(savedUser)
  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

module.exports = usersRouter
