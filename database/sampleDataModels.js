const faker = require('faker');


var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

/* =================== Book Type ===================== */
let bookType = () => {
  const bool = faker.random.boolean();
  if (bool) { return 'hardcover'; }
  return 'paperback';
};

/* =================== Page Number ===================== */

let pageNum = () => {
  let num = faker.random.number();
  //if page number is less than 10 or greater than 10,000
  while (num < 10 || num > 2000) {
    num = faker.random.number();
  }
  return num;
};

/* =================== First and Original Publication Dates ===================== */

let dates = () => {
  let dateObj = {
    firstPubDate: null,
    orgPubDate: null,
  };
  //helper function to add suffix to day
  var addSuffix = (string) => {
    let num = Number(string);
    //console.log(num)
    if (num === 1 || num === 21 || num === 31) {
      console.log('hello');
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

  console.log(dateObj);

  return dates;
};

/* =================== Original Title ===================== */

