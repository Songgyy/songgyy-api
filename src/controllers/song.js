const User = require('../model/User')
const jwt = require('jsonwebtoken')
const Song = require('./../model/Song')
const Playlist = require('./../model/Playlist')

module.exports = {
  async index(req, res) {
    let playlists = await Playlist.find({
      $and: [{ guild: { $in: req.user.guilds } }, { active: true }]
    })
    let songs = await Song.find({
      $and: [{ playlist: { $in: playlists } }, { active: true }]
    }).sort(['order', 1])
    return res.send({ songs })
  },
  async get(req, res) {
    let songs = await Song.get(req.params.playlist)
    return res.send({ songs })
  },
  async store(req, res) {
    let { youtube_link, comment, playlist_id, playlist_name, order } = req.body

    if (!youtube_link) return res.status(500).send({ error: 'No link provided' })

    if (!playlist_id)
      if (!playlist_id && !playlist_name) return res.status(500).send({ error: 'No playlist name informed' })

    const playlist = await Playlist.findOne({
      $or: [{ _id: playlist_id }, { name: playlist_name }],
      $and: [{ active: true }]
    })

    if (!playlist || playlist.length < 1) return res.status(400).send({ error: 'Playlist does not exist' })

    const result = await Song({
      youtube_link,
      comment,
      playlist: playlist,
      order
    })

    result.save().catch(err => console.log(err))

    playlist.songs.push(result)
    playlist.save().catch(err => console.log(err))

    return res.send(result)
  },
  async update(req, res) {
    let { _id, youtube_link, active, comment, order } = req.body

    if (!_id) return res.status(400).send({ error: 'No id, no updates' })

    let song = await Song.findOne({ _id })
    if (!song) return res.status(400).send({ error: 'Song not found' })
    if (youtube_link) song['youtube_link'] = youtube_link

    // if must be either true or false
    if (typeof active !== 'undefined') song.active = active

    if (comment) song.comment = comment

    if (order) song.order = order

    await song.save().catch(err => console.log(err))
    return res.send(song)
  },
  async remove(req, res) {
    const { _id } = req.params
    if (!_id) return res.status(400).send({ error: 'No id, no delete' })
    const result = await Song.remove({ _id })
    return res.send(result)
  }
}
