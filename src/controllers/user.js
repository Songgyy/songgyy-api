const User = require('../model/User')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

module.exports = {
  async raiseHttpError(res, message, status = 400) {
      return res.status(status).send({ error: message });
  },

  async auth(req, res) {
    const self = module.exports;
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || user.length < 1)
      return res.status(400).send({ error: 'User not found' });


    let passwordMatch = true;
    // validate the password
    await user.comparePassword(password, (err, isMatch) => {
      if (err)
        return self.raiseHttpError(res, "Something bad happend, see the logs");

      // if password not matching return error
      if (!isMatch)
        return self.raiseHttpError(res, "Incorrect password");
      user.password = undefined;
      // if ok return the information + token
      return res.send({
        user,
        token: jwt.sign({ id: user._id }, config.app_secret)
      });
    });


  },

  async store(req, res) {
    const self = module.exports;

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
