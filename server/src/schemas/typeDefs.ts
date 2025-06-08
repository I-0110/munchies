const typeDefs = `
  type User {
    _id: String
    name: String
    email: String
    password: String
    cookbook: [Recipe]
    recipes: [Recipe]
  }

  type Recipe {
    _id: ID
    day: String
    mealId: String
    name: String
    category: String
    instructions: String
    image_url: String
    video_url: String
    ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID
    ingredient: String
    measure: String
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
    mealId: String!
    name: String!
    category: String
    instructions: String!
    image_url: String
    video_url: String
    ingredients: [IngredientInput]!
  }

  input IngredientInput {
    ingredient: String!
    measure: String
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
    addRecipes( input: RecipeInput!): Boolean
    removeUser: Boolean
    removeRecipes(day: String!, recipeId: String!): User
  }
`;

export default typeDefs;
