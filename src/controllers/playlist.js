const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Playlist = require('./../model/Playlist')
const Song = require('./../model/Song')
const Guild = require('./../model/Guild')

module.exports = {
  async index(req, res) {
    const { guild_id } = req.query

    console.log(req.query)
    if (guild_id) {
      console.log('enviando somente playlists da', guild_id)
      const { playlists } = await Guild.findOne({ guild_id }).populate({
        path: 'playlists',
        options: { $and: [{ active: true }] }
      })
      return await res.send({ playlists })
    }

    let playlists = await Playlist.find({
      $and: [{ guild: { $in: req.user.guilds } }, {}]
    })

    return await res.send({ playlists })
  },
  async get(req, res) {
    let playlist = await Playlist.get(req.params.name)
    return res.send({ playlist })
  },
  async PlaylistSongs(req, res) {
    // let playlists = await Playlist.allWithSongs()
    const { playlist_name } = req.params
    const playlist = await Playlist.find({
      $and: [{ guild: { $in: req.user.guilds } }, { name: playlist_name }, { active: true }]
    }).populate({ path: 'songs', options: { sort: { order: 1 } } })
    return res.send({ ...playlist })
  },
  async store(req, res) {
    if (!req.body.name) return res.status(400).send({ error: 'No name provided' })

    if (!req.body.guild_id) return res.status(400).send({ error: 'No guild provided' })

    const { name, guild_id, comment } = req.body
    const guild = await Guild.findOne({ _id: guild_id })
    const result = await Playlist({
      name,
      guild: guild_id,
      comment
    })

    result.save().catch(err => console.log(err))

    guild.playlists.push(result)
    guild.save()

    return res.send({ result })
  }
}
