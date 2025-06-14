import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
query Me {
  me {
    name
    recipes {
      _id
      category
      day
      image_url
      instructions
      mealId
      name
      video_url
      ingredients {
        ingredient
        measure
      }
    }
  }
}
`;
