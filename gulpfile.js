var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatenate = require('gulp-concat');
var browsersync = require('browser-sync').create();
var uglify = require('gulp-uglify');

gulp.task('html', function () {
  return gulp.src('sources/index.html')
    .pipe(gulp.dest('distribution'))
    .on('end', browsersync.reload);
});

gulp.task('sass-css', function(){
  return gulp.src('sources/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})) // Minify aswell
    .pipe(autoprefixer({
      add: true,
      remove: true,
      cascade: false, // SASS is already minified so do not cascade
      browsers: ['last 2 versions', '> 1%', 'Firefox ESR'] // http://browserl.ist/?q=last+2+versions%2C+%3E+1%25%2C+Firefox+ESR
    }))
    .pipe(concatenate('bundle.min.css')) // Bundle css
    .pipe(gulp.dest('distribution'))
    .pipe(browsersync.reload({stream: true}));
});

gulp.task('javascript', function() {
  return gulp.src('sources/js/**/*.js')
    // ES Lint here or after concat
    .pipe(concatenate('bundle.min.js')) // Bundle javascript
    .pipe(uglify())
    .pipe(gulp.dest('distribution'))
    .on('end', browsersync.reload);
});

gulp.task('browsersync', function() {
  browsersync.init({
    server: { baseDir: 'distribution' }
  })
});

gulp.task('watch', ['browsersync', 'html', 'sass-css', 'javascript'], function() {
  gulp.watch('sources/scss/**/*.scss', ['sass-css']);
  gulp.watch('sources/js/**/*.js', ['javascript']);
  gulp.watch('sources/index.html', ['html']);
});

gulp.task('just-build', ['html', 'sass-css', 'javascript']);