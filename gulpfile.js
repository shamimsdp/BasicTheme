var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    extreplace = require('gulp-ext-replace'),
    replace = require('gulp-replace'),
    cssbeautify = require('gulp-cssbeautify'),
    fileinclude = require('gulp-file-include'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    include = require('gulp-html-tag-include'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps');
    browserSync.stream();
    

////////////////////////////////
//   sass task
////////////////////////////////

gulp.task('sass', function() {
    var filesToMove = [
        './css/**/*.*',
    ];

    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest('dist/'));

    return gulp.src('sass/**/*.scss') // Gets all files ending with .scss in theme/scss and children dirs
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass().on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
    // .pipe(autoprefixer({
    //     browsers: ['last 2 versions'],
    //     cascade: false
    // }))
    .pipe(cssbeautify())
    // .pipe(sourcemaps.init())
    //   .pipe(concat('style.css'))
    // .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/css'))
    // .pipe(browserSync.stream());
});



////////////////////////////////
//   watch
////////////////////////////////

gulp.task('watch', function(){
    // browserSync.init({
    //     server: {
    //         baseDir: "dist/"
    //     }
    // });
    
    gulp.watch('sass/**/*.scss', ['sass'])
    gulp.watch('*.html', ['build'])
    
  // Other watchers
});



////////////////////////////////
//   Copy images
////////////////////////////////

// Copy all static images
gulp.task('images', function() {
  return gulp.src('images/*.*')
    // Pass in options to the task
    .pipe(imagemin({verbose: true, optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images/'));
});



////////////////////////////////
//   build html files
////////////////////////////////

gulp.task('build', ['images'], function(){
    //Copy all images, css, js, vendor files

    var filesToMove = [
        './css/**/animate.css',
        './vendor/**/*.*',
        './images/**/*.*',
        './js/*.*'
    ];

    gulp.src(filesToMove, { base: './' })
        .pipe(gulp.dest('dist'));
    // gulp.src('scss/default.css')
    //     .pipe(gulp.dest('dist/css'));

    return gulp.src(['*.html', '!header.html', '!breadcrumb.html', '!footer.html'])
    .pipe(include())
    .pipe(gulp.dest('./dist/'));

});


////////////////////////////////
//   minify script js file
////////////////////////////////

gulp.task('minify', function(){
    gulp.src('js/scripts.js')
    .pipe(sourcemaps.init())  // Process the original sources
      .pipe(uglify())
      .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('dist/js/'));
});



////////////////////////////////////
//   all plugin files into one file
////////////////////////////////////

gulp.task('plugin', function() {
  return gulp.src([
        'vendor/bootstrap/js/bootstrap.min.js', 
        'vendor/Magnific-Popup/jquery.magnific-popup.min.js', 
        'vendor/OwlCarousel-2/owl.carousel.min.js',
        'vendor/slider-pro/js/jquery.sliderPro.min.js',
        'js/jquery.shuffle.min.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('dist/js/'));
});


////////////////////////////////////
//   browser-sync config
////////////////////////////////////

gulp.task('browser-sync', function () {
   var files = [
      'dist/**/*.html',
      'dist/css/**/*.css',
      'dist/images/**/*.*',
      'dist/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: 'dist/'
      }
   });
});


////////////////////////////////
//   clean all
////////////////////////////////

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist/']);
});



////////////////////////////////////
//   default config
////////////////////////////////////

gulp.task('default', ['build', 'watch']);

// optional
/*
*browser-sync
*/
