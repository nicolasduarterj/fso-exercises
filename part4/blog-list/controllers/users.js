const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (req, res) => {
  const { uName, name, pass } = req.body
  const passHash = await bcrypt.hash(pass, 10)

  const user = new User({
    uName,
    name,
    passHash
  })

  const savedUser = await user.save()
  logger.info(savedUser)
  res.status(201).json(savedUser)
})

module.exports = usersRouter
