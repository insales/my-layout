const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    __dirname + '/src/js/test-layout.js',
    __dirname + '/src/js/my-layout.js',
    __dirname + '/src/scss/core-css.scss',
    __dirname + '/src/scss/core-css-extensions.scss',
    __dirname + '/src/scss/my-layout.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'js/', name: '[name].js'}
          },
        ],
      },
      {
        test: /[^my\-layout]\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'css/', name: '[name].css'}
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      },
      {
        test: /my-layout\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'css/', name: '[name].css'}
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              }
            }
          }
        ]
      }
    ]
  }
};
