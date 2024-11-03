const express = require('express');
const router = express.Router();
const categoryModel = require('../models/CategoryModel');
const authorsValidation = require('../middlewares/AuthorValidation');

// Request and Query parameters

router.get('/', (req, res) => {
  res.send(categoryModel);
});

router.get('/:id', (req, res) => {
  const requestParams = req.params.id;
  const category = categoryModel.find((item) => item?.id === parseInt(requestParams));
  if (!category) res.status(404).send('category not found');
  res.send(category);
});

router.post('/', authorsValidation, (req, res) => {
  const { name, description } = req.body;
  const category = {
    id: categoryModel.length + 1,
    name,
    description,
  };

  categoryModel.push(category);
  res.send(categoryModel);
});

router.put('/:id', authorsValidation, (req, res) => {
  const requestParams = req.params.id;
  const { name, description } = req.body;
  const category = categoryModel.find((item) => item?.id === parseInt(requestParams));
  if (!category) res.status(404).send('category not found');

  category.name = name;
  category.description = description;
  res.send(categoryModel);
});

router.delete('/:id', (req, res) => {
  const requestParams = req.params.id;
  const category = categoryModel.find((item) => item?.id === parseInt(requestParams));
  if (!category) res.status(404).send('category not found');
  const index = categoryModel.indexOf(category);
  categoryModel.splice(index, 1);
  res.send(categoryModel);
});

module.exports = router;
