/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import CopyPlugin from 'copy-webpack-plugin';
import fileDirName from './file-dir-name.js';

const { __dirname } = fileDirName(import.meta);

export default {
  entry: {
    'core-css': {
      import: path.resolve(__dirname, '../src/styles/core-css.scss')
    },
    'core-css-extensions': {
      import: path.resolve(__dirname, '../src/styles/core-css-extensions.scss')
    },
    'my-layout': {
      import: path.resolve(__dirname, '../src/styles/my-layout.scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/scripts", to: "scripts" }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    })
  ]
};
