const mysql = require('mysql');
const Promise = require('bluebird');
const {createTables, seedDb} = require('./seed');

const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost'
});

var db = Promise.promisifyAll(connection, { multiArgs: true });



db.connectAsync()
  .then(() => console.log(`connected to mysql with id ${db.threadId}`))
  .then(() => db.queryAsync('CREATE DATABASE IF NOT EXISTS books'))
  .then(() => db.queryAsync('use books'))
  .then(() => createTables(db))
  .then(() => seedDb(db))
  .error((err) => { console.log('error connecting to db', err); })


module.exports.dbConnection = db;
