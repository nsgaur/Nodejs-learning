const http = require('http');

const app = http.createServer();
const port = 5000;

app.on('request', (req, res) => {
  if (req.url === '/') {
    res.write('Hello world');
  } else {
    res.write('Page not found.');
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Sever is listening on Port ${port}`);
});
