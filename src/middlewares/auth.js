const jwt = require('jsonwebtoken')
const config = require('../config.json')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: "No token, no playlist" })

  const parts = authHeader.split(' ')

  if (!parts.length === 2)
    return res.status(401).send({ error: "Token error" })

  const [ scheme, token ] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Malformed token" })


  jwt.verify(token, config.app_secret, (error, decoded) => {
    if (error)
      return res.status(401).send({ eror: "Invalid token" })

    req.userId = decoded.id

    return next()
  })

}
