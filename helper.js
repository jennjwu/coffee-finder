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

// spare array storing location content
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
            idxList[id] = location.toJson();
        }
    });

    return idxList;
}

// retrieve location with matching id
function getLocation(id) {
    if (isNaN(parseInt(id))) {
        throw new Error(`${id} is not a number for a location id`);
    }

    var idInt = parseInt(id);
    if (idInt < 0) {
        throw new Error(`${id} is not a valid location id, must be 0 or greater`);
    }

    var response = data[idInt];
    if (response == null) {
        throw new Error(`location with id ${id} not found`);
    }

    return response;
}

module.exports = {
    getData : data,
    getLocation : getLocation
}
