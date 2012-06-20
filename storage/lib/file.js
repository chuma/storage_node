var fs = require('fs');
var path = require('path');

var utils = require('utils');

var file = {
  loadData: function (location, data) {
    var files = fs.readdirSync(location), len = files.length;
    for (var i = 0; i < len; i += 1) {
      var content = fs.readFileSync(path.join(location, files[i]));
      data[files[i]] = JSON.parse(content);
    }
    console.log(new Date() + ' ' + 'Storage data retrieved!');
  },
  save: function (location, data) {
    var len = Object.keys(data).length, c = 0;
    for (var k in data) {
      if (!utils.isObject(data[k])) {
        len -= 1;
        continue;
      }
      var content = JSON.stringify(data[k]);
      fs.writeFile(path.join(location, k), content, function (err) {
        if (err) throw err;
        c += 1;
        if (c == len) {
          console.log(new Date() + ' ' + 'Storage data rewritten!');
        }
      });
    }
  }
};

module.exports = file;
