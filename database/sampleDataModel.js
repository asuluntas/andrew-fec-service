var { type, pageNum, publisher, dates, title, isbn, language, characterArr, awardsArr, editionsArr } = require('./sampleDataMethods.js');

var dataObj = {
  mainDetails: {
    type: type(),
    pageNum: pageNum(),
    publisher: publisher(),
    dates: dates(),
    title: title(),
    ibsn10: isbn(10),
    ibsn13: isbn(13),
    language: language(),
  },
  characters: characterArr(),
  litAwards: awardsArr(),
  editions: editionsArr(),
};

// var makeData = () => {
//   let dataArr = [];
//   for (var i = 0; i < 100; i++) {
//     dataArry.push(dataObj);
//   }
//   return dataArr;
// };
// let dataArr = makeData();

//console.log(dataObj);
module.exports.dataObj = dataObj;
