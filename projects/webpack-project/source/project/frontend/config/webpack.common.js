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
