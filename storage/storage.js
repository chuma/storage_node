var fs = require('fs');
var path = require('path');

var utils = require('./../utils');
var file = require('./lib/file');
var accessor = require('./lib/accessor');

var storage = (function () {
  var location = '';

  var attachThis = {
    new: function (ob) {
      var id = 1;
      while (id in this) {
        id += 1;
      }
      this[id] = ob;
    },
    find: function (options, callback) {
      accessor.find(this, options, callback);
    },
    remove: function (options, callback) {
      accessor.remove(this, options, callback);
    },
    modify: function (options, ob, callback) {
      accessor.modify(this, options, ob, callback);
    }
  };

  return {
    init: function (loc) {
      location = loc || 'data';
      if (fs.existsSync(location)) {
        file.loadData(location, this.data);
        for (var k in this.data) {
          if (!utils.isObject(this.data[k])) continue;
          for (var k1 in attachThis) {
            this.data[k][k1] = attachThis[k1];
          }
        }
      } else {
        throw new Error('Location ' + location + ' not found!');
      }
    },
    save: function () {
      file.save(location, this.data);
    },
    data: {
      new: function (prop) {
        this[prop] = attachThis;
      }
    }
  };
}());

module.exports = storage;
