/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import baseWebpackConfig from './webpack.base.conf.js';
import fileDirName from './file-dir-name.js';

const { __dirname } = fileDirName(import.meta);

export default merge(baseWebpackConfig, {
  mode: 'development',
  devtool: false,
  optimization: {
    moduleIds: 'named',
  },
  devServer: {
    hot: true,
    compress: true,
    host: 'localhost',
    port: 8000,
    open: false,
    client: {
      overlay: {
        warnings: false,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      exclude: ['vendor.js'],
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'playground/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: 'media',
        },
      ],
    }),
  ],
});
