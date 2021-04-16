const statisticRepo = require('./statistic.db.repository');

const get = async userId => statisticRepo.get(userId);

const create = async (userId, statistic) =>
  statisticRepo.create(userId, statistic);

const update = async (userId, statistic) =>
  statisticRepo.update(userId, statistic);

module.exports = { get, create, update };
