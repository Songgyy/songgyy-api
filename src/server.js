const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const db = require('./database')
const morgan = require('morgan')

// create connection

const app = express()

// get the destination port
const port = process.env.PORT || 3000

// cors?
app.use(cors())
app.use(morgan('combined'))
// use json, please
app.use(express.json())
// use routes, please
app.use(routes)

// listen to a port
app.listen(port)
// logs a pretty message.
console.log(`listening on port ${port}`)
