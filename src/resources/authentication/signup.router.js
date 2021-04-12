const router = require('express').Router();
const { OK } = require('http-status-codes');
const userService = require('../users/user.service');
const cloudinary = require('cloudinary').v2;

const defaultPhoto =
  'https://res.cloudinary.com/rslangteam33/image/upload/v1618074084/users/avatars/default-avatar.jpg';

router.route('/').post(async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    let photo = {};
    console.log({ req });
    if (avatar) {
      console.log({ avatar });
      photo = await cloudinary.uploader.upload(avatar.path);
    }
    await userService.save({
      name,
      email,
      password,
      avatar: photo.url || defaultPhoto
    });
    res.status(OK).json({ message: 'User was created' });
  } catch (e) {
    console.error(e);
    res.send({ message: 'Server error', req });
  }
});

module.exports = router;
