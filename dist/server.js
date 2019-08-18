"use strict";

var express = require('express');

var expressGraphQL = require('express-graphql');

var schema = require('./schema.js');

var db = require('./db/connection.js');

var Healer = require('./db/models/healer.js');

var Seed = require('./db/seeds/seed.js');

var cors = require('cors');

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

var typeDefs = require('./graphql/types.js');

var resolvers = require('./graphql/resolvers.js');

var app = express();
var schema2 = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
app.use('/graphql', cors(), expressGraphQL({
  schema: schema2,
  graphiql: true
}));
app.use('/debug', function (req, res) {
  var curandero = new Healer({
    name: 'Amadeo'
  });
  curandero.save();
  console.log('this is debug homie!');
  console.log(db);
  res.send('Hello World!');
});
app.use('/seed/:seedType', function (req, res) {
  console.log('this is debug homie!');
  console.log(Seed(req.params.seedType));
  res.send(req.params.seedType);
});
app.listen(4000, function () {
  console.log('server running on port 4000');
});
app.get('/lol', cors(), function (req, res) {
  Healer.find({
    _id: "5d2b2a69971bba67e01e3c46"
  }).exec(function (err, leads) {
    console.log('leads');
    console.log(leads);
  });
  res.send('lol');
});