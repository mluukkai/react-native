import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE } from '../graphql/mutations';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [signin, result] = useMutation(AUTHORIZE);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await signin({ variables: { username, password } });
    const token = response.data.authorize.accessToken;
    await authStorage.setAccessToken(token);
    client.resetStore();
    return response;
  };
    

  return [signIn, result];
};

export default useSignIn;