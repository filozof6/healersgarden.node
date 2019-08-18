"use strict";

var connectors = require('./connectors');

var User = require('../db/models/user');

var Healer = require('../db/models/healer');

var resolvers = {
  Query: {
    users: function users() {
      return connectors.User.getUsers().then(function (users) {
        return users.map(function (user) {
          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          };
        });
      })["catch"](function (err) {
        throw new Error(err);
      });
    },
    healer: function healer(root, args) {
      if (args.id) {
        return Healer.findById(args.id);
      } else {
        console.log('ajajaj');
        return Healer.find({});
      }
    },
    healers: function healers(parentValue, args) {
      return Healer.find({});
    }
  },
  Mutation: {
    signUp: function signUp(root, args) {
      var errors = [];
      return connectors.Auth.signUp(args).then(function (token) {
        return {
          token: token,
          errors: errors
        };
      })["catch"](function (err) {
        if (err.code && err.message) {
          errors.push({
            key: err.code,
            value: err.message
          });
          return {
            token: null,
            errors: errors
          };
        }

        throw new Error(err);
      });
    },
    signIn: function signIn(root, args) {
      var errors = [];
      return connectors.Auth.signIn(args).then(function (token) {
        return {
          token: token,
          errors: errors
        };
      })["catch"](function (err) {
        if (err.code && err.message) {
          errors.push({
            key: err.code,
            value: err.message
          });
          return {
            token: null,
            errors: errors
          };
        }

        throw new Error(err);
      });
    }
  }
};
module.exports = resolvers;