//task runner
const {src, dest, series, watch} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function cssTask(){
	return src("./src/css/styles.css", {sourcemaps: true}) //source css folder
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('./dist/css/', {sourcemaps: '.'})) //destination css folder
}


function jsTask (){
	return src("./src/js/*.js", {sourcemaps: true}) //source js folder
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(terser())
		.pipe(dest('./dist/js', {sourcemaps: '.'}))
}

function bsServe(cb){
	 browserSync.init({
        server: {
            baseDir: "." //build directory
        },
        //port
        port: 3000,
        //open on build
        open: false
    })
	 
	 cb()
}


function bsReload(cb){
	browserSync.reload()
	cb()
}


//watches for changes in css files & js files
function watchTask(){
	watch('*.html', bsReload)
	watch(['src/**/*.css', 'src/**/*.js'], series(cssTask, jsTask, bsReload))
}



//runs all the tasks
exports.default = series(cssTask, jsTask, bsServe, watchTask)


