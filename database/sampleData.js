const faker = require('faker');


var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties


let bookType = () => {
  const bool = faker.random.boolean();
  if (bool) { return 'hardcover'; }
  return 'paperback';
};
console.log('======bookType======', bookType());

let pageNum = () => {
  let num = faker.random.number();
  //if page number is less than 10 or greater than 10,000
  while (num < 10 || num > 2000) {
    num = faker.random.number();
  }
  return num;
};
console.log('====== pageNum ======', pageNum());

