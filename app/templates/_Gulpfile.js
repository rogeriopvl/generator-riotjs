var gulp = require('gulp');
var lrserver = require('tiny-lr');
var livereload = require('gulp-livereload');
var connect = require('connect');

var WEB_PORT = 9000;
var APP_DIR = 'app';
var DIST_DIR = 'dist';

var lrs = lrserver();

// start livereload server
gulp.task('lr-server', function() {
    lrs.listen(35729, function(err) {
        if (err) return console.log(err);
    });
});

// start local http server for development
gulp.task('http-server', function() {
    connect()
    .use(require('connect-livereload')())
    .use(connect.static(APP_DIR))
    .listen(WEB_PORT);
});

// start local http server with watch and livereload set up
gulp.task('server', function() {
    gulp.run('lr-server');

    var watchFiles = ['app/**/*.html', 'app/js/**/*.js'];
    gulp.watch(watchFiles, function(e) {
        console.log('Files changed. Reloading...');
        gulp.src(watchFiles)
        .pipe(livereload(lrs));
    });

    gulp.run('http-server');
});

gulp.task('default', function() {
    gulp.run('server');
});
