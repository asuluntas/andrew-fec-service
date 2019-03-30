const app = require('../server/app')
const request = require('supertest')
const db = require('../database/index');

describe('Test endpoint GET /books/:id/details', () => {

  test('It should give correct status code response to the GET method', (done) => {

    request(app).get(`/books/${randomInt}}/details`).then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should give back body corresponding to right id', (done) => {
    let num = randomInt
    request(app).get(`/books/${num}}/details`).then((response) => {
      expect(response.body.id).toBe(num);
      done();
    });
  });

  test('It should have response.body object with correct properties if object exits', (done) => {
    request(app).get(`/books/${randomInt}}/details`).then((response) => {
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        type: expect.any(String),
        pagenum: expect.any(Number),
        firstPubDate: expect.any(String),
        originalPubDate: expect.any(String),
        title: expect.any(String),
        isbn10: expect.any(String),
        isbn13: expect.any(String),
        language: expect.any(String)
      }));
      done();
    });
  });

  test('It should give error response when id does not exist', (done) => {
    request(app).get(`/books/${randomInt +100}}/details`).then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

});

//**********************************************************

describe('Test endpoint GET /books/:id/details/:table', () => {

  afterAll((done) => {
    db.end(() => { done(); });
  });

  describe('Test response for endpoint /books/:id/details/characters', () => {
    test('It should give correct status code response to GET characters table', (done) => {
      request(app).get(`/books/${randomInt}}/details/characters`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      request(app).get(`/books/${randomInt + 100}}/details/characters`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      let num = randomInt
      request(app).get(`/books/${num}}/details/characters`).then((response) => {
        response.body.forEach((char) => {
          expect(char.bookId).toBe(num);
          expect(char.name).toEqual(expect.any(String));
        })
        done();
      });
    });

  });

  //==========================================================

  describe('Test response for endpoint /books/:id/details/awards', () => {
    test('It should give correct status code response to GET awards table', (done) => {
      request(app).get(`/books/${randomInt}}/details/awards`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      request(app).get(`/books/${randomInt + 100}}/details/awards`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      let num = randomInt
      request(app).get(`/books/${num}}/details/awards`).then((response) => {
        response.body.forEach((award) => {
          expect(award.bookId).toBe(num);
          expect(award.name).toEqual(expect.any(String));
          expect(award.year).toEqual(expect.any(Number));
        })
        done();
      });
    });




  });

  //==========================================================

  describe('Test response for endpoint /books/:id/details/editions', () => {
    test('It should give correct status code response to GET editions table', (done) => {
      request(app).get(`/books/${randomInt}}/details/editions`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      request(app).get(`/books/${randomInt + 100}}/details/editions`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      let num = randomInt
      request(app).get(`/books/${num}}/details/editions`).then((response) => {
        response.body.forEach((edition) => {
          expect(edition).toEqual(expect.objectContaining({
            id: expect.any(Number),
            isbn10: expect.any(String),
            isbn13: expect.any(String),
            title: expect.any(String),
            type: expect.any(String),
            publisher: expect.any(String),
            originalPubDate: expect.any(String),
            coverurl: expect.any(String),
            bookId: num
          }));
        })
        done();
      });
    });
  });
});

