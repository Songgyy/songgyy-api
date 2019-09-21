const { Schema, model } = require('mongoose')

const PlaylistSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    songs: [{
        ref: 'Song',
        type: Schema.Types.ObjectId
      }],
    guild: {
      ref: 'Guild',
      type: Schema.Types.ObjectId
    }
  },
    {
      timestamps: true
    }
)

module.exports = model('Playlist', PlaylistSchema)
