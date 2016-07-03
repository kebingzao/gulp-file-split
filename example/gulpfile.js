var gulp = require('gulp');
var gsplit = require('../index');
var del = require('del');

gulp.task('clean', function(cb) {
    del(['tmp'], cb);
});

gulp.task('compress', ['clean'], function() {
    gulp.src('file.js')
        .pipe(gsplit({
            prefix: 'script_',
            ext: 'js',
            //count: 3,
            splitPattern: "/*--FILE"
        }))
        .pipe(gulp.dest('tmp'));
});

gulp.task('default', ['compress']);