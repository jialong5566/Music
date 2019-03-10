var gulp = require("gulp");
var htmlclean = require("gulp-htmlclean");
var imagemin = require('gulp-imagemin');
var uglifyjs = require('gulp-uglify');
var stripdebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');

var devMode = process.env.NODE_ENV=="development";
var folder = {
	src:'src/',
	dist:'dist/'
}
console.log(devMode)
gulp.task("html",function(){
	var page = gulp.src(folder.src+"html/*")
	.pipe(connect.reload())
	if(!devMode){
		page.pipe(htmlclean())
	}
		
		page.pipe(gulp.dest(folder.dist+"html/"))
})
gulp.task('images',function(){
	gulp.src(folder.src+"images/*")
		.pipe(imagemin())
		.pipe(gulp.dest(folder.dist+"images/"))
})
gulp.task('js',function(){

	var page = gulp.src(folder.src + "js/*")
	.pipe(connect.reload())
		if(!devMode){
			page.pipe(stripdebug())		
				.pipe(uglifyjs())
		}
		
		page.pipe(gulp.dest(folder.dist+"js/"))
})
gulp.task("css",function(){
	var options = [autoprefixer(),cssnano()];
	var page = gulp.src(folder.src+'css/*')
				.pipe(connect.reload())
		.pipe(less())
		if(!devMode){
			page.pipe(postcss(options))
		}
		
		page.pipe(gulp.dest(folder.dist+"css/"))
})
gulp.task('watch',function(){
	gulp.watch(folder.src+'html/*',['html']);
	gulp.watch(folder.src+'css/*',['css']);
	gulp.watch(folder.src+'js/*',['js']);
	gulp.watch(folder.src+'images/*',['images']);
})
gulp.task('server',function(){
	connect.server({
		port:'8090',
		liveload:true
	});
})
gulp.task('default',['html','images','js','css','watch','server'])
