const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const { userWord, wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');

const userWordService = require('./userWord.service');

router.get('/', async (req, res) => {
  const userWords = await userWordService.getAll(req.userId, req.query.type);
  console.log(req.params);
  console.log(userWords);
  res.status(OK).send(userWords.map(w => w.toResponse()));
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await userWordService.get(req.params.wordId, req.userId);
  res.status(OK).send(word.toResponse());
});

router.post(
  '/:wordId',
  validator(wordId, 'params'),
  //   validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.save(
      req.userId,
      req.params.wordId,
      req.body.type
    );
    res.status(OK).send(word.toResponse());
  }
);

router.put(
  '/:wordId',
  validator(wordId, 'params'),
  validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.update(req.userId, req.body);
    res.status(OK).send(word.toResponse());
  }
);

router.delete('/:wordId', validator(wordId, 'params'), async (req, res) => {
  await userWordService.remove(req.userId, req.params.wordId, req.query.type);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
