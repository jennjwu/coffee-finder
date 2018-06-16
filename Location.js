"use strict";

function Location(id, name, address, latitude, longitude) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.latitude = latitude;
  this.longitude = longitude;

  this.stringified = "{" +
     '"id":' + this.id + ',' +
     '"name": "' + this.name + '",' +
     '"address": "' + this.address + '",' +
     '"latitude":' + this.latitude + ',' +
     '"longitude":' + this.longitude +
  "}";

  this.toJson = function() {
    return JSON.parse(this.stringified);
  };
}

Location.prototype.setName = function(name) {
    this.name = name;
};

Location.prototype.setAddress = function(address) {
    this.address = address;
};

Location.prototype.setLatitude = function(latitude) {
    this.latitude = latitude;
};

Location.prototype.setLongitude = function(longitude) {
    this.longitude = longitude;
};

Location.prototype.toJSON = function() {

}

module.exports = Location;