const { Schema, model } = require('mongoose')

const SongSchema = new Schema(
  {
    youtube_link: {
      required: true,
      type: String
    },
    comment: {
      required: false,
      type: String
    },
    active: {
      default: true,
      type: Boolean
    },
    playlist: {
      ref: 'Playlist',
      type: Schema.Types.ObjectId
    },
    order: {
      default: 10,
      required: false,
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Song', SongSchema)
