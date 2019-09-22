const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Song = require('./../model/Song')
const Playlist = require('./../model/Playlist')

module.exports = {
   async index(req, res) {
      let songs = await Song.find({
         $and: [
            { active: true },
         ]
      })
      return res.send({ songs })
   },
   async get(req, res) {
      let songs = await Song.get(req.params.playlist)
      return res.send({ songs })
   },
   async store(req, res) {
      let { youtube_link,
            comment,
            playlist_id,
            playlist_name } = req.body;

      if (!youtube_link)
         return res.status(500).send({ error: 'No link provided' });

      if (!playlist_id)
         if (!playlist_id && !playlist_name)
            return res.status(500).send({ error: 'No playlist name informed' });


      const playlist = await Playlist.findOne({
         $or: [
            { _id: playlist_id },
            { name: playlist_name }
         ],
         $and: [
            { active: true }
         ]
      });

      if (!playlist || playlist.length < 1)
         return res.status(400).send({ error: "Playlist does not exist" });

      const result = await Song({
         youtube_link,
         comment,
         playlist: playlist
      });

      result.save();

      if (!result.success)
         return res.status(500).send(result);

      return res.send(result);
   },
   async remove(req, res) {
      if (!req.body.music_id)
         return res.status(400).send({ error: 'No id, no delete' })
      let result = await Music.remove(req.body.music_id)
      return res.send(result)
   }
}
