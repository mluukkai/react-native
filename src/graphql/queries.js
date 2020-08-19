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
          id
        }
      }
    }
  }
`;

export const GET_REPOSITORIES2 = gql`
query repositories($by: AllRepositoriesOrderBy, $direction: OrderDirection){
  repositories (orderBy: $by, orderDirection:$direction) {
     edges {
       node {
         name
         url
         reviewCount 
         ratingAverage 
         stargazersCount
         language 
         description 
         ownerAvatarUrl
         forksCount
         id
       }
     }
   }
 }
`;

export const GET_REPOSITORIES_HIGHEST = gql`
{
  repositories (orderBy: RATING_AVERAGE) {
    edges {
      node {
        name
        url
        reviewCount 
        ratingAverage 
        stargazersCount
        language 
        description 
        ownerAvatarUrl
        forksCount
        id
      }
    }
  }
}
`;

export const GET_REPOSITORIES_LOWEST = gql`
{
  repositories (orderBy: RATING_AVERAGE, orderDirection:ASC) {
    edges {
      node {
        name
        url
        reviewCount 
        ratingAverage 
        stargazersCount
        language 
        description 
        ownerAvatarUrl
        forksCount
        id
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

export const GET_REPOSITORY = gql`
  query get_repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      name
      reviewCount 
      ratingAverage 
      stargazersCount
      language 
      description 
      ownerAvatarUrl
      forksCount 
      reviews{
        edges{
          node{
            id
            text
            rating
            createdAt 
            user {
              id
              username
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