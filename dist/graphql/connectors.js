"use strict";

var mongoose = require('mongoose');

var isEmail = require('validator/lib/isEmail');

var _require = require('../utils/auth'),
    createToken = _require.createToken,
    verifyToken = _require.verifyToken,
    encryptPassword = _require.encryptPassword,
    comparePassword = _require.comparePassword;

var User = require('../db/models/user.js');

var connectors = {
  Auth: {
    signUp: function signUp(args) {
      return new Promise(function (resolve, reject) {
        // Validate the data
        if (!args.email) {
          return reject({
            code: 'email.empty',
            message: 'Email is empty.'
          });
        } else if (!isEmail(args.email)) {
          return reject({
            code: 'email.invalid',
            message: 'You have to provide a valid email.'
          });
        }

        if (!args.password) {
          return reject({
            code: 'password.empty',
            message: 'You have to provide a password.'
          });
        } // added code


        resolve(console.debug('singup', encryptPassword(args.password)));
        return encryptPassword(args.password, function (err, hash) {
          if (err) {
            return reject(new Error('The password could not be hashed.'));
          }

          return User.create(Object.assign(args, {
            password: hash
          })).then(function (user) {
            resolve(createToken({
              id: user._id,
              email: user.email
            }));
          })["catch"](function (err2) {
            if (err2.code === 11000) {
              return reject({
                code: 'user.exists',
                message: 'There is already a user with this email.'
              });
            }

            return reject(err2);
          });
        });
      });
    },
    signIn: function signIn(args) {
      return new Promise(function (resolve, reject) {
        // Validate the data
        if (!args.email) {
          return reject({
            code: 'email.empty',
            message: 'Email is empty.'
          });
        } else if (!isEmail(args.email)) {
          return reject({
            code: 'email.invalid',
            message: 'You have to provide a valid email.'
          });
        }

        if (!args.password) {
          return reject({
            code: 'password.empty',
            message: 'You have to provide a password.'
          });
        } // Find the user


        return User.findOne({
          email: args.email
        }).then(function (user) {
          if (!user) {
            return reject({
              code: 'user.not_found',
              message: 'Authentication failed. User not found.'
            });
          }

          return comparePassword(user.password, args.password, function (err, isMatch) {
            if (err) {
              return reject(err);
            }

            if (!isMatch) {
              return reject({
                code: 'password.wrong',
                message: 'Wrong password.'
              });
            }

            return resolve(createToken({
              id: user._id,
              email: user.email
            }));
          });
        })["catch"](function (err) {
          return reject(err);
        });
      });
    },
    isAuthenticated: function isAuthenticated(args) {
      return new Promise(function (resolve, reject) {
        if (!args.token) {
          return reject({
            code: 'token.empty',
            message: 'The user token is empty.'
          });
        }

        return verifyToken(args.token, function (err, decoded) {
          if (err) {
            return reject({
              code: 'user.unauthenticated',
              message: 'You must be authenticated.'
            });
          }

          return resolve(decoded);
        });
      });
    }
  },
  User: {
    getUsers: function getUsers() {
      return User.find({});
    }
  }
};
module.exports = connectors;