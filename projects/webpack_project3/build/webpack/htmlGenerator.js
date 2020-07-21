'use strict'

var fs = require('fs')
var path = require('path')

var htmlGenerator = function (views) {
  var r = []
  var HtmlWebpackPlugin = require('html-webpack-plugin')
  
  for(var key in views) {
    var re = new RegExp("(.{" + key.lastIndexOf('/') + "})")
    var jsFile = key.replace(re, 'src/pages/$1')
    // console.log('process.env.NODE_ENV: ',process.env.NODE_ENV)
    var staticUrl = (process.env.NODE_ENV  === 'production' ? './assets/' : '/assets')
    var conf = {
      filename: key + '.html',
      template: path.join(__dirname, './template.ejs'),
      inject: 'body',
      // chunks: [jsFile, 'commons'],
      chunks: [key, 'commons'],
      minify: {
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
        removeComments: true
      },
      params: Object.assign({
        id: key,
        staticUrl: staticUrl,
        env: process.env.NODE_ENV
      }, views[key])
    }

    if(key == 'login1') {
      delete conf.template
      conf.templateContent = '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>爱学习管理后台</title><script src="'+ staticUrl +'/libs/vendor.js"></script></head><body><div id="root"></div></body></html>'
    }
    
    r.push(new HtmlWebpackPlugin(conf))
  }
  
  return r
}

module.exports = htmlGenerator
