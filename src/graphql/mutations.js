import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
  mutation log_in($username: String!, $password : String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const AUTHORIZ2E = gql`
mutation authorize {
  authorize(credentials: { username: "kalle", password: "password" }) {
    accessToken
  }
}
`;