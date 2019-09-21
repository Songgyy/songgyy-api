const { Schema, model } = require('mongoose')

const SongSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    youtube_link: {
      required: true,
      type: String,
    },
    comment: {
      required: false,
      type: String,
    },
    playlist: {
      ref: 'Playlist',
      type: Schema.Types.ObjectId
    }
  },
    {
      timestamps: true
    }
)

module.exports = model('Song', SongSchema)
