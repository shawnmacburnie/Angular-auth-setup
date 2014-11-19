var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    cors = require('cors'),
    assert = require('assert'),
    hat = require('hat'),
    mongoose = require('./DatabaseConnection'),
    bodyParser = require('body-parser'),
    port = 3000;

mongoose.connect();

//Models
var User = require("./Models/UserModel").User;
var Questions = require("./Models/QuestionModel").Question;
var Anwser = require("./Models/AnwserModel");


app.use(bodyParser.json());
app.use(cors({
    allowedOrigins: [
        'localhost:9000'
    ]
}));

app.post('/login', function(req, res) {
    var data = req.body;
    //var token=req.headers['authorization']||'';
    var query = User.where({
        username: data.username,
        password: data.password
    });
    //var query = User.where({_id:ObjectId(data.auth)});
    query.findOne(function(err, user) {
        if (err) return res.send(err);
        if (user) {
            user.auth = hat();
            user.save(function(err, data) {
                res.send({
                    username: user.username,
                    accessToken: user._id + ":" + user.auth
                });
            });
        } else {
            res.status(404).send("No User Found.");
        }
    });
});

app.post('/authenticate', function(req, res) {
    var token = (req.headers['authorization'] || '').split(":");
    if (token.length !== 2) {
        return res.status(403).send("Not Authorized!");
    }
    User.findOne({
        _id: token[0],
        auth: token[1]
    }, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.status(403).send("Not Authorized!");
        res.status(200).send("Valid");
    });
});

app.post('/logout', function(req, res) {
    var token = (req.headers['authorization'] || '').split(":");
    if (token.length !== 2) {
        return res.status(403).send("Not Authorized!");
    }
    id = token[0];
    auth = token[1];
    User.findOne({
        _id: id,
        auth: auth
    }, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.status(403).send("Not Authorized!");
        user.auth = "";
        user.save(function(err, data) {
            res.send(data);
        });
    })
});

app.get('/questions', function(req, res) {
    res.send("return");
});

app.post('/question/add', function(req, res) {
    var token = (req.headers['authorization'] || '').split(":");
    if (token.length !== 2) {
        return res.status(403).send("Not Authorized!");
    }
    var data = req.body;
    User.findOne({
        _id: token[0],
        auth: token[1]
    }, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.status(403).send("Not Authorized!");
        Question.findOne({
            user: token[0],
            question: data.question
        }, function(err, question) {
            if (err) return res.send(err);
            if (question) return res.status(409).send("Question already exists!");
            var newQuestion = new Questions({
                user: token[0],
                question: data.question
            });
            newQuestion.save(function(err, data) {
                res.send(data);
            });
        });
    });
});

app.post('/question/anwser', function(req, res) {
    var token = (req.headers['authorization'] || '').split(":");
    if (token.length !== 2) {
        return res.status(403).send("Not Authorized!");
    }

    var data = req.body;
    User.findOne({
        _id: token[0],
        auth: token[1]
    }, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.status(403).send("Not Authorized!");
        if (Array.isArray(data)) {
            var currentAdded = 0;
            for (var i in data) {
                var val = data[i];
                console.log(val);
                if (!val.question) return res.status(400).send("Bad Request!");
                if (!val.anwser) return res.status(400).send("Bad Request!");
                var ans = new Anwser(val);
                ans.save(function(err, a) {
                    if (err) console.log(err);
                });
            }
        } else {
            var ans = new Anwser(data);
            ans.save();
        }
        return res.status(200).send(data);
    });

});


app.get('/file/:filename', function(req, res) {
    var filename = req.params.filename;
    console.log(filename);
    var filepath = path.resolve(__dirname, "data", filename);
    fs.readFile(filepath, function(err, data) {
        if (err) {
            res.send(err.message);
        } else {
            console.log(data);
            res.send(data);
        }
    });

});

app.listen(port, function() {
    console.log('server is running: ' + port);
});