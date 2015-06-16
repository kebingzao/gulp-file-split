'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function(options) {
  var doSplitFile = function(file, enc, callback) {
    if (file.isNull()) {
      console.log("null");
      return callback(null, file);
    }
    if (file.isStream()) {
      console.log("stream");
      return callback(null, file);
    }

    if (file.isBuffer()) {
      // 分割的次数要大于一次
      if(options.count && parseInt(options.count) > 1){
        // 文件夹的前缀
        var prefix = options.prefix || 'file_';
        var count = options.count;
        var ext = options.ext || 'txt';
        var str = String(file.contents);
        var totalLength = str.length;
        var startIndex = 0;
        var endIndex = 0;
        // 每一块分片
        var eachIndex = parseInt(totalLength/count);
        var tempFile = null;
        var sthis = this;
        for(var index=0; index < count; index++){
          tempFile = new gutil.File({
            base: path.join(__dirname, '.'),
            cwd: __dirname,
            path: path.join(__dirname, prefix + index + "." + ext)
          });
          startIndex = eachIndex * index;
          endIndex = eachIndex * (index + 1);
          if(index == count -1){
            endIndex = totalLength;
          }
          var content = str.substring(startIndex,endIndex);
          tempFile.contents = new Buffer(content);
          console.log(content);
          sthis.push(tempFile);
        }
        console.log("split end");
        return callback();
      }
    }

    callback(null, file);
  };

  return through.obj(doSplitFile);
};
