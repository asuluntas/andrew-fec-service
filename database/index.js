const mysql = require('mysql');
const Promise = require('bluebird');
//const {createTables, seedDb, seedAllData} = require('./seedMethods');

const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'books'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

//best not to always seed database on server start!
db.connectAsync()
  .then(() => console.log(`connected to mysql with id ${db.threadId}`))
  .error((err) => { console.log('error connecting to db', err); });

module.exports = db;


let getDetails = (id) => {
  let queryString = 'SELECT * FROM details WHERE id = ?';
  let params = [id];

  return db.queryAsync(queryString, params);
};

let getRelatedData = (table, id) => {
  let queryString = 'SELECT * FROM ?? WHERE bookId = ?';
  let params = [table, id];
  return db.queryAsync(queryString, params);
};


module.exports.getRelatedData = getRelatedData;
module.exports.getDetails = getDetails;
