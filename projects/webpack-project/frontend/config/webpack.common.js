const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    login: './src/login.js',
    main: './src/main.js',
    students: './src/students.js',
    teachers: './src/teachers.js',
    courses: './src/courses.js',
    selectingCourse: './src/selecting-course.js',
    myCourses: './src/my-courses.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    // 由以前创建style标签插入样式变为link标签插入。
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/login.html',
      filename: 'login.html',
      title: '登陆页面',
      // 这几个是往页面插入的js吗？哪来的login、runtime?????
      // runtimeChunk: 创建运行时包，打包时的信息，那就不是引入了
      // https://segmentfault.com/a/1190000013883242 默认全部导入
      // main和students都引入了
      chunks: ['login', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/main.html',
      filename: 'main.html',
      title: '学生选课系统',
      chunks: ['main', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/students.html',
      filename: 'students.html',
      title: '学生管理页面',
      chunks: ['students', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/teachers.html',
      filename: 'teachers.html',
      title: '教师管理页面',
      chunks: ['teachers', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/courses.html',
      filename: 'courses.html',
      title: '课程管理页面',
      chunks: ['courses', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/courses_teacher.html',
      filename: 'courses_teacher.html',
      title: '教师课程页面',
      chunks: ['courses', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/selecting_course.html',
      filename: 'selecting_course.html',
      title: '学生选课页面',
      chunks: ['selectingCourse', 'runtime', 'vendors']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/my_courses.html',
      filename: 'my_courses.html',
      title: '个人课表页面',
      chunks: ['myCourses', 'runtime', 'vendors']
    })
  ],
  module: {
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: ['style-loader', 'css-loader', 'postcss-loader']
    //   },
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       // npm install babel-loader --save
    //       loader: 'babel-loader',
    //       options: {
    //         presets: [['env', { modules: false }]],
    //         plugins: ['transform-runtime', 'syntax-dynamic-import']
    //       }
    //     }
    //   }
    // ]
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist/'
            }
          },
          'css-loader'
        ]
      }
    ]
  }
};
