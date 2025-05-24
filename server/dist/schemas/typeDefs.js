const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    ingredients: [String]!
    recipes: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addIngredient(userId: ID!, ingredient: String!): User
    addRecipes(userId: ID!, recipes: String!): User
    removeUser: User
    removeIngredient(ingredient: String!): User
    removeRecipes(recipes: String!): User
  }
`;
export default typeDefs;
