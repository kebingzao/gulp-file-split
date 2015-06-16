# gulp-file-split
> split file to multiple for gulp

## Usage

First, install `gulp-file-split` as a development dependency:

```shell
npm install --save-dev gulp-file-split
```

Then, add it to your `gulpfile.js`:

```javascript
var file_split  = require('gulp_file_split');

gulp.task('split', function() {
  gulp.src('file.txt')
          .pipe(file_split({
              suffix: 'resource_',
              ext: 'txt',
              count: 3
          }))
          .pipe(gulp.dest('tmp'));
});
```


## API

### file_split(options)


#### options
Type: `Object`

##### options.prefix
Type: `String`  
Default: `file_`

the sub file prefix name

##### options.count
Type: `Integer`  

The number to be divided sub file

##### options.ext
Type: `String`  
Default: `txt`

the sub file suffix name