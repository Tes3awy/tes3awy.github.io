const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Move CSS to src/css
gulp.task('css', () => {
    return gulp
        .src([
            './node_modules/font-awesome/css/font-awesome.min.css',
            './bower_components/fancybox/dist/jquery.fancybox.min.css',
            './node_modules/sweetalert2/dist/sweetalert2.min.css',
            './node_modules/bootstrap/dist/css/bootstrap.css',
        ])
        .pipe(gulp.dest('./src/css'));
});

// Move Fonts to src/fonts
gulp.task('fonts', () => {
    return gulp
        .src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./src/fonts'));
});

// Bootstrap task
/* gulp.task('bootstrap', () => {
    var plugins = [cssnano()];
    return gulp
        .src('./node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass.sync())
        .pipe(gulp.dest('./src/css'))
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('./src/css'));
}); */

// My Custom SCSS
gulp.task('scss', () => {
    var plugins = [
        autoprefixer({ browsers: ['last 2 versions'], cascade: true }),
    ];
    return gulp
        .src('./src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', () => {
    return gulp
        .src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/popper.js/dist/umd/popper.min.js',
            './bower_components/fancybox/dist/jquery.fancybox.min.js',
            './node_modules/vanilla-lazyload/dist/lazyload.min.js',
            './node_modules/sweetalert2/dist/sweetalert2.min.js',
        ])
        .pipe(gulp.dest('./src/js'))
        .pipe(browserSync.stream());
});

// Minify js
gulp.task('minjs', () => {
    return gulp
        .src('./src/js/app.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./src/js/'));
});

// Minify CSS
gulp.task('mincss', () => {
    var plugins = [cssnano()];
    return gulp
        .src('./src/css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./src/css/'));
});

// Minify Images
gulp.task('imagemin', () => {
    return gulp
        .src('./src/img/*')
        .pipe(
            imagemin([imagemin.optipng({ optimizationLevel: 5 })], {
                verbose: true,
                progressive: true,
            })
        )
        .pipe(rename({ suffix: '-min' }))
        .pipe(gulp.dest('./src/img/dist'));
});

// Watch Sass & Serve
gulp.task('watch', () => {
    gulp.watch('./*.html').on('change', reload);
    gulp.watch('./src/js/app.js', ['minjs']).on('change', reload);
    gulp.watch('./src/scss/style.scss', ['scss', 'mincss']).on(
        'change',
        reload
    );
});

// Default Tasks
gulp.task('default', ['js', 'css', 'fonts']);
