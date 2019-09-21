const User = require('../model/User')

module.exports = {
  async raiseHttpError(res, message, status = 400) {
      return res.status(status).send({ error: message });
  },

  async store(req, res) {
    const self = module.exports

    
    if (!req.body.username)
      return self.raiseHttpError(res, `No username provided`);

    if (!req.body.email)
      return self.raiseHttpError(res, `No email provided`);

    if (!req.body.password)
      return self.raiseHttpError(res, `No password provided`);

    let usernameExists = await User.findOne({ username: req.body.username });
    let emailExists = await User.findOne({ email: req.body.email });

    if (usernameExists)
      return self.raiseHttpError(res, `Username already picked`);

    if (emailExists)
      return self.raiseHttpError(res, `Email already in use`);

    if (req.body.password.length < 6)
      return self.raiseHttpError(res, `Password too short`);


    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    await newUser.save().catch(err => res.status(500).send(err));

    res.send({ ok: true })

  }
}
