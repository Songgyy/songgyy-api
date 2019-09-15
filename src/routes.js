const express = require('express')
const AuthController = require('./controllers/auth')
const PlaylistController = require('./controllers/playlist')
const MusicController = require('./controllers/music')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

routes.post('/authenticate', AuthController.auth)
routes.get('/playlists/songs', authMiddleware, PlaylistController.getWithSongs)
routes.get('/playlists', authMiddleware, PlaylistController.index)
routes.post('/playlists', authMiddleware, PlaylistController.store)
routes.get('/songs', authMiddleware, MusicController.index)
routes.get('/songs/:playlist', authMiddleware, MusicController.get)
routes.post('/songs', authMiddleware, MusicController.store)
routes.delete('/songs', authMiddleware, MusicController.remove)

module.exports = routes
