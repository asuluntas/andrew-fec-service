const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const morgan = require('morgan');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(morgan('dev'));



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
