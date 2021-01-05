const { src, dest, parallel, series, watch } = require('gulp');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const htmlmin = require('gulp-html-minifier');
const uglify = require('gulp-uglify');

const strip = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');

const browserSync = require('browser-sync').create();

// Copy CSS to src/css Task
function copyCSS() {
  return src([
    'node_modules/sweetalert2/dist/sweetalert2.min.css',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
  ]).pipe(dest('src/css'));
}

// Copy JS Files to src/js Task
function copyJS() {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/lazysizes/lazysizes.js',
    'node_modules/sweetalert2/dist/sweetalert2.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
    'node_modules/@fortawesome/fontawesome-free/js/all.min.js'
  ]).pipe(dest('src/js'));
}

// Copy Bootstrap Scss files Task
function copyBootstrap() {
  return src('node_modules/bootstrap/scss/**/*.scss').pipe(
    dest('src/scss/vendors/bootstrap')
  );
}

// Preprocess Custom Scss Task
function scss() {
  let plugins = [autoprefixer(), cssnano()];
  return src('src/scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename('style.min.css'))
    .pipe(dest('src/css'));
}

// Minify HTML File
function minifyHTML() {
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
  return src('index.src.html')
    .pipe(plumber())
    .pipe(htmlmin(options))
    .pipe(rename('index.html'))
    .pipe(dest('./'));
}

// Concat All CSS Files Task
function concatCSS() {
  return src([
    'src/css/jquery.fancybox.min.css',
    'src/css/sweetalert2.min.css',
    'src/css/style.min.css'
  ])
    .pipe(postcss([cssnano()]))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(concat('all.min.css'))
    .pipe(dest('src/css'));
}

// Concat All JS Files Task
function concatJS() {
  return src(
    [
      'src/js/jquery.min.js',
      'src/js/all.min.js', // FontAwesome 5
      'src/js/bootstrap.bundle.min.js',
      'src/js/jquery.fancybox.min.js',
      'src/js/lazysizes.js',
      'src/js/sweetalert2.min.js',
      'src/js/app.js'
    ]
  )
    .pipe(strip())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('src/js'));
}

// Watch Sass & Serve
function serve() {
  browserSync.init({
    watch: true,
    server: {
      baseDir: './'
    }
  });
  watch('src/scss/**/*.scss', series('scss', 'concatCSS'));
  watch('src/js/app.js', series('concatJS'));
  watch('index.src.html', series('minifyHTML'));
}

// Default Tasks
exports.default = parallel(copyCSS, copyJS);

exports.copyCSS = copyCSS;
exports.copyJS = copyJS;
exports.copyBootstrap = copyBootstrap;
exports.scss = scss;
exports.concatCSS = concatCSS;
exports.concatJS = concatJS;
exports.minifyHTML = minifyHTML;
exports.serve = serve;
