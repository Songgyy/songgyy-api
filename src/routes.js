const express = require('express');
const AuthController = require('./controllers/auth');
const PlaylistController = require('./controllers/playlist');
const SongController = require('./controllers/song');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/user')
const GuildController = require('./controllers/guild')
const routes = express.Router();

const VERSION = '';

// users routse
routes.post(`${VERSION}/users/`, UserController.store);
routes.post(`${VERSION}/users/auth`, UserController.auth);
// guild routes
routes.get(`${VERSION}/guilds`, authMiddleware, GuildController.list);
routes.post(`${VERSION}/guilds`, authMiddleware, GuildController.store);
// playlists routes
routes.get(`${VERSION}/playlists/:playlist`, authMiddleware, PlaylistController.PlaylistSongs);
routes.get(`${VERSION}/playlists`, authMiddleware, PlaylistController.index);
routes.post(`${VERSION}/playlists`, authMiddleware, PlaylistController.store);
// routes.delete(`${VERSION}/playlists`, authMiddleware, PlaylistController.remove);
// songs routes
routes.get(`${VERSION}/songs`, authMiddleware, SongController.index);
// routes.get(`${VERSION}/songs/:playlist`, authMiddleware, SongController.get);
routes.post(`${VERSION}/songs`, authMiddleware, SongController.store);
// routes.delete(`${VERSION}/songs`, authMiddleware, SongController.remove);

module.exports = routes;
