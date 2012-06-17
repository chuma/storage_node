/* The following are valid comparison operators

 p: {'eq', to} equal to
 p: {'nq', to} not equal to
 p: {'gt', to} greater than
 p: {'lt', to} lower than

It is possible to specify a set of options to match
p: [{gt: to_1}, {lt: to_2}]

*/

var utils = require('./../../utils');

var search = (function () {
  var options = {};

  var compare = function (operator, p1, p2) {
    switch (operator) {
      case 'eq':
        return (p1 == p2) ? true : false;
      case 'nq':
        return (p1 != p2) ? true : false;
      case 'gt':
        return (p1 < p2) ? true : false;
      case 'lt':
        return (p1 > p2) ? true : false;
    }
  };

  return {
    setOptions: function (op) {
      options = op;
    },
    matches: function (ob) {
      len = Object.keys(options).length, c = 0;
      for (var k in options) {
        if (Array.isArray(options[k])) {
          // if all matches result in true, if c1 == array.length -> increment c
          var len1 = options[k].length, c1 = 0;
          for (var i = 0; i < len1; i += 1) {
            for (var k1 in options[k][i]) {
              if (compare(k1, options[k][i][k1], ob[k])) {
                c1 += 1;
              }
            }
          }
          if (c1 == len1) {
            c += 1;
          }
        } else {
          // single option to match, if true -> increment c
          for (var k1 in options[k]) {
            if (compare(k1, options[k][k1], ob[k])) {
              c += 1;
            }
          }
        }
      }
      // if c == options.length -> match
      return (c == len) ? true : false;
    }
  };
}());

module.exports = search;
