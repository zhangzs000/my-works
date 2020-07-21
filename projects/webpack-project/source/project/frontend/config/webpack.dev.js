const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // /api/token => http://localhost:3000/token
        pathRewrite: { '^/api': '' }
      }
    }
  },
  mode: 'development'
});
