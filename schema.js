const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
    
} = require('graphql');
import Healer from './db/models/healer';
import { resolve } from 'path';
import { format } from 'util';

//hard data
const dreams = [
    {
      id: 1,
      name: "Dream 1",
      description: "Un curandero de la selva.",
      lucid: true
    },
    {
      id: 2,
      name: "Dream 2",
      description: "Un curandero de la selva.",
      lucid: true
    },
    {
      id: 3,
      name: "Dream 3",
      description: "Un curandero de la selva.",
      lucid: false
    },
    {
      id: 4,
      name: "Dream 4",
      description: "Un curandero de la selva.",
      lucid: false
    }
  ];
console.log(dreams);
// dream type
const DreamType = new GraphQLObjectType({
    name: 'Dream',
    fields:() => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        lucid: {type: GraphQLBoolean}
    })
});

const HealerType = new GraphQLObjectType({
    name: 'Healer',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        photo: {type: GraphQLString}
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        dream: {
            type: DreamType,
            args: {
                id:{type:GraphQLInt}
                
            },
            resolve(parentValue, args){
                for(let i=0; i < dreams.length;i++){
                    if(dreams[i].id == args.id) {
                        return dreams[i]
                    }
                }
            }
        },
        dreams: {
            type: new GraphQLList(DreamType),
            resolve(parentValue, args){
                return dreams
            }
        },
        healer: {
            type: HealerType,
            args: {
                id:{type:GraphQLString}
                
            },
            resolve(parentValue, args){
                if (args.id) {
                    return Healer.findById(args.id)
                } else {
                    console.log('ajajaj');
                    return Healer.find({});
                }
                
            }
        },
        healers: {
            type: new GraphQLList(HealerType),
            resolve(parentValue, args){
                return Healer.find({});
            }
        },
    }
   
});

module.exports = new GraphQLSchema({
    query: RootQuery
})