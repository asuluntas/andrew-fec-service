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
