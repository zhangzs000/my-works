// 能像webpack那样判断dev还是production吗？
var gulp = require("gulp"),
	babel = require('gulp-babel'), // js压缩出错，需要babel转译
	es2015 = require('babel-preset-es2015'), // 这个才是解决压缩的关键
	uglify= require("gulp-uglify"),//js压缩
	connect = require("gulp-connect"),//服务器连接
	jshint=require('gulp-jshint'),
	pump = require('pump'), //To find the exact file with line no of error register and run this task:
	notify=require('gulp-notify'),   //提示
	rename=require('gulp-rename'),   //文件重命名 按顺序打包没起作用????
	concat=require('gulp-concat'),
	minimg = require("gulp-imagemin"), //图片压缩
	webserver = require('gulp-webserver'); //自动打开网页

//优化图片
gulp.task("img",function(){
	gulp.src("images/header/2017/*.{jpg,png}")
	.pipe(minimg())
	.pipe(gulp.dest("dist/images/header/2017"))
})

//语法检查
gulp.task('jshint', function () {
    return gulp.src('hydra/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 复制首页
gulp.task("copy-index",function () {
	return gulp.src("index.html")
			.pipe(gulp.dest("dist"))
			.pipe(connect.reload())
})
// 编译js
gulp.task("copy-js",function(cb){
	pump([
		gulp.src("hydra/*.js"),
			babel({presets: ['es2015']}),
			uglify(), //不知为什么,ES6语法不支持?
			gulp.dest("dist/hydra"),
			connect.reload()
		],cb)
})
gulp.task("copy-js",function(){
	gulp.src("hydra/*.js")
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/hydra"))
		.pipe(connect.reload())
})

//server热替换
gulp.task("server",function(){
	connect.server({
		root:"dist",
		port:8383,
		livereload:true,
		open: true
	})
})
// // 自动打开index
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      port:8383,
      open: true
    }));
});
//JS处理
gulp.task('minifyjs',function(){
   return gulp.src(["hydra/hydra.Core.js","hydra/hydra.Config.js","hydra/hydra.Css.js","hydra/hydra.Header.js","hydra/hydra.Templete.js","hydra/hydra.Util.js"])  //选择合并的JS
   	   .pipe(babel({presets: ['es2015']}))
       .pipe(concat('hydra.all.js'))   //合并js
       .pipe(gulp.dest('dist/hydra'))       //输出
       .pipe(uglify())                    //压缩
       .pipe(rename({suffix:'.min'}))     //重命名
       .pipe(notify({message:"js task ok"}));    //提示
});
//监听
gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"])
	gulp.watch("hydra/*.js",["minifyjs"])
})

gulp.task("build",["copy-index","img","minifyjs","watch","server"])

gulp.task("default",["webserver"])