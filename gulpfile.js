var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');

/* Comprimir imagenes */
gulp.task('images', function(){
    return watch('assets/img/*', function () { //Comprueba si hay cambios en la carpeta img
		gulp.src('assets/img/*.{jpg,jpeg}') //Ruta donde buscara las imágenes con extensiones .{jpg,jpeg} a comprimir
	    .pipe(
	    	imagemin())
	    .pipe(gulp.dest('docs/assets/img/')) //Ruta donde se guardaran la imágenes comprimidas
	});
});

/* Compilas SASS */
gulp.task('sass', function() {
    return gulp.src([
            'assets/css/**/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('docs/assets/css/'))
        .pipe(browserSync.stream());
});

/* Unir y minificar CSS */
gulp.task('css', ['sass'], function() {
    return gulp.src(['docs/assets/css/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('docs/assets/css/'))
    .pipe(rename('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('docs/assets/css/'))
    .pipe(browserSync.stream());
});

/* Unir y minificar JS */
gulp.task('js', function() {
    return gulp.src([
            'docs/assets/js/**/*.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

/* Iniciar Servidor */
gulp.task('serve', function() {
    browserSync.init({
        server: './docs'
    });
});

/* A la espera de cambios en los archivos */
gulp.watch(['assets/css/**/*.scss'], ['sass']);
gulp.watch(['assets/css/**/*.css'], ['css']);
gulp.watch(['assets/js/**/*.js'], ['js']);
gulp.watch('docs/*.html').on('change', browserSync.reload);

/* Tarea Default */
gulp.task('default',['images', 'sass', 'js', 'serve']);