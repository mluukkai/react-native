import { useMutation } from '@apollo/react-hooks';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [signin, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) =>
    signin({ variables: { username, password } });

  return [signIn, result];
};

export default useSignIn;