const faker = require('faker');

//min inclusive, max exclusive

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
module.exports.getRandomInt = getRandomInt;

/* =================== Book Type ===================== */

var type = () => {
  var num = getRandomInt(0, 4);
  var typeArray = ['Hardcover', 'Paperback', 'Audio', 'Kindle'];

  return typeArray[num];
};
module.exports.type = type;

/* =================== Page Number ===================== */

var pageNum = () => {
  let num = faker.random.number();
  //if page number is less than 10 or greater than 10,000
  while (num < 10 || num > 2000) {
    num = faker.random.number();
  }
  return num;
};
module.exports.pageNum = pageNum;

/* =================== Page Number ===================== */

var publisher = () => {
  return faker.company.companyName();
};
module.exports.publisher = publisher;

/* =================== First and Original Publication Dates ===================== */

var dates = () => {
  let dateObj = {
    firstPubDate: null,
    orgPubDate: null,
  };
  //helper function to add suffix to day
  var addSuffix = (string) => {
    let num = Number(string);
    //console.log(num)
    if (num === 1 || num === 21 || num === 31) {
      return string + 'st';
    } else if (num === 2 || num === 22) {
      return string + 'nd';
    } else if (num === 3 || num === 23) {
      return string + 'rd';
    }
    return string + 'th';
  };
  //get random date
  let orgPubDate = faker.date.past(100);
  //stringify date
  var options = { year: 'numeric', month: 'long', day: 'numeric', localeMatcher: 'best fit'};
  orgPubDate = orgPubDate.toLocaleDateString('en-US', options).split(' ');
  //edit into proper format ex: [August, 15, 1987]
  let day1 = orgPubDate[1].slice(0, orgPubDate[1].length - 1);
  //set date to day1
  orgPubDate[1] = day1;

  //create first pub date;
  firstPubDate = orgPubDate.slice();
  //recalculate day before;
  let day2 = Number(firstPubDate[1]);
  if (day2 !== '1') {
    day2 = day2 - (Math.floor(Math.random() * day2));
  }
  //reset date for firstPubDate;
  firstPubDate[1] = day2.toString();

  //add suffix to both!
  orgPubDate[1] = addSuffix(orgPubDate[1]);
  firstPubDate[1] = addSuffix(firstPubDate[1]);
  //join into string for both
  dateObj.firstPubDate = firstPubDate.join(' ');
  dateObj.orgPubDate = orgPubDate.join(' ');

  return dates;
};
module.exports.dates = dates;

/* =================== ISBN generator ===================== */

var isbn = (limit) => {
  let isbn = '';

  //while isbn length is less than 11;
  while (isbn.length < (limit + 1)) {
    //add to isbn string;
    let num = faker.random.number();
    isbn += num.toString();
  }
  //splice isbn until 10th char
  isbn = isbn.slice(0, limit);
  return isbn;
};
module.exports.isbn = isbn;

/* =================== Language generator ===================== */

var language = () => {
  let languages = ['English', 'Korean', 'Spanish', 'Polish', 'Russian', 'Japanese', 'Italian', 'French', 'Chinese', 'Indian'];

  var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  let randNum = getRandomInt(0, 10);


  return languages[randNum];
};
module.exports.language = language;

/* =================== Character name ===================== */

var characterName = () => {
  return faker.fake('{{name.firstName}} {{name.lastName}}');
};
module.exports.characterName = characterName;

/* =================== Award name and date ===================== */

var award = () => {
  let awardObj = {
    name: '',
    date: null
  };
  awardObj.name = faker.company.companyName() + ' Award';
  awardObj.date = faker.date.past(5).getFullYear();

  return awardObj;
};
module.exports.award = award;

/* =================== Award name and date ===================== */
var coverUrl = () => {
  let urlStringArr = [
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic0.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic1.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic2.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic3.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic4.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic5.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic6.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic7.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic8.jpg',
    'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic9.jpg'
  ];
  let num = getRandomInt(0, 10);
  return urlStringArr[num];
};
module.exports.coverUrl = coverUrl;

