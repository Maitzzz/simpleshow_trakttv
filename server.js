/**
 * Created by L2pakas on 18.04.2015.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var _ = require('underscore');
var apikey = 'f9ca74415fcfe2d8c3982fa7e466b2dd5b0e381b31360de811d319d64bc4103d';
var Promise = require("bluebird");

var trakt = require("node-trakt");
var apiurl = 'https://api-v2launch.trakt.tv'
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');+res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

trakt.init(apikey);

app.use(bodyParser.urlencoded({
    extended: true
}));

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
});

app.get('/hi', function(req, res) {
    res.send('Up!')
});
/*
app.get('/show/:imdb', function(req, res) {
    trakt.showSummary({ title:  req.params.imdb }, function (err, show) {
       res.send(show.images)
    });
});*/

app.get('/show/:imdb', function(req, res) {
    console.log('sees');
    var options = {
        url: apiurl + '/shows/' + req.params.imdb + '?extended=full,images',
        headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': apikey
        }
    };
    request(options, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
            res.send(info)
        } else {
            res.send( {
                'message': false
            })
        }
    }
});

app.get('/episode/:imdb/:season/:episode', function(req, res) {
    var options = {
        url: apiurl + '/shows/' + req.params.imdb + '/seasons/' + req.params.season + '/episodes/' + req.params.episode + '?extended=images' ,
        headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': apikey
        }
    };
    request(options, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
            res.send(info)
        } else {
            res.send( {
                'message': false
            })
        }
    }
});

app.get('/test/:imdb', function(req, res) {
    var imdb = req.params.imdb;
    var url = apiurl + '/shows/'+ imdb + '/seasons/?extended=episodes,full,images';
    var options = {
        url: url,
        headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': apikey
        }
    };

    getData(options).then(function (data) {

        res.send(data)

    });
    
});

function getData(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body);
        });
    });
}

app.get('/show/:imdb', function(req, res) {
    console.log('sees');
    var options = {
        url: apiurl + '/shows/' + req.params.imdb + '?extended=images',
        headers: {
            'Content-Type' : 'application/json',
            'trakt-api-version': 2,
            'trakt-api-key': apikey
        }
    };
    request(options, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info);
            res.send(info)
        } else {
            res.send( {
                'message': false
            })
        }
    }
});