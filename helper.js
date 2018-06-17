"use strict";

var data = require("./model.js");
var Location = require("./Location");

function validateId(id) {
    if (isNaN(parseInt(id))) {
        throw new Error(`${id} is not a number for a location id`);
    }

    if (parseInt(id) < 0) {
        throw new Error(`${id} is not a valid location id, must be 0 or greater`);
    }
}

function validLocation(location) {
    // TODO: add some gmaps validation here
    var lat = parseFloat(location.latitude);
    var long = parseFloat(location.longitude);

    return lat != null && long != null && location.name != null && location.address != null;
}

function findFirstEmptyIndex() {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == null) {
            return i;
        }
    }

    return i;
}

function createLocation(location) {
    var locationJson = JSON.parse(location);

    if (!validLocation(locationJson)) {
        throw new Error("location data is invalid for creation");
    }

    var id = findFirstEmptyIndex();
    data[id] = new Location(id, locationJson.name, locationJson.address,
                            parseFloat(locationJson.latitude), parseFloat(locationJson.longitude));
    console.log("created location at id", id);
    return { "id": id };
}

function getLocation(id) {
    validateId(id);

    var response = data[parseInt(id)];
    if (response == null) {
        throw new Error(`location with id ${id} not found`);
    }
    return response;
}

function updateLocation(id, location) {
    validateId(id);

    var dataAtIdx = data[parseInt(id)];
    if (dataAtIdx == null) {
        throw new Error(`location at id ${id} does not exist and cannot be updated`);
    }

    var locationJson = JSON.parse(location);
    if (locationJson.id != null) {
        throw new Error("updating location id is not allowable");
    }

    var existingLoc = getLocation(id);

    if (locationJson.name != null) {
        existingLoc.setName(locationJson.name);
    }

    // TODO: validate address?
    if (locationJson.address != null) {
        existingLoc.setAddress(locationJson.address);
    }

    // TODO: validate lat/long?
    if (locationJson.latitude != null && !isNaN(parseFloat(locationJson.latitude))) {
        existingLoc.setLatitude(parseFloat(locationJson.latitude));
    }

    if (locationJson.longitude != null && !isNaN(parseFloat(locationJson.longitude))) {
        existingLoc.setLongitude(parseFloat(locationJson.longitude));
    }

    data[id] = existingLoc;
    console.log("location at id", id, "updated");
    return existingLoc;
}

function deleteLocation(id) {
    validateId(id);

    var dataAtIdx = data[parseInt(id)];
    if (dataAtIdx == null) {
        throw new Error(`location at id ${id} does not exist and cannot be deleted`);
    }

    data[id] = null;
    console.log("deleted location at id", id);
}

module.exports = {
    getLocations: data,
    getLocation: getLocation,
    createLocation: createLocation,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
}
