const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  const statistic = await Statistics.find({ userId });
  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const create = async (userId, statistic) => {
  const exists = await Statistics.exists({
    userId,
    data: statistic.data,
    gameName: statistic.gameName
  });
  if (exists) {
    const oldData = await Statistics.findOne({
      userId,
      data: statistic.data,
      gameName: statistic.gameName
    });
    const newData = {
      learnedWords: oldData.learnedWords + statistic.learnedWords,
      correctAnswers: Math.round(
        (oldData.correctAnswers + statistic.correctAnswers) / 2
      ),
      streak:
        oldData.streak > statistic.streak ? oldData.streak : statistic.streak
    };
    return Statistics.findOneAndUpdate(
      { userId, data: statistic.data, gameName: statistic.gameName },
      { $set: newData }
    );
  }
  return Statistics.create({ userId, ...statistic });
};

const update = async (userId, statistic) =>
  Statistics.findOneAndUpdate(
    { userId, date: statistic.date },
    { $set: statistic },
    { upsert: true, new: true }
  );

module.exports = { get, create, update };
