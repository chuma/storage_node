// Generated by CoffeeScript 1.3.3
(function() {
  var file, fs, path, utils;

  fs = require('fs');

  path = require('path');

  utils = require('utils');

  file = {
    loadData: function(location, data) {
      var content, files, _i, _len;
      files = fs.readdirSync(location);
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        content = fs.readFileSync(path.join(location, file));
        data[file] = JSON.parse(content);
      }
      return console.log('Storage data retrieved!');
    },
    save: function(location, data) {
      var c, content, k, len, _results;
      len = utils.noe(data);
      c = 0;
      _results = [];
      for (k in data) {
        if (!(utils.isObject(data[k]))) {
          continue;
        }
        len--;
        content = JSON.stringify(data[k]);
        _results.push(fs.writeFile(path.join(location, k), content, function(err) {
          if (err) {
            throw err;
          }
          c++;
          if (c === len) {
            return console.log('Storage data rewritten!');
          }
        }));
      }
      return _results;
    }
  };

  module.exports = file;

}).call(this);
