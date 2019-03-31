/* eslint-disable arrow-body-style */
const db = require('./index');
// use npm run drop:tables to drop all tables

db.queryAsync('use books')
  .then(() => {
    return db.queryAsync('drop tables details');
  })
  .then(() => {
    return db.queryAsync('drop table characters');
  })
  .then(() => {
    return db.queryAsync('drop table awards');
  })
  .then(() => {
    return db.queryAsync('drop table editions');
  })
  .then(() => {
    db.end(() => {
      console.log('db connection closed after dropping tables');
    });
  })
  .catch((err) => {
    console.log('err dropping tables', err);
  });
