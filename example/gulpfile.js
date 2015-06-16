var gulp  = require('gulp');
var file_split  = require('../index');
var del    = require('del');

gulp.task('clean', function(cb) {
    del(['tmp'], cb);
});

gulp.task('compress', ['clean'], function() {
  gulp.src('file.txt')
          .pipe(file_split({
              prefix: 'resource_',
              ext: 'txt',
              count: 3
          }))
          .pipe(gulp.dest('tmp'));
});

gulp.task('default', ['compress']);