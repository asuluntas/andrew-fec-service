// jest.config.js
var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
  verbose: true,
  globals: {
    randomInt: getRandomInt(1, 101)
  }
};
