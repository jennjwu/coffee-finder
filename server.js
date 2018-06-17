"use strict";

const PORT = 3000;
const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json";

var express = require("express");
var app = express();
var dataManager = require("./helper.js");
var fs = require("fs");
var https = require("https");

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

app.get("/nearestCoffee", function(req, res) {
    logRequest(req, null);
    var queryAddress = req.query.address;
    console.log("with address", queryAddress);

    var googleAPIKey = process.env.API_KEY;
    if (googleAPIKey == null) {
        res.status(500).json({"error": "google geocode api key not provided"}).end();
    }

    var requestUrl = GOOGLE_GEOCODE_API + "?address=" + queryAddress + "&key=" + googleAPIKey;
    var request = https.request(requestUrl, function(response) {
        var data = "";
        response.on("data", (chunk) => {
            data += chunk.toString();
        });
        response.on("end", () => {
            var result = JSON.parse(data);
            if (result.status != "OK") {
                console.log("ERROR:", result);
                res.status(500).json({"error": "error from google geocode: " + result.status}).end();
            } else {
                var lat = result.results[0].geometry.location.lat;
                var long = result.results[0].geometry.location.lng;
                console.log("using lat", lat, "and long", long);

                var closest = dataManager.getClosestLocation(lat, long);
                res.status(200).json(closest.toJson()).end();
            }
        });
    });

    request.end();
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
