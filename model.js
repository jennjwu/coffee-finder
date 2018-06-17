"use strict";

const locationsFile = "./data/locations.csv";
var fs = require("fs");
var Location = require("./Location");

// read from input file
var fileContents = fs.readFileSync(locationsFile, "utf8", function(err, data) {
    if (err) {
        console.log("error reading from file", locationsFile);
    }
});

// create a spare array storing location content by id
var data = dataToLocations(fileContents);

// parse data contents (raw CSV strings) to Location object
function dataToLocations(input) {
    var idxList = [];

    input.split("\n").forEach(function(elem) {
        var row = elem.split(",");
        if (row.length !== 5) {
            console.log("parseToLocation: data does not have the expected 5 columns", row);
        } else {
            var id = isNaN(parseInt(row[0])) ? 0 : parseInt(row[0]);
            var name = row[1].trim();
            var addr = row[2].trim();
            var lat = isNaN(parseFloat(row[3])) ? null : parseFloat(row[3]);
            var long = isNaN(parseFloat(row[4])) ? null : parseFloat(row[4]);

            var location = new Location(id, name, addr, lat, long);
            // add location to array with index = id
            idxList[id] = location;
        }
    });

    return idxList;
}

module.exports = data;
