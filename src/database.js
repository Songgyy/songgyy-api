const mongoose = require('mongoose')
const { db_host, db_user, db_password, db_database } = require('./config.json')

console.log(db_password)
const db = mongoose.connect(`mongodb://${db_host}:27017/${db_database}`, {
  user: db_user,
  pass: db_password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
module.exports = db
