import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          name
          url
          reviewCount 
          ratingAverage 
          stargazersCount
          language 
          description 
          ownerAvatarUrl
          forksCount
        }
      }
    }
  }
`;

export const GET_USERS_RATINGS = gql`
  {
    users {
      edges {
        node {
          username
          id
          reviews {
            edges {
              node {
                rating
              }
            }
          }
        }
      }
    }
  }
`;



export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;