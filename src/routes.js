const express = require('express');
const AuthController = require('./controllers/auth');
const PlaylistController = require('./controllers/playlist');
const SongController = require('./controllers/song');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/user')
const GuildController = require('./controllers/guild')
const routes = express.Router();

// users routse
routes.post('/users/', UserController.store);
routes.post('/users/auth', UserController.auth);
// guild routes
routes.get('/guilds', authMiddleware, GuildController.list);
routes.post('/guilds', authMiddleware, GuildController.store);
// playlists routes
routes.get('/playlists/songs', authMiddleware, PlaylistController.getWithSongs);
routes.get('/playlists', authMiddleware, PlaylistController.index);
routes.post('/playlists', authMiddleware, PlaylistController.store);
// routes.delete('/playlists', authMiddleware, PlaylistController.remove);
// songs routes
routes.get('/songs', authMiddleware, SongController.index);
routes.get('/songs/:playlist', authMiddleware, SongController.get);
routes.post('/songs', authMiddleware, SongController.store);
// routes.delete('/songs', authMiddleware, SongController.remove);

module.exports = routes;
