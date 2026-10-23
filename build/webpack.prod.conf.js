/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import baseWebpackConfig from './webpack.base.conf.js';

export default merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    clean: true,
  },
  optimization: {
    minimize: false,
  },
});
