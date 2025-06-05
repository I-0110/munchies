import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_INGREDIENT = gql`
  mutation addIngredient($userId: ID!, $calories: String!) {
    addIngredient(userId: $userId, calories: $calories) {
      _id
      name
      calories
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipes($userId: ID!, $recipes: String!) {
    addRecipes(userId: $userId, recipes: $recipes) {
      _id
      username
      recipes
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const REMOVE_INGREDIENT = gql`
  mutation removeIngredient($ingredient: String!) {
    removeIngredient(ingredient: $ingredient) {
      _id
      username
      ingredient
    }
  }
`;

export const REMOVE_RECIPES = gql`
  mutation removeRecipes($recipes: String!) {
    removeRecipes(recipes: $recipes) {
      _id
      username
      recipes
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation {
  removeUser
}
`;