const express = require('express');
const Joi = require('joi');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const books = [
  { id: 1, name: 'Heaven', author: 'a' },
  { id: 2, name: 'Earth', author: 'b' },
  { id: 3, name: 'Blue Road', author: 'C' },
  { id: 4, name: 'Sky', author: 'd' },
];

const schema = {
  name: Joi.string().min(2).max(50).required(),
  author: Joi.string().min(4).max(12).required(),
};

app.get('/', (req, res) => {
  res.redirect('/books');
});

app.get('/books', (req, res) => {
  const { author, page } = req?.query;
  let result = [];
  if (!author && !page) {
    result = books;
  } else {
    if (author) result = books.filter((item) => item.author === author);
    if (parseInt(page) === 1) result = books.filter((item, index) => [1, 2].includes(index));
  }
  if (result.length === 0) result = 'No books found!';
  res.send(result);
});

app.get('/books/:id', (req, res) => {
  let result = [];
  const id = parseInt(req.params?.id);
  if (id) result = books.find((item) => item.id === id);
  if (result.length === 0) result = 'No book found!';
  res.send(result);
});

app.post('/books', (req, res) => {
  const validationRes = Joi.object(schema).validate(req.body);
  const { value, error } = validationRes;
  const book = {
    id: books.length,
    name: value?.name,
    author: value?.author,
  };

  if (error) {
    res.status(404).send(error?.details);
  } else {
    books.push(book);
    res.send(books);
  }
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((item) => item.id === id);
  const { author, name } = req?.body;
  if (index > -1) {
    const newBook = {
      id,
      name,
      author,
    };
    books[index] = newBook;
  } else {
    res.send('Book not found!');
  }
  res.send(books);
});

app.delete('/books/:id', (req, res) => {
  const book = books.filter((item) => item.id !== parseInt(req.params.id));
  res.send(book);
});

app.get('*', (req, res) => {
  res.send('Page Not Found!');
});

app.listen(port, () => {
  console.log(`listening on port - ${port}`);
});
