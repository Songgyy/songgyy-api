const connection = require('./../database')

module.exports = {
  all: async () => {
    let playlists = await connection.query(`SELECT m.*, p.name 
      FROM musics m
      JOIN playlists p
        ON p.id = m.playlist_id 
      ORDER BY id`)
    return playlists[0]
  },
  get: async (playlist_name) => {
    let playlists = await connection.query(`SELECT m.*, p.name 
      FROM musics m
      JOIN playlists p
        ON p.id = m.playlist_id 
      WHERE p.name = ?
      ORDER BY id`, [ playlist_name ])
    return playlists[0]
  },
  new: async (youtube_link, comment, playlist_id) => {
    return await connection.query(
      `INSERT INTO musics (youtube_link, comment, playlist_id)
      VALUES (?, ?, ?)`,
      [youtube_link, comment, playlist_id], (err, result) => {
        if (err) {
          console.log(err)
          return { success: false, error: 'Error inserting playlist' }
         }

        return { success: false, result }
      })
      .catch(err => {
        return { success: false, error: err }
      })
  },
  remove: async(music_id) => {
    if (!music_id)
      return { success: false, error: 'No deletes without wheres' }

    return await connection.query(`
      DELETE FROM musics WHERE id = ? LIMIT 1
    `, [ music_id ], ( err, result ) => {
      if (err) {
        console.log(err)
        return { success: false, error: 'Error deleting' }
      }
      return { success: true, result }
    })
      .catch(err => {
        return { success: false, error: err }
      })
  }
}
