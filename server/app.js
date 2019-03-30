const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../database/index');


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

let staticPath = __dirname + '/../public';
app.use('/books/:id', express.static(staticPath));

// app.get('/books/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   console.log('STATIC PAGE');
//   res.send('hello get book id');
// });

//get initinal details
app.get('/books/:id/details', (req, res) => {
  const id = req.params.id;

  db.getDetails(id)
    .then(results => {
      let details = results[0][0];

      if (details === undefined) {
        res.status(404).send('no data @ specified id')
      } else {
        res.send(details);
      }
    })
    .catch(err => {
      console.log('err getting table data!', err);
      res.status(500).send(err);
    });
});

//get data from either characters, awards, or editions table depending on table variable.
app.get('/books/:id/details/:table', (req, res) => {
  const id = req.params.id;
  const table = req.params.table;

  db.getTableData(table, id)
    .then(results => {
      let data = results[0];

      if (data.length === 0) {
        res.status(404).send('no data @ specified id')
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      console.log('err getting table data!', err);
      res.status(500).send(err);
    });
});

//handle post request when status button of want to read changed
app.post('/books/:id/details/editions/status', (req, res) => {
  const id = req.params.id;

  console.log('should redirect to login auth page! Just redirect to main for now');

  res.redirect(`/books/${id}`);
});

//handle post request when rating of book edition changed
app.post('/books/:id/details/editions/rating', (req, res) => {
  const id = req.params.id;

  console.log('should redirect to login auth page! Just redirect to main for now');

  res.redirect(`/books/${id}`);
});

module.exports = app
