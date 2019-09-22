const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Song = require('./../model/Song')
const Playlist = require('./../model/Playlist')

module.exports = {
   async index(req, res) {
      let songs = await Song.all()   
      return res.send({ songs })
   },
   async get(req, res) {
      let songs = await Song.get(req.params.playlist)
      return res.send({ songs })
   },
   async store(req, res) {
      let { youtube_link, comment, playlist_id } = req.body

      if (!youtube_link)
         return res.status(500).send({ error: 'No link provided' })

      if (!playlist_id)
         return res.status(500).send({ error: 'No playlist informed' })

      let result = await Music.new(youtube_link, comment, playlist_id)

      if (!result.success)
         return res.status(500).send(result)

      return res.send(result)
   },
   async remove(req, res) {
      if (!req.body.music_id)
         return res.status(400).send({ error: 'No id, no delete' })
      let result = await Music.remove(req.body.music_id)
      return res.send(result)
   }
}
