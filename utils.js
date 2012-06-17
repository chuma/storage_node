var utils = {
  processObject: function (ob, handle) {
    var keys = Object.keys(ob);
    if (keys.length) {
      process.nextTick(function run () {
        var k = keys.shift();
        handle(ob[k], k);
        if (keys.length) {
          process.nextTick(run);
        }
      });
    }
  },
  isObject: function (ob) {
    return (typeof ob == 'object' && !Array.isArray(ob) && ob != null);
  },
  clone: function (ob) {
    var copy = {};
    for (var k in ob) {
      if (this.isObject(ob[k])) {
        copy[k] = this.clone(ob[k]);
      } else {
        copy[k] = ob[k];
      }
    }
    return copy;
  }
};

module.exports = utils;
