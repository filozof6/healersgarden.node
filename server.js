const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')
const db = require('./db/connection.js')
const Healer = require('./db/models/healer.js')
const Seed = require('./db/seeds/seed.js')
const cors = require('cors')
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./graphql/types.js');
const resolvers = require('./graphql/resolvers.js');

const app = express();
const schema2 = makeExecutableSchema({ typeDefs, resolvers });

app.use('/graphql', cors(), expressGraphQL({
    schema:schema2,
    graphiql: true,
}))
app.use('/debug', (req, res) => {
    var curandero = new Healer({name: 'Amadeo'});
    curandero.save();
    console.log('this is debug homie!');
    console.log(db);
    res.send('Hello World!');
})
app.use('/seed/:seedType', (req, res) => {
    
    console.log('this is debug homie!');
    console.log(Seed(req.params.seedType));
    res.send(req.params.seedType);
})

app.listen(4000, function(){
    console.log('server running on port 4000');
})

app.get('/lol', cors(), function (req, res) {

         Healer.find({_id: "5d2b2a69971bba67e01e3c46"}).exec(function(err, leads){
            console.log('leads');
            console.log(leads);
            });
        
  res.send('lol'
    )
});