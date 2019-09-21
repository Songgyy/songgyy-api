const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Playlist = require('./../model/Playlist')

module.exports = {
   async index(req, res) {
      let playlists = await Playlist.all()   
      return res.send({ playlists })
   },
   async get(req, res) {
      let playlist = await Playlist.get(req.params.name)
      return res.send({ playlist })
   },
   async getWithSongs(req, res) {
      let playlists = await Playlist.allWithSongs()
      return res.send({playlists})
   },
   async store(req, res) {
      if (!req.body.name)
         return res.status(500).send({ error: 'No name provided' })

      let result = await Playlist.new(req.body.name)

      if (!result.success)
         return res.status(500).send(result)

      return result
   }
}
