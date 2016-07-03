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
            // sub file prefix
            var prefix = options.prefix || 'file_';
            var count = options.count;
            var ext = options.ext || 'txt';
            var str = String(file.contents);
            var totalLength = str.length;
            var startIndex = 0;
            var endIndex = 0;
            var eachIndex = parseInt(totalLength / count);
            var tempFile = null;
            var sthis = this;

            if (options.splitPattern) {
                var splitStr = str.split(options.splitPattern);
                for (var index = 0; index < splitStr.length; index++) {
                    if (splitStr[index] === '') continue;
                    var lines = splitStr[index].split(/\r?\n/);
                    var fileName = lines[0].replace('*/', '').split(' ')[1];
                    lines.splice(0, 1);
                    splitStr[index] = lines.join('\n');
                    tempFile = new gutil.File({
                        base: path.join(__dirname, '.'),
                        cwd: __dirname,
                        path: path.join(__dirname, prefix + (fileName !== '' ? fileName : index) + "." + ext)
                    });
                    var content = splitStr[index];
                    tempFile.contents = new Buffer(content);
                    sthis.push(tempFile);
                }
            } else {
                if (options.count && parseInt(options.count) > 1) {

                    for (var index = 0; index < count; index++) {
                        tempFile = new gutil.File({
                            base: path.join(__dirname, '.'),
                            cwd: __dirname,
                            path: path.join(__dirname, prefix + index + "." + ext)
                        });
                        startIndex = eachIndex * index;
                        endIndex = eachIndex * (index + 1);
                        if (index == count - 1) {
                            endIndex = totalLength;
                        }
                        var content = str.substring(startIndex, endIndex);
                        tempFile.contents = new Buffer(content);
                        //console.log(content);
                        sthis.push(tempFile);
                    }
                    console.log("split end");
                }
            }
            return callback();
        }

        callback(null, file);
    };

    return through.obj(doSplitFile);
};