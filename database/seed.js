const db = require('./index');
const { seedAllData } = require('./seedMethods');

db.queryAsync('use books')
  .then(() => {
    db.queryAsync('select count(id) from details')
      .then(results => {
        let dataCount = (results[0][0]['count(id)']);
        return dataCount;
      })
      .then(async (dataCount) => {
        if (dataCount !== 100) {
          console.log('data set empty! seeding data!');
          return seedAllData(db)
            // .then(()=> {
            //   db.end(()=> {
            //     console.log('connection closed!')
            //   })
            // })
        } else {
          console.log('data set already exists');
        }
      })
      .catch((err) => console.log('err seeding db', err));
  });

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
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS characters (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
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
          originalPubDate VARCHAR(30),
          coverurl VARCHAR(250),
          bookId INT
        );`
      );
    })
    .error((err) => {
      console.log('error making tables', err);
    });

};
