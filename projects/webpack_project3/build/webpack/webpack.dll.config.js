const webpack = require('webpack')
const path = require('path')

// const vendors = [
//   'react',
//   'react-dom',
//   'react-router',
//   'react-redux',
//   'lodash',
//   'redux',
//   'antd'
// ]
const vendors = [
  'lodash',
  'jquery',
  'vue',
  'vue-resource',
  'vue-router',
  'element-ui',
  'vuex'
]

module.exports = {
  output: {
    path: path.join(path.resolve(), 'src/assets/libs'),
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DllPlugin({
      path: path.join(path.resolve(), 'manifest.json'),
      name: '[name]',
      context: __dirname,
    }),
  ]
}
