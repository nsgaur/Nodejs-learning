const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// routes imports

const booksRoutes = require('./routes/BooksRoutes');
const authorsRoutes = require('./routes/AuthorsRoutes');
const categoriesRoutes = require('./routes/CategeoriesRoutes');

// midleware imports
const logger = require('./middlewares/Logger');

app.use(express.json());
app.use(logger);

// Routes
app.use('/books', booksRoutes);
app.use('/author', authorsRoutes);
app.use('/category', categoriesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.get('*', (req, res) => {
  res.send('Page not found!');
});

app.listen(port, () => console.log(`Server is listening on Port - ${port}`));
