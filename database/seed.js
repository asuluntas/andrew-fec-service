const {createData} = require('./sampleDataModel');
//var db = require('../database');
const Promise = require('bluebird');

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

var createDataArray = () => {
  let dataArray = [];
  for (var i = 0; i < 100; i++) {
    var data = createData();
    dataArray.push(data);
  }
  return dataArray;
};

var seedDb = (data, db) => {

  //var data = createData();
  //console.log('======= data =======\n', data);
  let details = data.mainDetails;
  let characters = data.characters;
  let awards = data.litAwards;
  let editions = data.editions;

  //details Table Seeder Function
  var seedDetailsTable = (details) => {
    let { type, pageNum, publisher, title, dates, isbn10, isbn13, language } = details;
    let queryString = 'INSERT INTO details (type, pagenum, publisher, firstPubDate, originalPubDate, title, isbn10, isbn13, language) values (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    let params = [type, pageNum, publisher, dates.firstPubDate, dates.orgPubDate, title, isbn10, isbn13, language];

    return db.queryAsync(queryString, params);
  };

  //chars table seeder function
  var seedCharsTable = (bookId, chars) => {
    let charsPromiseArr = [];

    for (var i = 0; i < chars.length; i++) {
      let queryString = 'INSERT INTO characters (name, bookId) values (?, ?);';
      let params = [chars[i], bookId];

      charsPromiseArr.push(db.queryAsync(queryString, params));
    }
    Promise.all(charsPromiseArr)
      .then(results => {
        console.log('seed characters table succeeded!', bookId);
      })
      .catch(err => console.log('err seeding chars table!', err));
  };

  //awards table seeder function
  var seedAwardsTable = (bookId, awards) => {
    let awardsPromiseArr = [];

    for (var i = 0; i < awards.length; i++) {
      let name = awards[i].name;
      let date = awards[i].date;
      let queryString = 'INSERT INTO awards (name, year, bookId) values (?, ?, ?);';
      let params = [name, date, bookId];

      awardsPromiseArr.push(db.queryAsync(queryString, params));
    }

    Promise.all(awardsPromiseArr)
      .then(results => {
        console.log('seed awards table succeeded!', bookId);
      })
      .catch(err => console.log('err seeding chars table!', err));
  };
  //editions table seeder function
  var seedEditionsTable = (bookId, editions) => {
    let editionsPromiseArr = [];

    for (var i = 0; i < editions.length; i++) {
      let {isbn10, isbn13, type, publisher, officialPubDate, coverUrl} = editions[i];
      let queryString = 'INSERT INTO editions (isbn10, isbn13, type, publisher, originalPubDate, coverurl, bookId) values (?, ?, ?, ?, ?, ?, ?);';
      let params = [isbn10, isbn13, type, publisher, officialPubDate, coverUrl, bookId];

      editionsPromiseArr.push(db.queryAsync(queryString, params));
    }
    Promise.all(editionsPromiseArr)
      .then(results => {
        console.log('seed editions table succeeded!', bookId);
      })
      .catch(err => console.log('err seeding editions table!', err));
  };

  //===================Seed tables======================!
  //start by seeding details Table
  seedDetailsTable(details)
    //define book id
    .then(results => {
      let bookId = results[0].insertId;
      console.log('seed details Table succeeded!', bookId);
      //console.log(bookId);
      return bookId;
    })
    //then seed the characters table with bookId
    .then((bookId) => {
      seedCharsTable(bookId, characters);
      return bookId;
    })
    //then seed the awards table with bookId
    .then((bookId) => {
      //console.log(bookId);
      seedAwardsTable(bookId, awards)
      return bookId;
    })
    //then seed the editions table with bookId
    .then((bookId) => {
      return seedEditionsTable(bookId, editions);
    })
    .catch((err) => console.log('error in seedDb!\n', err));
};

var seedAllData = (db) => {
  let dataArray = createDataArray();
  let seedPromiseArray = [];

  for (var i = 0; i < dataArray.length; i++) {
    seedPromiseArray.push(seedDb(dataArray[i], db));
  }

  Promise.all(seedPromiseArray).then((results) => console.log('======what are results??? =======\n', results));
};

//module.exports.seedDetailsTable = seedDetailsTable;
module.exports.seedAllData = seedAllData;
module.exports.seedDb = seedDb;
module.exports.createTables = createTables;
