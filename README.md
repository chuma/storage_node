storage_node
============

Simple JSON file storage module for node.js. It features a mongoDB inspired syntax and is purely asynchronous. Current version: 0.1.4.
Note: Since storage - from version 0.1.4 onwards - is based on CoffeeScript the examples are provided in both Java- and CoffeeScript.

usage
-----

### initialization

```javascript
var storage = require('storage').init('path');
```

```coffeescript
storage = require('storage').init 'path'
```

### creating a branch

```javascript
storage.data.new('users');
```

```coffeescript
storage.data.new 'users'
```

### adding data

```javascript
for (var i = 0; i < 10; i += 1) {
  var name = 'user_' + i;
  var age = i * 4;
  storage.data.users.new({
    name: name,
    age: age
  });
}
```

```coffeescript
for i in [0..9]
  name = 'user_' + i
  age = i * 4
  storage.data.users.new
    name: name
    age: age
```

### search syntax

 p: {'eq', to} equal to  
 p: {'nq', to} not equal to  
 p: {'gt', to} greater than  
 p: {'lt', to} lower than  

It is possible to specify a set of options to match:  
p: [{gt: to_1}, {lt: to_2}]

### retrieving data

```javascript
storage.data.users.find({
  age: {gt: 8}
}, function (found) {
  console.log(found);
});
```

```coffeescript
storage.data.users.find
  age: {gt: 8}
  (found) ->
    console.log found
```

Remark: It is possible (from v0.1.1 on) to get all the data of a certain type by calling: allUsers = storage.data.users.all(); Although keeping this function sync might appear to contradict with node's main principles it proves to be the right choice for the amount of data that is usually handled with storage.

### more details on retrieving data (from v0.1.3 onwards)

If no option matched (= no data was retrieved) found is set to null. This enables the following:

```javascript
storage.data.users.find({
  age: {gt: 8}
}, function (found) {
  if (found) {
    // we got something!
  }
});
```

```coffeescript
storage.data.users.find
  age: {gt: 8}
  (found) ->
    if found then doSomething()
```

If only one element was found accessing it directly is possible:

```javascript
storage.data.users.find({
  age: {eq: 8}
}, function (found) {
  console.log(found.name);
});
```

```coffeescript
storage.data.users.find
  age: {eq: 8}
  (found) ->
    console.log found.name
```

The id property is now directly attached to all of the retrieved elements:

```javascript
storage.data.users.find({
  age: {lt: 12}
}, function (found) {
  for (var k in found) {
    // access id either as "k" or as the object's "id" property
    console.log(k + ' is the same as ' + found[k].id);
  }
});
```

```coffeescript
storage.data.users.find
  age: {lt: 12}
  (found) ->
    for k of found
      console.log k + ' is the same as ' + found[k].id
```

### modifying data

```javascript
storage.data.users.modify({
  name: {eq: 'user_4'}
}, {
  name: 'user_40'
}, function (found) {
  console.log(found);
});
```

```coffeescript
storage.data.users.modify(
  {name: {eq: 'user_4'}}
  {name: 'user_40'}
  (found) ->
    console.log found
)
```

### removing data

```javascript
storage.data.users.remove({
  age: [{gt: 4}, {lt: 16}]
}, function (found) {
  console.log(found);
});
```

```coffeescript
storage.data.users.remove
  age: [{gt: 4}, {lt: 16}]
  (found) ->
    console.log found
```

Remark: It is possible in (v0.1.3) to remove all the data of a certain type by calling removedUsers = storage.data.users.clear();

### saving changes

```javascript
storage.save();
```

```coffeescript
storage.save()
```