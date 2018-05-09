const gulp = require("gulp");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

// Compile Sass & Inject Into Browser
gulp.task("sass", function() {
    return (
        gulp
            .src([
                "./node_modules/bootstrap/scss/bootstrap.scss",
                "./src/scss/*.scss",
            ])
            .pipe(sass())
            // .pipe(postcss())
            .pipe(gulp.dest("./src/css"))
            .pipe(browserSync.stream())
    );
});

// Move JS Files to src/js
gulp.task("js", function() {
    return gulp
        .src([
            "./node_modules/bootstrap/dist/js/bootstrap.min.js",
            "./bower_components/jquery/dist/jquery.min.js",
            "./node_modules/popper.js/dist/umd/popper.min.js",
            "./bower_components/fancybox/dist/jquery.fancybox.min.js",
        ])
        .pipe(gulp.dest("./src/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task("serve", ["sass"], function() {
    browserSync.init({
        server: "./",
    });

    gulp.watch(
        ["./node_modules/bootstrap/scss/bootstrap.scss", "./src/scss/*.scss"],
        ["sass"]
    );
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./src/js/app.js").on("change", browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task("fonts", function() {
    return gulp
        .src("./node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest("./src/fonts"));
});

// Move CSS to src/css
gulp.task("css", function() {
    return gulp
        .src([
            "./node_modules/font-awesome/css/font-awesome.min.css",
            "./bower_components/fancybox/dist/jquery.fancybox.min.css",
        ])
        .pipe(gulp.dest("./src/css"));
});

gulp.task("default", ["js", "css", "fonts"]);
