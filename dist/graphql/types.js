"use strict";

var typeDefs = [
/* GraphQL */
"\n  # Error type.\n  type Error {\n    key: String\n    value: String\n  }\n  # Auth type.\n  type Auth {\n    token: String\n    errors: [Error]\n  }\n  # User type.\n  type User {\n    id: String!\n    firstName: String!\n    lastName: String!\n    email: String!\n  }\n\ntype Dream {\n  id: String\n  name: String,\n  description: String,\n  lucid: Boolean\n}\n\ntype Healer {\n  id: String,\n  name: String,\n  description: String,\n  photo: String\n}\n\n\n  # Query type.\n  type Query {\n    # Fetch a list of users.\n    users: [User]!\n    healers: [Healer]!\n    healer(id: String!): Healer\n  }\n  type Mutation {\n    # Sign up.\n    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth\n    # Sign in.\n    signIn(email: String!, password: String!): Auth\n  }\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n"];
module.exports = typeDefs;