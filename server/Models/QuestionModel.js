var mongoose = require('../DatabaseConnection').getDB(),
    ObjectId = mongoose.Types.ObjectId;

var QuestionSchema = mongoose.Schema({
    question: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

exports.Question = mongoose.model('questions', QuestionSchema);