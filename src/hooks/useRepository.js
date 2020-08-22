import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading, fetchMore, ...result  } = useQuery(
    GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            edges: [
              ...previousResult.repository.edges,
              ...fetchMoreResult.repository.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repository: data ? data.repository: null,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;