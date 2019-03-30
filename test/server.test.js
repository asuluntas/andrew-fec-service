const app = require('../server/app')
const request = require('supertest')
const db = require('../database/index');

describe('Test endpoint GET /books/:id/details', () => {

  afterAll((done) => {
    db.end(() => { done(); });
  });

  test('It should give response to the GET method', (done) => {

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

