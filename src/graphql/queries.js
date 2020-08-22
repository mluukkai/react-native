import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query repositories($by: AllRepositoriesOrderBy, $direction: OrderDirection, $key: String, $first: Int, $after: String){
  repositories (orderBy: $by, orderDirection:$direction, searchKeyword: $key, first: $first, after: $after) {
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
         fullName
         id
       }
      cursor
     }
		pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
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
  repositories (orderBy: RATING_AVERAGE, orderDirection: ASC) {
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
            repository {
              id
            }
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

export const MY_REVIEWS = gql`
  query {
    authorizedUser {
      id
      username
      reviews{
        edges{
          node{
            id 
            user { 
              username
            }
            repository { 
              id 
              ownerName
              fullName
            }
            createdAt 
            rating 
            text
          }
        }
      }
    }
  }
`;