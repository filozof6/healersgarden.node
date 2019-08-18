const typeDefs = [/* GraphQL */`
  # Error type.
  type Error {
    key: String
    value: String
  }
  # Auth type.
  type Auth {
    token: String
    errors: [Error]
  }
  # User type.
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
  }

type Dream {
  id: String
  name: String,
  description: String,
  lucid: Boolean
}

type Healer {
  id: String,
  name: String,
  description: String,
  photo: String
}

type Comment {
  id: String,
  userId: String,
  username: String,
  entity: String,
  document: String,
  text: String,
  parentComment: String,
  createdAt: String,
}


  # Query type.
  type Query {
    # Fetch a list of users.
    users: [User]!
    healers: [Healer]!
    healer(id: String!): Healer
    comments(id: String, entity: String, document: String): [Comment]
  }
  type Mutation {
    # Sign up.
    signUp(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    # Sign in.
    signIn(email: String!, password: String!): Auth
    addComment(userId: String!, entity: String!, document:String!, text: String!, parentId: String): Comment
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];

module.exports = typeDefs;