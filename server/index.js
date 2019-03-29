const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database/index');


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log('hello');
  res.send('hello get book id');
});

app.get('/books/:id/details', (req, res) => {
  const id = req.params.id;
  db.getDetails(id)
    .then(results => {
      let details = results[0][0];
      res.send(details);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

app.get('/books/:id/details/:table', (req, res) => {
  const id = Number(req.params.id);
  const table = req.params.table;
  db.getRelatedData(table, id)
    .then(results => {
      let data = results[0];
      res.send(data);
    })
    .catch(err => {
      console.log('err getting extra details!', err);
      res.send(err);
    });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
