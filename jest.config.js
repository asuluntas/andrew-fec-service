// jest.config.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>client/src/setupTests.js'],

  globals: {
    randomInt: getRandomInt(1, 101),
  },
};
