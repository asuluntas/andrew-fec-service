const db = require('./index');
const { seedAllData } = require('./seedMethods');

db.queryAsync('use books')
  .then(() => {
    db.queryAsync('select count(id) from details')
      .then(results => {
        let dataCount = (results[0][0]['count(id)']);
        return dataCount;
      })
      .then((dataCount) => {
        if (dataCount !== 100) {
          console.log('data set empty! seeding data!');
          seedAllData(db);
        } else {
          console.log('data set already exists');
        }
      })
      .catch((err) => console.log('err seeding db', err));
  });

