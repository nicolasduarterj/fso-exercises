const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginrouter = require('express').Router()
const User = require('../models/user')

loginrouter.post('/', async (request, response) => {
  const { uName, pass } = request.body
  const user = await User.findOne({ uName })
  const passCorrect = user == null ? false : await bcrypt.compare(pass, user.passHash)

  if (user === null || !passCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const userfortoken = { uName: user.uName, id: user.id }
  const token = jwt.sign(userfortoken, process.env.SECRET)

  response.status(200).send({ token, uName: user.uName, name: user.name })
})

module.exports = loginrouter
