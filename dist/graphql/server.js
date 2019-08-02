"use strict";

var express = require('express');

var graphqlHTTP = require('express-graphql');

var _require = require('graphql'),
    buildSchema = _require.buildSchema; //var db = require('../db/db.json');
// Construct a schema, using GraphQL schema language


var schema = buildSchema("\n\n  type Query {\n    hello: String\n    dreams: Json\n  }\n"); // The root provides a resolver function for each API endpoint

var root = {
  hello: function hello() {
    return 'Hello world!';
  }
};
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');