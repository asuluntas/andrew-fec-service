const mysql = require('mysql');
const Promise = require('bluebird');
const {createTables, seedDb, seedAllData} = require('./seed');

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
  .then(() => {
    db.queryAsync('select count(id) from details')
      .then(results => {
        let dataCount = (results[0][0]['count(id)']);
        return dataCount;
      })
      .then((dataCount) =>{
        if (dataCount < 100) {
          console.log('data set empty! seeding data!');
          seedAllData(db);
        }
        console.log('data set already exists');
      })
      .catch((err) => console.log('err seeding db', err));
  })
  .error((err) => { console.log('error connecting to db', err); })


module.exports.dbConnection = db;
