"use strict";

var express = require('express');

var expressGraphQL = require('express-graphql');

var schema = require('./schema.js');

var db = require('./db/connection.js');

var Healer = require('./db/models/healer.js');

var Seed = require('./db/seeds/seed.js');

var app = express();
app.use('/graphql', expressGraphQL({
  schema: schema,
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