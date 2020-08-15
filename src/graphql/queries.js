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