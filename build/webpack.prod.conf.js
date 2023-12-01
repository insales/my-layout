/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import baseWebpackConfig from './webpack.base.conf.js';

export default merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimize: false,
  },
  plugins: [
    // Before Build
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: [
            'dist'
          ]
        }
      }
    })
  ]
});
