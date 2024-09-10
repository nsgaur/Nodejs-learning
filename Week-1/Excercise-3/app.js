const fs = require('fs');

fs.readFile('./numbers.txt', (err, data) => {
  console.log('file data -> ', data.toString());
  if (err) console.log(err);
});

// output : 1,2,3,4,5,6

fs.writeFile('./numbers.txt', '100,200,300,400', (err) => {
  if (err) console.log(err);
});
