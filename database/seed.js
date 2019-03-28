const {createData} = require('./sampleDataModel');

var createTables = (db) => {

  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS details (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(20),
      pagenum INT,
      publisher VARCHAR(100),
      firstPubDate VARCHAR(30),
      originalPubDate VARCHAR(30),
      title VARCHAR(100),
      isbn10 VARCHAR(20),
      isbn13 VARCHAR(20),
      language VARCHAR(20)
      );`
  )
    .then(()=> {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS characters (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(20),
          bookId INT
        );`
      );
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS awards (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          year INT,
          bookId INT
        );`
      );
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS editions (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          isbn10 VARCHAR(20),
          isbn13 VARCHAR(20),
          type VARCHAR(20),
          publisher VARCHAR(100),
          firstPubDate VARCHAR(30),
          originalPubDate VARCHAR(30),
          picture VARCHAR(250),
          bookId INT
        );`
      );
    })
    .error((err) => {
      console.log('error making tables', err);
    });

};

var seedDb = (db) => {
  var data = createData();
  let {characters, litAwards, editions} = data;



};
console.log(seedDb());
module.exports.createTables = createTables;
