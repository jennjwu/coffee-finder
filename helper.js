"use strict";

var data = require("./model.js");
var Location = require("./Location");
var Geocode = require("./Geocode");

function validateId(id) {
    if (isNaN(parseInt(id))) {
        throw new Error(`${id} is not a number for a location id`);
    }

    if (parseInt(id) < 0) {
        throw new Error(`${id} is not a valid location id, must be 0 or greater`);
    }
}

function validLocation(location) {
    var lat = parseFloat(location.latitude);
    var long = parseFloat(location.longitude);

    if (isNaN(lat) || isNaN(long)) {
        return false;
    }

    return location.name != null && location.address != null;
}

function findFirstEmptyIndex(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == null) {
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

    var id = findFirstEmptyIndex(data);
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

    if (locationJson.address != null) {
        existingLoc.setAddress(locationJson.address);
    }

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

function getClosestLocation(latitude, longitude) {
    var inputGeocode = new Geocode(latitude, longitude);
    var idxOfClosestLoc = 0;
    var closestDistance = Number.POSITIVE_INFINITY;

    for (var i = 0; i < data.length; i++) {
        if (data[i] != null) {
            var currLocGeocode = new Geocode(data[i].latitude, data[i].longitude);
            var distance = getDistance(inputGeocode, currLocGeocode);
            if (distance < closestDistance) {
                idxOfClosestLoc = i;
                closestDistance = distance;
            }
        }
    }

    return data[idxOfClosestLoc];
}

function getDistance(geocode1, geocode2) {
    var latDistance = geocode2.latitude - geocode1.latitude;
    var longDistance = geocode2.longitude - geocode1.longitude;
    return Math.sqrt(Math.pow(latDistance, 2) + Math.pow(longDistance, 2));
}

module.exports = {
    validLocation: validLocation,
    findFirstEmptyIndex: findFirstEmptyIndex,
    getLocations: data,
    getLocation: getLocation,
    createLocation: createLocation,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation,
    getDistance: getDistance,
    getClosestLocation: getClosestLocation
}
