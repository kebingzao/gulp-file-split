var gulp  = require('gulp');
var gsplit  = require('../index');
var del    = require('del');

gulp.task('clean', function(cb) {
    del(['tmp'], cb);
});

gulp.task('compress', ['clean'], function() {
  gulp.src('file.txt')
          .pipe(gsplit({
              prefix: 'resource_',
              ext: 'txt',
              count: 3
          }))
          .pipe(gulp.dest('tmp'));
});

gulp.task('default', ['compress']);