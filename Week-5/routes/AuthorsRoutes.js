const express = require('express');
const router = express.Router();
const authorsModel = require('../models/AuthorModel');
const authorsValidation = require('../middlewares/AuthorValidation');

// Request and Query parameters

router.get('/', (req, res) => {
  res.send(authorsModel);
});

router.get('/:id', (req, res) => {
  const requestParams = req.params.id;
  const author = authorsModel.find((item) => item?.id === parseInt(requestParams));
  if (!author) res.status(404).send('author not found');
  res.send(author);
});

router.post('/', authorsValidation, (req, res) => {
  const { name, biography } = req.body;
  const author = {
    id: authorsModel.length + 1,
    name,
    biography,
  };

  authorsModel.push(author);
  res.send(authorsModel);
});

router.put('/:id', authorsValidation, (req, res) => {
  const requestParams = req.params.id;
  const { name, biography } = req.body;
  const author = authorsModel.find((item) => item?.id === parseInt(requestParams));
  if (!author) res.status(404).send('author not found');

  author.name = name;
  author.biography = biography;
  res.send(author);
});

router.delete('/:id', (req, res) => {
  const requestParams = req.params.id;
  const author = authorsModel.find((item) => item?.id === parseInt(requestParams));
  if (!author) res.status(404).send('author not found');
  const index = authorsModel.indexOf(author);
  authorsModel.splice(index, 1);
  res.send(authorsModel);
});

module.exports = router;
