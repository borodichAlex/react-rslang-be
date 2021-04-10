const router = require('express').Router();
const { OK } = require('http-status-codes');
const User = require('../users/user.model');
const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  try {
    console.log('body', req.body);
    const { name, email, password } = req.body;
    const candidate = await userService.getUserByEmail({ email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    const user = new User({ name, email, password });
    await userService.save(user);
    // await fileService.createDir(new File({user:user.id, name: ''}))
    res.status(OK).json({ message: 'User was created' });
  } catch (e) {
    console.error(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
