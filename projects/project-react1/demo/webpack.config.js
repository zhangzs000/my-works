const path = require('path')
module.exports={
	entry:'./build/app.js',/*入口文件*/
	output:{/*输出目录*/
		path:'./js',/*输出目录*/
		filename:'myapp.js'/*输出文件*/
	},
	module:{
		loaders:[
			{
				test:/\.js$/,/*通过入口处理匹配js文件*/
				loader:'jsx-loader'
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		port: 8888,
		contentBase: path.join(__dirname)
	}
}
