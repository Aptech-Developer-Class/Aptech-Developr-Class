//task runner
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')

gulp.task('css', function(){
	return gulp
		.src("./src/css/styles.css") //source css folder
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css/')) //destination css folder
})


gulp.task('js', function(){
	return gulp
		.src("./src/js/*.js") //source js folder
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		
})

gulp.task('html', function(){})

//watches for changes in css files & js files
gulp.task('watch', function(){
	gulp.watch('./src/css/*.css', gulp.parallel('css'))
	gulp.watch('./src/js/*.js', gulp.parallel('js'))
})

//rebuild the css and javascirpt files with gulp
gulp.task('build', gulp.parallel('css', 'js'))

gulp.task('serve', function(){
	 browserSync.init({
        server: {
            baseDir: "./dist" //build directory
        },
        //port
        port: 3000,
        //open on build
        open: false
    })
	 //watch all files
	 gulp.watch('./src/**/*').on('change', browserSync.reload)
	 gulp.watch("*.html").on('change', browserSync.reload)
})

//runs all the tasks
gulp.task('default', gulp.series('build', 'serve', 'watch'))


