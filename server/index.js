const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database/index');
const url = require('url');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/book/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log('hello');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
