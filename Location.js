"use strict";

function Location(id, name, address, latitude, longitude) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.latitude = latitude;
  this.longitude = longitude;
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

Location.prototype.toJson = function() {
    return JSON.parse("{" +
       '"id":' + this.id + ',' +
       '"name": "' + this.name + '",' +
       '"address": "' + this.address + '",' +
       '"latitude":' + this.latitude + ',' +
       '"longitude":' + this.longitude +
    "}");
}

module.exports = Location;