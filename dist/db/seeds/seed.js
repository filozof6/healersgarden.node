"use strict";

var fs = require("fs");

var path = require("path");

var seedMapper = function seedMapper(dataEntity) {
  var ModelClass = require("./../models/".concat(dataEntity, ".js"));

  var jsonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "json/".concat(dataEntity, ".json"))));
  jsonData.forEach(function (element) {
    var modelInstance = new ModelClass(element);
    modelInstance.save();
  });
};

module.exports = seedMapper;