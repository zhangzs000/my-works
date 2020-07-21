const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'production'
});
