var expect = require('chai').expect;
var should = require('chai').should;
var helper = require('../helper.js');
var Location = require("../Location");
var Geocode = require("../Geocode");

describe('validLocation()', function () {
  var id = 1;

  it('should be valid if all fields are populated', function () {
    var location = new Location(1, "testName", "testAddr", 0.111, -122.1);
    var result = helper.validLocation(location);
    expect(result).to.be.equal(true);
  });

  it('should be invalid if some lat/long are missing', function () {
    var location = new Location(1, "testName", "testAddr", null, null);
    var result = helper.validLocation(location);
    expect(result).to.be.equal(false);
  });

  it('should be invalid if name is missing', function () {
    var location = new Location(1, null, "testAddr", 0.111, -122.1);
    var result = helper.validLocation(location);
    expect(result).to.be.equal(false);
  });

  it('should be invalid if address is missing', function () {
    var location = new Location(1, "testName", null, 0.111, -122.1);
    var result = helper.validLocation(location);
    expect(result).to.be.equal(false);
  });

  it('should be invalid if lat/long are not floats', function () {
      var location = new Location(1, "testName", "testAddr", "hello", "world");
      var result = helper.validLocation(location);
      expect(result).to.be.equal(false);
    });
});

describe('findFirstEmptyIndex()', function () {
  it('should pick the first empty index', function () {
    var spareArr = [null, 1, 2, 3, null, 5];
    var expectedResult = 0;

    var result = helper.findFirstEmptyIndex(spareArr);
    expect(result).to.be.equal(expectedResult);
  });

  it('should pick the first empty index 2', function () {
    var spareArr = [1, 2, 3, null, 5];
    var expectedResult = 3;

    var result = helper.findFirstEmptyIndex(spareArr);
    expect(result).to.be.equal(expectedResult);
  });

  it('should pick the last index if no empty indices', function () {
    var spareArr = [1, 2, 3, 4, 5];
    var expectedResult = 5;

    var result = helper.findFirstEmptyIndex(spareArr);
    expect(result).to.be.equal(expectedResult);
  });
});

describe('createLocation()', function () {
  it('should return an id when successful', function () {
    var id = 1;
    var location = {
      "name": "testName",
      "address": "testAddress",
      "latitude": 0.111,
      "longitude": -122.1
    };

    var result = helper.createLocation(JSON.stringify(location));
    expect(result).to.have.any.keys("id");
  });
});

describe('getDistance()', function () {
  it('should return distance between two geocodes', function () {
    var geocode1 = new Geocode(0.1, -122.0);
    var geocode2 = new Geocode(2.1, -123.0);
    var expectedResult = 2.23606797749979;

    var result = helper.getDistance(geocode1, geocode2);
    expect(result).to.be.equal(expectedResult);
  });
});