const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Playlist = require('./../model/Playlist')
const Guild = require('./../model/Guild')

module.exports = {
   async index(req, res) {
      let playlists = await Playlist.find({
         $and: [
            { guild: { $in: req.user.guilds } },
            { active: true }
         ]
      });
      return res.send({ playlists });
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
      const guild = await Guild.findOne({ _id: guild_id })
      const result = await Playlist({
         name: name,
         guild: guild_id
      });

      result.save().catch(err => console.log(err));

      guild.playlists.push(result);
      guild.save();

      return res.send({ result });
   }
}
