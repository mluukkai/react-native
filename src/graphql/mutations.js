import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation log_in($username: String!, $password : String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation signin($username: String!, $password : String!) {
    createUser(user: {username: $username, password: $password}) {
      id 
      username
      createdAt
    }
  }
`;

export const REVIEW = gql`
  mutation createReview($repository: String!, $owner : String!, $rating: Int!, $text: String) {
    createReview(review: { repositoryName: $repository, ownerName: $owner, rating: $rating, text: $text }) {
      id 
      user {
        id
        username
      }
      repository {
        id
      }
      repositoryId 
      rating 
      createdAt 
      text 
    }
  }
`;

