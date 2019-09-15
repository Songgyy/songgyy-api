const connection = require('./../database')


module.exports = {
  all: async () => {
    let playlists = await connection.query('SELECT * FROM playlists ORDER BY id')
    return playlists[0]
  },
  allWithSongs: async() => {
    let playlist = await connection.query(`
    select playlists.*, count(musics.id) as 'SongsCount'
    FROM playlists
    JOIN musics on musics.playlist_id = playlists.id
    GROUP BY playlists.name
    `)
    return playlist[0]
  },
  get: async (playlistId) => {
    let user = await connection.query(
      `SELECT * FROM playlists WHERE name = ? LIMIT 1`, [ playlistId ])
    return user[0]
  },
  new: async (playlistName) => {
    return await connection.query(
      'INSERT INTO playlists (name) VALUES (?)',
      [playlistName], (err, result) => {
        if (err) {
          console.log(err)
          return { success: false, error: 'Error inserting playlist' }
         }

        return { success: false, result }
      })
      .catch(err => {
        return { success: false, error: err }
      })
  }
}
