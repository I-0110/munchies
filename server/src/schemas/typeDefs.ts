const typeDefs = `
  type User {
    _id: String
    name: String
    email: String
    password: String
    recipes: [Recipe]
  }

  type Recipe {
    _id: ID
    day: String
    name: String
    author: String
    instructions: String
    image_url: String
    video_url: String
    ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID
    name: String
    calories: Float
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

  input RecipeInput {
    day: String!
    name: String!
    author: String
    instructions: String!
    image_url: String
    video_url: String
    ingredients: [IngredientInput]!
  }

  input IngredientInput {
    name: String!
    calories: Float
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addRecipes( input: RecipeInput!): User
    removeUser: User
    removeRecipes(day: String!, recipeId: String!): User
  }
`;

export default typeDefs;
