const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './numbers.txt');

const readFile = (doWrite, message) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log(err);
    else {
      console.log(message, data.toString());
      doWrite && writeFile();
    }
  });
};

const writeFile = () => {
  fs.writeFile(filePath, 'Original Content of the file Hello, Node!', (err) => {
    if (err) console.log(err);
    else {
      readFile(false, 'after appending');
    }
  });
};

const fileOperation = () => {
  readFile(true, 'before appending');
};

fileOperation();
