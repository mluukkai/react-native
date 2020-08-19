import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES, GET_REPOSITORIES_HIGHEST, GET_REPOSITORIES_LOWEST } from '../graphql/queries';

const useRepositories = (how) => {
  let query = GET_REPOSITORIES;
  if (how == 'Highest') {
    query = GET_REPOSITORIES_HIGHEST;
  } else if (how == "Lowest") {
    query = GET_REPOSITORIES_LOWEST;
  }
  const { data, error, loading } = useQuery(
      query, {
      fetchPolicy: 'cache-and-network',
    }
  );

  const repositories = data ? data.repositories : [];

  return { repositories, loading };
};

export default useRepositories;