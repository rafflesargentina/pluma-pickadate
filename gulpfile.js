var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon').includePaths,
    neat = require('node-neat').includePaths,
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(['src/sass/pluma-pickadate-default.sass',
                     'src/sass/pluma-pickadate-classic.sass',
                     'src/sass/pluma-pickadate-default-blue.sass',
                     'src/sass/pluma-pickadate-classic-blue.sass',
                     'src/sass/pluma-pickadate-default-teal.sass',
                     'src/sass/pluma-pickadate-classic-teal.sass',
                     'src/sass/pluma-pickadate-default-dorange.sass',
                     'src/sass/pluma-pickadate-classic-dorange.sass'])
        .pipe(sass({
            includePaths: bourbon,
            includePaths: neat,
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-css', function() {
    return gulp.src(['dist/css/pluma-pickadate-default.css',
                     'dist/css/pluma-pickadate-classic.css',
                     'dist/css/pluma-pickadate-default-blue.css',
                     'dist/css/pluma-pickadate-classic-blue.css',
                     'dist/css/pluma-pickadate-default-teal.css',
                     'dist/css/pluma-pickadate-classic-teal.css',
                     'dist/css/pluma-pickadate-default-dorange.css',
                     'dist/css/pluma-pickadate-classic-dorange.css'])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('watch', ['sass', 'minify-css', 'browserSync'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
