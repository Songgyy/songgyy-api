const { Schema, model } = require('mongoose')

const GuildSchema = new Schema(
  {
    guild_id: {
      required: true,
      type: String,
      index: {
        unique: true
      }
    },
    guild_name: {
      required: true,
      type: String
    },
    playlists: [{
        ref: 'Playlist',
        type: Schema.Types.ObjectId
      }],
  },
    {
      timestamps: true
    }
)

module.exports = model('Guild', GuildSchema)
