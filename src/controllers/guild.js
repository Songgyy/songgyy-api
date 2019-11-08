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

    if (!req.body.id) return self.raiseHttpError(res, `No guild_id: id provided`)

    if (!req.body.username) return self.raiseHttpError(res, `No username provided`)

    let newGuild = await Guild.findOne({ guild_id: req.body.id })

    // if (guild_idExists) return self.raiseHttpError(res, `Guild already registered`)

    if (!newGuild) {
      newGuild = new Guild({
        guild_id: req.body.id,
        guild_name: req.body.name
      })
      await newGuild.save().catch(err => res.send({ err }))
    }

    const user = await User.findOne({ username: req.body.username })

    if (!user) return await self.raiseHttpError(res, `username ${req.body.username} not match anyone`)

    await user.guilds.push(newGuild._id)
    await user.save()

    return await res.send({ ok: true, newGuild })
  }
}
