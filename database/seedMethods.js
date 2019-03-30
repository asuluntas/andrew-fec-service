const {createData} = require('./sampleDataModel');
const Promise = require('bluebird');

//creates a data array for 100 BOOKS
var createDataArray = () => {
  let dataArray = [];
  for (var i = 0; i < 100; i++) {
    var data = createData();
    dataArray.push(data);
  }
  return dataArray;
};

//SEEDS ONE data object to database.
var seedDb = (data, db) => {

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

    return Promise.all(charsPromiseArr)
      .then(results => {
        console.log('seed characters table succeeded!', bookId);
        return bookId;
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

    return Promise.all(awardsPromiseArr)
      .then(results => {
        console.log('seed awards table succeeded!', bookId);
        return bookId
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

    return Promise.all(editionsPromiseArr)
      .then(results => {
        console.log('seed editions table succeeded!', bookId);
        return bookId
      })
      .catch(err => console.log('err seeding editions table!', err));
  };

  //===================Seed tables======================!
  //start by seeding details Table
  return seedDetailsTable(details)
    //define book id
    .then(results => {
      let bookId = results[0].insertId;
      console.log('seed details Table succeeded!', bookId);
      return bookId;
    })
    //then seed the characters table with bookId
    .then((bookId) => {
      let array = [seedCharsTable(bookId, characters), seedAwardsTable(bookId, awards), seedEditionsTable(bookId, editions)]
        // seedCharsTable(bookId, characters)
        // seedAwardsTable(bookId, awards)
        // seedEditionsTable(bookId, editions)
      return Promise.all(array)
        // .then(results => {
        //   console.log(results);
        //   return results
        // });
    })
    .catch((err) => {
      console.log('error in seedDb!\n', err)
      reject(err);
    });

};

//seed all 100 data objects to database!
var seedAllData = (db) => {
  let dataArray = createDataArray();
  let promiseArray = [];

  for (var i = 0; i < dataArray.length; i++) {
    promiseArray.push(seedDb(dataArray[i], db));
  }

  Promise.all(promiseArray)
    .then((results) => {
      console.log('-----results-----\n', results);
      db.end(() => {
        console.log('end connection after seed!')
      })
    })

};

module.exports.seedAllData = seedAllData;

