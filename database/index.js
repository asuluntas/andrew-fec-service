const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost'
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

module.exports.dbConnection = db;

db.connectAsync()
  .then(() => console.log(`connected to mysql with id ${db.threadId}`))
  .error((err) => { console.log('error connecting to db', err); });
