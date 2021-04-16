const wordRepo = require('./userWord.db.repository');

const getAll = async (userId, type) => wordRepo.getAll(userId, type);

const get = async (wordId, userId, difficulty) =>
  wordRepo.get(wordId, userId, difficulty);

const save = async (userId, wordId, type) =>
  wordRepo.save(userId, wordId, type);

const update = async (wordId, userId, userWord) =>
  wordRepo.update(wordId, userId, { ...userWord, wordId, userId });

const remove = async (userId, wordId, type) =>
  wordRepo.remove(userId, wordId, type);

module.exports = { getAll, get, save, update, remove };
