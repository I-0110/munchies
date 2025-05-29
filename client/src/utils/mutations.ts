import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        recipes
      }
    }
  }
`;

export const ADD_INGREDIENT = gql`
  mutation addIngredient($userId: ID!, $ingredient: String!) {
    addIngredient(userId: $userId, ingredient: $ingredient) {
      _id
      name
      calories
    }
  }
`;

export const ADD_RECIPES = gql`
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
        username
      }
    }
  }
`;

export const REMOVE_INGREDIENT = gql`
  mutation removeIngredient($ingredient: String!) {
    removeIngredient(ingredient: $ingredient) {
      _id
      username
      ingredients
    }
  }
`;

export const REMOVE_RECIPES = gql`
  mutation removeRecipes($recipes: String!) {
    removeRecipes(recipes: $recipes) {
      _id
      username
      email
      password
      recipes
    }
  }
`;
