const router = require('express').Router();
const { OK } = require('http-status-codes');
const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userService.save({ name, email, password });
    res.status(OK).json({ message: 'User was created' });
  } catch (e) {
    console.error(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
