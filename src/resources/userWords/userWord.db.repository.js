const UserWord = require('./userWord.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');
const ENTITY_NAME = 'user word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async (userId, difficulty) => {
  // console.log(userId);
  // console.log(difficulty);
  return UserWord.find({ userId, difficulty }, 'wordId -_id');
};

const get = async (wordId, userId, difficulty) => {
  const userWord = await UserWord.findOne({ wordId, userId, difficulty });
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId, difficulty });
  }

  return userWord;
};

const save = async (userId, wordId, difficulty) => {
  try {
    return await UserWord.create({ userId, wordId, difficulty });
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
    } else {
      throw err;
    }
  }
};

const update = async (wordId, userId, userWord) => {
  const updatedWord = await UserWord.findOneAndUpdate(
    { wordId, userId },
    { $set: userWord },
    { new: true }
  );
  if (!updatedWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return updatedWord;
};

const remove = async (userId, wordId, difficulty) =>
  UserWord.deleteOne({ wordId, userId, difficulty });

module.exports = { getAll, get, save, update, remove };
