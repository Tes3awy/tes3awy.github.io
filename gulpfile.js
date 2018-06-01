const gulp = require('gulp');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const reload = browserSync.reload;

// Move CSS to src/css
gulp.task('css', function() {
    return gulp
        .src([
            './node_modules/font-awesome/css/font-awesome.min.css',
            './bower_components/fancybox/dist/jquery.fancybox.min.css',
        ])
        .pipe(gulp.dest('./src/css'));
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
    return gulp
        .src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./src/fonts'));
});

// Minify Images
gulp.task('imagemin', function() {
    return gulp
        .src('./src/img/*')
        .pipe(imagemin({ verbose: true, progressive: true }))
        .pipe(gulp.dest('./src/img'));
});

// Compile Sass & Inject Into Browser
// gulp.task('sass', function() {
//     const plugins = [
//         autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: true,
//         }),
//     ];
//     return gulp
//         .src([
//             './node_modules/bootstrap/scss/bootstrap.scss',
//             './src/scss/*.scss',
//         ])
//         .pipe(sass())
//         .pipe(postcss(plugins))
//         .pipe(gulp.dest('./src/css'))
//         .pipe(browserSync.stream());
// });

// My Custom SCSS
gulp.task('scss', () => {
    let plugins = [
        autoprefixer({ browsers: ['last 2 versions'], cascade: true }),
    ];
    return gulp
        .src('./src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp
        .src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/popper.js/dist/umd/popper.min.js',
            './bower_components/fancybox/dist/jquery.fancybox.min.js',
            './node_modules/vanilla-lazyload/dist/lazyload.min.js',
        ])
        .pipe(gulp.dest('./src/js'))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('watch', function() {
    gulp.watch('./*.html').on('change', reload);
    gulp.watch('./src/js/app.js').on('change', reload);
    gulp.watch('./src/css/*.css').on('change', reload);
});

// Minify js
gulp.task('minjs', () => {
    return gulp
        .src('./src/js/app.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./src/js/'));
});

// Minify CSS
gulp.task('mincss', () => {
    let plugins = [cssnano()];
    return gulp
        .src('./src/css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./src/css/'));
});

// Default Tasks
gulp.task('default', ['js', 'css', 'fonts', 'imagemin']);
