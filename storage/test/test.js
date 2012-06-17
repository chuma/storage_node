var storage = require('./../storage');

storage.init(__dirname + '/data');

storage.data.blubb.modify({
    age: [{'gt': 1}, {lt: 13}]
}, {
    name: 'Peter',
    pets: ['dog', 'something else']
}, function(found) {
    console.log(found);
    console.log(storage.data.blubb);
    storage.save();
});
