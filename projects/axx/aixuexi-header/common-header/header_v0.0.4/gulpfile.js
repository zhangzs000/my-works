// 能像webpack那样判断dev还是production吗？
var gulp = require("gulp"),
	babel = require('gulp-babel'), // js压缩出错，需要babel转译
	es2015 = require('babel-preset-es2015'), // 这个才是解决压缩的关键
	uglify= require("gulp-uglify"),//js压缩
	connect = require("gulp-connect"),//服务器连接
	jshint=require('gulp-jshint'),
	pump = require('pump'), //To find the exact file with line no of error register and run this task:
	notify=require('gulp-notify'),   //提示
	rename=require('gulp-rename');   //文件重命名
//语法检查
gulp.task('jshint', function () {
    return gulp.src('hydra/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("copy-index",function () {
	return gulp.src("index.html")
			.pipe(gulp.dest("dist"))
			.pipe(connect.reload())
})
//编译js
// gulp.task("copy-js",function(cb){
// 	pump([
// 		gulp.src("hydra/*.js"),
// 			babel({presets: ['es2015']}),
// 			uglify(), //不知为什么,ES6语法不支持?
// 			gulp.dest("dist/hydra"),
// 			connect.reload()
// 		],cb)
// })
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
		livereload:true
	})
})
//JS处理
gulp.task('minifyjs',function(){
   return gulp.src("hydra/*.js")  //选择合并的JS
   	   .pipe(babel({presets: ['es2015']}))
       .pipe(concat('hydra.all.js'))   //合并js
       .pipe(gulp.dest('dist/hydra'))       //输出
       .pipe(rename({suffix:'.min'}))     //重命名
       .pipe(uglify())                    //压缩
       .pipe(gulp.dest('dist/hydra'))            //输出 
       .pipe(notify({message:"js task ok"}));    //提示
});
//监听
gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"])
	gulp.watch("hydra/*.js",["copy-js"])
})
gulp.task("default",["copy-index","copy-js","watch","server"])