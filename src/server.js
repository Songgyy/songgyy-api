const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const db = require('./database')

// create connection

const app = express()

// get the destination port
const port = process.env.PORT || 3000

// cors?
app.use(cors())
// use json, please
app.use(express.json())
// use routes, please
app.use(routes)

// listen to a port
app.listen(port)
// logs a pretty message.
console.log(`listening on port ${port}`)
