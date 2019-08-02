var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HealerSchema = new Schema({
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    photo: { type: String, trim: true }
  }, { 
      timestamps: { 
        createdAt: 'created_at',
        updatedAt: 'updated_at', 
        } 
    });

var Healer = mongoose.model('Healer', HealerSchema );

module.exports = Healer;