/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */

// WEBPACK CONFIG!

console.log(__dirname);

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
  },

  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        }
      }
    ]
  },

};
