var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CentreSchema = new Schema({
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    link: { type: String, trim: true }
  }, { 
      timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
        } 
    });
    
var Centre = mongoose.model('Centre', CentreSchema );

module.exports = Centre;