const express = require('express');
const AuthController = require('./controllers/auth');
const PlaylistController = require('./controllers/playlist');
const MusicController = require('./controllers/music');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/user')
const GuildController = require('./controllers/guild')
const routes = express.Router();

// users routse
routes.post('/authenticate', AuthController.auth);
routes.post('/users/', UserController.store);
// guild routes
routes.get('/guilds', authMiddleware, GuildController.list);
routes.post('/guilds', authMiddleware, GuildController.store);
// playlists routes
routes.get('/playlists/songs', authMiddleware, PlaylistController.getWithSongs);
routes.get('/playlists', authMiddleware, PlaylistController.index);
routes.post('/playlists', authMiddleware, PlaylistController.store);
// routes.delete('/playlists', authMiddleware, PlaylistController.remove);
// songs routes
routes.get('/songs', authMiddleware, MusicController.index);
routes.get('/songs/:playlist', authMiddleware, MusicController.get);
// routes.post('/songs', authMiddleware, MusicController.store);
// routes.delete('/songs', authMiddleware, MusicController.remove);

module.exports = routes;
