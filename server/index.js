var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    cors = require('cors'),
    assert = require('assert'),
    hat = require('hat'),
    db = require('./DatabaseConnection'),
    bodyParser = require('body-parser'),
    port = 3000;

db.connect();

//Models
var User = require("./Models/UserModel").User;


app.use(bodyParser.json());
app.use(cors({
    allowedOrigins: [
        'localhost:9000'
    ]
}));

app.post('/login', function(req, res) {
    var data = req.body;
    var query = User.where({
        username: data.username,
        password: data.password
    });
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
        user.auth = hat();
        user.save(function(err,data){
            if(err) return res.send(err);

            res.send({
                accessToken:data._id + ":" + data.auth,
                user: {
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            });
        });
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

app.listen(port, function() {
    console.log('server is running: ' + port);
});