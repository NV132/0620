const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

// File paths
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'public/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'public/js'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'public/images'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'public/fonts'
  },
  html: {
    src: 'src/html/**/*.html',
    dest: 'public'
  }
};

// Clean public directory
function clean() {
  return del(['public/**/*']);
}

// Compile SCSS to CSS
function styles() {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

// Compile SCSS without minification for development
function stylesDev() {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest));
}

// Bundle and minify JavaScript
function scripts() {
  return gulp
    .src([
      'src/js/utils.js',
      'src/js/components.js',
      'src/js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.dest));
}

// Copy JavaScript without minification for development
function scriptsDev() {
  return gulp
    .src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest));
}

// Copy images
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// Copy fonts
function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// Copy HTML files
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

// Watch for changes
function watch() {
  gulp.watch('src/scss/**/*.scss', stylesDev);
  gulp.watch('src/js/**/*.js', scriptsDev);
  gulp.watch('src/images/**/*', images);
  gulp.watch('src/fonts/**/*', fonts);
  gulp.watch('src/html/**/*.html', html);
}

// Build for production
const build = gulp.series(
  clean,
  gulp.parallel(styles, scripts, images, fonts, html)
);

// Build for development
const buildDev = gulp.series(
  clean,
  gulp.parallel(stylesDev, scriptsDev, images, fonts, html)
);

// Export tasks
exports.clean = clean;
exports.styles = styles;
exports.stylesDev = stylesDev;
exports.scripts = scripts;
exports.scriptsDev = scriptsDev;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.watch = watch;
exports.build = build;
exports.buildDev = buildDev;
exports.default = buildDev; 