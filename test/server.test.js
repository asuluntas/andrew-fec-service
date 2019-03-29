const server = require('../server/app')



test('post to /books/:id/details endpoint returns details object', () => {
  dbFunc.getDetails(1)
    .then(results => {
      let data = results[0][0];
      expect(data.id).toBe(1);
      expect(data.isbn10.length).toBe(10);
    })
});


