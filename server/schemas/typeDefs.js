const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
    _id: ID
    username: String
    password: String
    messageHistory: [Messages]!
  }

  type Messages {
    _id: ID
    messageText: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    messages(username: String): [Messages]
    message(messageId: ID!): Messages
  }
 
  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addMessage(messageText: String!): Messages
  }  
`;

module.exports = typeDefs