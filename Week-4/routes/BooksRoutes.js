const express = require('express');
const router = express.Router();
const booksModel = require('../models/BookModel');
const booksValidation = require('../middlewares/BooksValidation');

// Request and Query parameters

router.get('/', (req, res) => {
  res.send(booksModel);
});

router.get('/:id', (req, res) => {
  const requestParams = req.params.id;
  const book = booksModel.find((item) => item?.id === parseInt(requestParams));
  if (!book) res.status(404).send('Book not found');
  res.send(book);
});

router.post('/', booksValidation, (req, res) => {
  const { name, author, category, publicationYear } = req.body;
  const book = {
    id: booksModel.length + 1,
    title: name,
    author: author,
    category: category,
    publicationYear: publicationYear,
  };

  booksModel.push(book);
  res.send(booksModel);
});

router.put('/:id', booksValidation, (req, res) => {
  const requestParams = req.params.id;
  const { name, author, category, publicationYear } = req.body;
  const book = booksModel.find((item) => item?.id === parseInt(requestParams));
  if (!book) res.status(404).send('Book not found');

  book.title = name;
  book.author = author;
  book.category = category;
  book.publicationYear = publicationYear;
  res.send(books);
});

router.delete('/:id', (req, res) => {
  const requestParams = req.params.id;
  const book = booksModel.find((item) => item?.id === parseInt(requestParams));
  if (!book) res.status(404).send('Book not found');
  const index = booksModel.indexOf(book);
  booksModel.splice(index, 1);
  res.send(booksModel);
});

module.exports = router;
