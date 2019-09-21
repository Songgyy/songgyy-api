const Guild = require('../model/Guild')

module.exports = {
  async raiseHttpError(res, message, status = 400) {
      return res.status(status).send({ error: message });
  },

  async list(req, res) {
    return;
  },

  async store(req, res) {
    const self = module.exports
   
    if (!req.body.name)
      return self.raiseHttpError(res, `No username provided`);

    if (!req.body.guild_id)
      return self.raiseHttpError(res, `No email provided`);

    let guild_idExists = await User.findOne({ guild_id: req.body.email });

    if (guild_idExists)
      return self.raiseHttpError(res, `Username already picked`);

    const newGuild = new Guild({
      guild_id: req.body.guild_id,
      name: req.body.name
    });

    await newGuild.save().catch(err => res.status(500).send(err));

    res.send({ ok: true })

  }
}
