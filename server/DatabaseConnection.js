var mongoose = require('mongoose');

exports.connect = function() {
    mongoose.connect('mongodb://localhost/selfStats');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('open');
    });
}

exports.getDB = function() {
    return mongoose;
}