const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    proxy: {
      // 解决cookie不能放在8080端口下的问题，这样就能拿到cookie，cookie中有sessionID,就可以设置到request上
      '/api': {
        target: 'http://localhost:3000',
        // /api/token => http://localhost:3000/token
        pathRewrite: { '^/api': '' }
      }
    }
  },
  mode: 'development'
});
