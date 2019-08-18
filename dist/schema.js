"use strict";

var _healer = _interopRequireDefault(require("./db/models/healer"));

var _path = require("path");

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt,
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean;

//hard data
var dreams = [{
  id: 1,
  name: "Dream 1",
  description: "Un curandero de la selva.",
  lucid: true
}, {
  id: 2,
  name: "Dream 2",
  description: "Un curandero de la selva.",
  lucid: true
}, {
  id: 3,
  name: "Dream 3",
  description: "Un curandero de la selva.",
  lucid: false
}, {
  id: 4,
  name: "Dream 4",
  description: "Un curandero de la selva.",
  lucid: false
}];
console.log(dreams); // dream type

var DreamType = new GraphQLObjectType({
  name: 'Dream',
  fields: function fields() {
    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      lucid: {
        type: GraphQLBoolean
      }
    };
  }
});
var HealerType = new GraphQLObjectType({
  name: 'Healer',
  fields: function fields() {
    return {
      id: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      photo: {
        type: GraphQLString
      }
    };
  }
}); // Root query

var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dream: {
      type: DreamType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function resolve(parentValue, args) {
        for (var i = 0; i < dreams.length; i++) {
          if (dreams[i].id == args.id) {
            return dreams[i];
          }
        }
      }
    },
    dreams: {
      type: new GraphQLList(DreamType),
      resolve: function resolve(parentValue, args) {
        return dreams;
      }
    },
    healer: {
      type: HealerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function resolve(parentValue, args) {
        if (args.id) {
          return _healer["default"].findById(args.id);
        } else {
          console.log('ajajaj');
          return _healer["default"].find({});
        }
      }
    },
    healers: {
      type: new GraphQLList(HealerType),
      resolve: function resolve(parentValue, args) {
        return _healer["default"].find({});
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});