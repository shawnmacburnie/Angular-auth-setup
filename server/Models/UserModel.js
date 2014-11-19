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


//my user
// var user = new User({
//     username: 'sookool99',
//     password: 'shawn',
//     firstName: 'Shawn',
//     lastName: 'Macburnie',
//     phoneNumber: '9027199742',
//     email: 'email'
// });