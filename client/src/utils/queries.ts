import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      recipes
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      recipes
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      recipes
    }
  }
`;
