"use strict";

const PORT = 3000;
var express = require("express");
var app = express();
var dataManager = require("./helper.js");

app.get("/", function (req, res) {
    logRequest(req, null);
    res.send("hello world\n");
});

app.get("/locations", function(req, res) {
    logRequest(req, null);
    var responseBody = dataManager.getLocations.filter(function(el) {
        return el != null;
    }).map(i => i.toJson());
    res.status(200).json(responseBody);
});

app.get("/locations/:id", function(req, res) {
    logRequest(req, null);
    try {
        var responseBody = dataManager.getLocation(req.params.id);
        res.status(200).json(responseBody.toJson()).end();
    } catch (ex) {
        res.status(404);
        console.log("ERROR:", ex.message);
        res.json({"error": ex.message});
    }
});

app.post("/locations", function(req, res) {
    var body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        logRequest(req, body);

        try {
            var responseBody = dataManager.createLocation(body);
            res.status(201).json(responseBody).end();
        } catch (ex) {
            console.log("ERROR:", ex.message);
            res.status(422).json({"error": ex.message}).end();
        }
    });
});

app.patch("/locations/:id", function(req, res) {
    var body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        logRequest(req, body);

        try {
            var responseBody = dataManager.updateLocation(req.params.id, body);
            res.status(200).json(responseBody.toJson()).end();
        } catch (ex) {
            console.log("ERROR:", ex.message);
            res.status(422).json({"error": ex.message}).end();
        }
    });
});

app.delete("/locations/:id", function(req, res) {
    logRequest(req, null);

    try {
        var responseBody = dataManager.deleteLocation(req.params.id);
        res.status(204).end();
    } catch (ex) {
        console.log("ERROR:", ex.message);
        res.status(404).json({"error": ex.message});
    }
});

// helper to log requests to server
function logRequest(req, body) {
    console.log("Server received", req.method, "request on", req.url);
    if (body != null) {
        console.log("with body")
        console.log(body);
    }
}

var startServer = app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = startServer;
