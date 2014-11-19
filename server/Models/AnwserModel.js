var mongoose = require('../DatabaseConnection').getDB(),
    ObjectId = mongoose.Types.ObjectId;

var AnwserSchema = mongoose.Schema({
    anwser: String,
    question: {
        type: mongoose.Schema.Types.ObjectId,
        dateAnwsered: Date,
        ref: 'users'
    }
});

exports.Anwser = mongoose.model('anwsers', AnwserSchema);