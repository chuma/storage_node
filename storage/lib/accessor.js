var search = require('./search');

var utils = require('utils');

var accessor = {
  find: function (set, options, callback) {
    var found = {};
    search.setOptions(options);
    var len = Object.keys(set).length, c = 0;
    utils.processObject(set, function(ob, k) {
      if (utils.isObject(ob)) {
        if (search.matches(ob)) {
          found[k] = utils.clone(ob);
        }
      } else {
        len -= 1;
        c -= 1;
      }
      c += 1;
      if (c == len) {
        callback(found);
      }
    });
  },
  remove: function (set, options, callback) {
    this.find(set, options, function (found) {
      for (var k in found) {
        delete set[k];
      }     
      callback(found);
    });
  },
  modify: function (set, options, ob, callback) {
    this.find(set, options, function (found) {
      for (var k in found) {
        for (var k1 in ob) {
          set[k][k1] = ob[k1];
        }
      }
      callback(found);
    });
  },
  // added in 0.1.1,  still thinking about whether it should be sync or not
  all: function (set) {
    var found = {};
    for (var k in set) {
      if (utils.isObject(set[k])) {
        found[k] = utils.clone(set[k]);
      }
    }
    return found;
  }
};

module.exports = accessor;
