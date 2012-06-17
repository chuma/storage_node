storage_node
============

Simple JSON file storage module for node.js. It features a mongoDB inspired syntax and is purely asynchronous.

usage
-----

### initialization

var storage = require('storage');
    storage.init('path to data folder');

### creating a branch

storage.data.new('users');

### adding data

for (var i = 0; i < 10; i += 1) {
  var name = 'user_' + i;
  var age = i * 4;
  storage.data.users.new({
    name: name,
    age: age
  });
}

### search syntax

 p: {'eq', to} equal to
 p: {'nq', to} not equal to
 p: {'gt', to} greater than
 p: {'lt', to} lower than

It is possible to specify a set of options to match:
p: [{gt: to_1}, {lt: to_2}]

### retrieving data

storage.data.users.find({
  age: {gt: 8}
}, function (found) {
  console.log(found);
});

### modifying data

storage.data.users.modify({
  name: {eq: 'user_4'}
}, {
  name: 'user_40'
}, function (found) {
  console.log(found);
});

### removing data

storage.data.users.remove({
  age: [{gt: 4}, {lt: 16}]
}, function (found) {
  console.log(found);
});

### saving changes

storage.save();
