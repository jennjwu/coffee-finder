"use strict";

const PORT = 3000;
var express = require("express");
var app = express();
var dataFetcher = require("./helper.js");

app.get("/", function (req, res) {
    logRequest(req);
    res.send("hello world\n");
});

app.get("/locations", function(req, res) {
    logRequest(req);
    res.json(dataFetcher.getData);
});

app.get("/locations/:id", function(req, res) {
    logRequest(req);

    try {
        var responseBody = dataFetcher.getLocation(req.params.id);
        res.json(responseBody).end();
    } catch (ex) {
        res.status(404);
        console.log("ERROR:", ex.message);
        res.json({"error": ex.message});
    }
});

function logRequest(req) {
    console.log("Server received", req.method, "request on", req.url);
}

var startServer = app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = startServer;
