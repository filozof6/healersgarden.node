"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

//Import the mongoose module
var mongoose = require('mongoose'); //Set up default mongoose connection


var mongoDB = 'mongodb://127.0.0.1/healers_garden';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
}); //Get the default connection

var db = mongoose.connection; //Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var _default = db;
exports["default"] = _default;