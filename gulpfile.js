const gulp = require('gulp');

const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const htmlmin = require('gulp-html-minifier');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const strip = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Move CSS to src/css
gulp.task('css', () => {
  return gulp
    .src([
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/sweetalert2/dist/sweetalert2.min.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
    ])
    .pipe(gulp.dest('src/css'));
});

// Move Fonts to src/fonts
gulp.task('fonts', () => {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// Bootstrap task
gulp.task('bootstrap', () => {
  const plugins = [cssnano()];
  return gulp
    .src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass.sync())
    .pipe(gulp.dest('src/css'))
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest('src/css'));
});

// My Custom SCSS
gulp.task('scss', () => {
  const plugins = [
    autoprefixer({
      cascade: true
    })
  ];
  return gulp
    .src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', () => {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/lazysizes/lazysizes.js',
      'node_modules/sweetalert2/dist/sweetalert2.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

// Minify js
gulp.task('minjs', () => {
  return gulp
    .src('src/js/app.js')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('src/js'));
});

// Minify CSS
gulp.task('mincss', () => {
  const plugins = [cssnano()];
  return gulp
    .src('src/css/style.css')
    .pipe(postcss(plugins))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('src/css'));
});

// Minify Images
gulp.task('imagemin', () => {
  return gulp
    .src(['src/img/*', '!src/img/dist'])
    .pipe(
      imagemin(
        [
          imagemin.optipng({
            optimizationLevel: 6
          })
        ],
        {
          verbose: true,
          progressive: true
        }
      )
    )
    .pipe(
      rename({
        suffix: '-min'
      })
    )
    .pipe(gulp.dest('src/img/dist'));
});

// Minify HTML File
gulp.task('minify-html', () => {
  const options = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    quoteCharacter: '',
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: true,
    useShortDoctype: true
  };
  return gulp
    .src('index.src.html')
    .pipe(plumber())
    .pipe(htmlmin(options))
    .pipe(rename({ basename: 'index', extname: '.html' }))
    .pipe(gulp.dest('./'));
});

// Concat All JS Files
gulp.task('concat:js', () => {
  return gulp
    .src([
      'src/js/jquery.min.js',
      'src/js/bootstrap.bundle.min.js',
      'src/js/jquery.fancybox.min.js',
      'src/js/lazysizes.js',
      'src/js/sweetalert2.min.js',
      'src/js/app.min.js'
    ])
    .pipe(strip())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('src/js'));
});

// Concat All CSS Files
gulp.task('concat:css', () => {
  return gulp
    .src([
      'src/css/bootstrap-min.css',
      'src/css/font-awesome.min.css',
      'src/css/linea.css',
      'src/css/jquery.fancybox.min.css',
      'src/css/sweetalert2.min.css',
      'src/css/style.min.css'
    ])
    .pipe(postcss([cssnano()]))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('src/css'));
});

// Watch Sass & Serve
gulp.task('watch', () => {
  gulp.watch('*.html').on('change', reload);
  gulp.watch('src/js/app.js', ['minjs', 'concat:js']).on('change', reload);
  gulp
    .watch('src/scss/style.scss', ['scss', 'mincss', 'concat:css'])
    .on('change', reload);
  gulp.watch('*.html', ['minify-html']).on('change', reload);
});

// Concat tasks
gulp.task('concat', ['concat:js', 'concat:css']);

// Default Tasks
gulp.task('default', ['js', 'css', 'fonts']);
