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
query me {
  me {
    _id
    email
    name
    password
    recipes {
      _id
      author
      day
      image_url
      ingredients {
        _id
        calories
        name
      }
      instructions
      name
      video_url
    }
  }
}
`;
