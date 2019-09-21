const User = require('../model/User')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

const generateToken = (params = {}) => {
  return jwt.sign(params, config.app_secret)
}

module.exports = {
  async auth(req, res) {
    const { username, password } = req.body
    const user = await User.get(username)

    if (!user || user.length < 1)
      return res.status(400).send({ error: 'User not found' })

    if (user.password !== password)
      return res.status(403).send({ error: 'Invalid password' })

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })
  },
}
