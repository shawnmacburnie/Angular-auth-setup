var mongoose = require('../DatabaseConnection').getDB();

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    auth: String
});

exports.User = mongoose.model('users', UserSchema);