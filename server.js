const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')

// const app = express()
const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
const port = process.env.PORT || 3333


// const connectUsers = {}

// io.on('connection', socket => {
//   // console.log('Nova conexão', socket.id)
//   const { user } = socket.handshake.query
//   connectUsers[user] = socket.id
//   console.log(user, socket.id)
// })

// app.use((req, res, next) => {
//   req.io = io
//   req.connectUsers = connectUsers

//   return next()
// })

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port)
console.log(`listening on port ${port}`)
