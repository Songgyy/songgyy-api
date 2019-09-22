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
         return res.status(400).send({ error: 'No name provided' });

      if (!req.body.guild_id)
         return res.status(400).send({ error: 'No guild provided' });

      const { name, guild_id } = req.body;
      const result = await Playlist.new(name);

      if (!result.success)
         return res.status(500).send({ result });

      return res.send({ result });
   }
}
