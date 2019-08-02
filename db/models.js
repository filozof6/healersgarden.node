//Import the mongoose module
var mongoose = require('mongoose');

var HealerSchema = new Schema({
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    photo: { type: String, trim: true }
  });
var Healer = mongoose.model('Healer', HealerSchema );

var PlantSchema = new Schema({
    name: { type: String, trim: true },
    description: String
  });
var Plant = mongoose.model('Plant', PlantSchema );

var CentreSchema = new Schema({
    name: { type: String, trim: true },
    link: { type: String, trim: true },
    socialLinks: String
  });
var Centre = mongoose.model('Centre', CentreSchema );

var AddressSchema = new Schema({
    number: { type: String, trim: true },
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    addressLine: { type: String, trim: true }
  });
var Address = mongoose.model('Address', AddressSchema );