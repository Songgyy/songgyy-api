const Guild = require('../model/Guild')
const User = require('../model/User')

module.exports = {
  async raiseHttpError(res, message, status = 400) {
    return res.status(status).send({ error: message })
  },

  async list(req, res) {
    const { guilds } = await User.findById(req.user.id).populate('guilds')
    res.send({ guilds })
  },

  async store(req, res) {
    const self = module.exports

    if (!req.body.name) return self.raiseHttpError(res, `No guild name provided provided`)

    if (!req.body.guild_id) return self.raiseHttpError(res, `No guild_id provided`)

    let guild_idExists = await Guild.findOne({ guild_id: req.body.email })

    if (guild_idExists) return self.raiseHttpError(res, `Guild already registered`)

    const newGuild = new Guild({
      guild_id: req.body.guild_id,
      guild_name: req.body.name
    })

    await newGuild.save().catch(err => res.send({ err }))
    await req.user.guilds.push(newGuild._id)
    await req.user.save()

    return await res.send({ ok: true, newGuild })
  }
}
