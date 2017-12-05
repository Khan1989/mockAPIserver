var express = require('express');
var app = express();
var fs = require("fs");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:2828");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World!');
});

// get single event
app.get('/singleevent/:eventname', function(req, res) {
    var eventname = req.params.eventname;

    fs.readFile("./data/" + "events.json", 'utf8', function(err, data) {
        var events = JSON.parse(data);
        for (var i = 0; i < events.length; i++) {
            if (events[i].name === eventname) {
                res.send(events[i]);
            }
        }
        //need to handle if event is not found in the above loop
        //res.send(events);
    });
});

// get all events
app.get('/events', function(req, res) {
    fs.readFile("./data/" + "events.json", 'utf8', function(err, data) {
        var events = JSON.parse(data);
        res.send(events);
    });
});

// publish a new event
app.post('/publish', function(req, res) {
    fs.readFile("./data/" + "events.json", 'utf8', function(err, data) {
        var events = JSON.parse(data);
        fs.writeFile("./data/" + "events.json", JSON.stringify(events), function(err, data) {
            res.send(events);
        });
    });
});




app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});