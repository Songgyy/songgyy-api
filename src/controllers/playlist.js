const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Playlist = require('./../model/Playlist')
const Song = require('./../model/Song')
const Guild = require('./../model/Guild')

module.exports = {
  async index(req, res) {
    const { guild_id } = req.query

    if (guild_id) {
      console.log(guild_id)
      const guild = await Guild.findOne({ guild_id })
      if (!guild) return await res.send({ playlists: [] })
      const playlists = await Playlist.find({
        $and: [{ guild: { $eq: guild._id } }, { active: true }]
      })

      console.log(playlists)

      return await res.send({ playlists })
    } // end if

    const playlists = await Playlist.find({
      $and: [{ guild: { $in: req.user.guilds } }]
    }).populate('guild')

    return await res.send({ playlists })
  },
  async get(req, res) {
    let playlist = await Playlist.get(req.params.name)
    return res.send({ playlist })
  },
  async PlaylistSongs(req, res) {
    // let playlists = await Playlist.allWithSongs()
    const { playlist_name, guild_id } = req.params
    console.log(guild_id)
    const guild = await Guild.findOne({ guild_id })
    const playlist = await Playlist.find({
      $and: [{ guild: { $eq: guild._id } }, { name: playlist_name }, { active: true }]
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
  },
  async PlaylistClone(req, res) {
    const { playlist_id } = req.params
    const { guildId } = req.body
    if (!playlist_id) return res.status(400).send({ error: 'No id provided' })
    if (!guildId) return res.status(400).send({ error: 'No guild provided' })

    const guild = await Guild.findById(guildId)
    if (!guild) return res.status(400).send({ error: 'Guild does not exists' })

    const oldPlaylist = await Playlist.findById(playlist_id).populate('songs')
    if (!oldPlaylist) return res.status(400).send({ error: 'Playlist does not exists' })

    const newPlaylist = await Playlist.create({
      name: oldPlaylist.name,
      comment: `Clonned from ${oldPlaylist.name}`,
      active: oldPlaylist.active,
      songs: [],
      guild: guildId
    })

    oldPlaylist.songs = oldPlaylist.songs.map(song => {
      song._id = undefined
      song.__v = undefined
      song.playlist = newPlaylist
      return song
    })

    const newSongs = await Song.insertMany(oldPlaylist.songs)

    if (newSongs) {
      newSongs.forEach(song => {
        newPlaylist.songs.push(song)
      })
    }

    newPlaylist.save().catch(err => console.log(err))

    return res.send({ playlist: newPlaylist })
  }
}
