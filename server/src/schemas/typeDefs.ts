const typeDefs = `
  type User {
    _id: String
    name: String
    email: String
    password: String
    plan: [Plan]
  }

  type Plan {
    _id: String
    userId: String
    sunday: [Recipe]
    monday: [Recipe]
    tuesday: [Recipe]
    wednesday: [Recipe]
    thursday: [Recipe]
    friday: [Recipe]
    saturday: [Recipe]
  }

  type Recipe {
    _id: ID
    planId: String
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
    calories: Int
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

  input PlanInput {
    dates: String
  }

  input RecipeInput {
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
    addPlan(input: PlanInput!): User
    addRecipes( day: String!, planId: String!, input: RecipeInput!): Plan
    removeUser: User
    removePlan(planId: String!): User
    removeRecipes(day: String!, planId: String!, recipeId: String!): Plan
  }
`;

export default typeDefs;
