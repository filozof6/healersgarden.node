"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var config = require('../config');

exports.getTokenFromRequest = function (req) {
  return req.body.token || req.params.token || req.headers.authorization;
};

exports.createToken = function (payload) {
  return jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  });
};

exports.verifyToken = function (token, callback) {
  jwt.verify(token, config.auth.secret, function (err, decoded) {
    if (err) {
      return callback(err);
    }

    return callback(null, decoded);
  });
};

exports.encryptPassword = function (password, callback) {
  // Generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err);
    } // Hash (encrypt) our password using the salt


    return bcrypt.hash(password, salt, null, function (err2, hash) {
      if (err2) {
        return callback(err2);
      }

      return callback(null, hash);
    });
  });
};

exports.comparePassword = function (currentPassword, candidatePassword, callback) {
  return bcrypt.compare(candidatePassword, currentPassword, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    return callback(null, isMatch);
  });
};