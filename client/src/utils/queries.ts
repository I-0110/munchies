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
<<<<<<< HEAD
=======
    password
>>>>>>> c360210450c6cd42ad8a4cd511ed4538c73b52b4
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
