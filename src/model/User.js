const connection = require('./../database')


module.exports = {
  get: async (username) => {
    let user = await connection.query(
      `SELECT id, username, password FROM users 
      WHERE username = ?`, [ username ])
    return user[0][0]
  }
}

