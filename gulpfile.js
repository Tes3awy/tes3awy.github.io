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
const uglify = require('gulp-uglify');

const strip = require('gulp-strip-comments');
const stripCssComments = require('gulp-strip-css-comments');
const sourcemaps = require('gulp-sourcemaps');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const psi = require('psi');
const site = 'https://tes3awy.netlify.com/';
const key = 'AIzaSyDAJzl1tWyXNeIe2ESCExV7nvWklISQThY';
const port = 3000;

// Move CSS to src/css
gulp.task('css', () => {
  return gulp
    .src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/sweetalert2/dist/sweetalert2.min.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
    ])
    .pipe(gulp.dest('src/css'));
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
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/@fortawesome/fontawesome-free/js/all.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

// Minify app.js
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
      'src/js/app.min.js',
      'src/js/all.min.js', // FontAwesome 5
      'src/js/bootstrap.bundle.min.js',
      'src/js/jquery.fancybox.min.js',
      'src/js/lazysizes.js',
      'src/js/sweetalert2.min.js'
    ])
    .pipe(strip())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('src/js'));
});

// Concat All CSS Files
gulp.task('concat:css', () => {
  return gulp
    .src([
      'src/css/bootstrap-min.css',
      'src/css/linea.css',
      'src/css/jquery.fancybox.min.css',
      'src/css/sweetalert2.min.css',
      'src/css/style.min.css'
    ])
    .pipe(postcss([cssnano()]))
    .pipe(stripCssComments({ preserve: false }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Get the PageSpeed Insights report
gulp.task('psi:desktop', async () => {
  const data = await psi(site, {
    key,
    strategy: 'desktop'
  });
  console.log('Desktop Page Stats:', data.pageStats);
  console.log('Desktop Speed score:', data.ruleGroups.SPEED.score);
});

gulp.task('psi:mobile', async () => {
  const data = await psi(site, {
    key,
    strategy: 'mobile'
  });
  console.log('Mobile Page Stats:', data.pageStats);
  console.log('Mobile Speed score:', data.ruleGroups.SPEED.score);
});

// Watch Sass & Serve
gulp.task('serve', () => {
  browserSync.init({
    watch: true,
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port,
    https: false,
    logLevel: 'debug',
    minify: true
  });
  browserSync.watch('all.min.css').on('change', reload);
  gulp
    .watch(
      'src/scss/style.scss',
      gulp.parallel(['scss', 'concat:css', 'mincss'])
    )
    .on('change', reload);
  gulp
    .watch('src/js/app.js', gulp.parallel(['minjs', 'concat:js']))
    .on('change', reload);
  gulp.watch('*.html', gulp.parallel('minify-html')).on('change', reload);
});

// Concat tasks
gulp.task('concat:js', gulp.series('concat:js'));
gulp.task('concat:css', gulp.series('concat:css'));

// Default Tasks
gulp.task('default', gulp.series(['js', 'css']));
