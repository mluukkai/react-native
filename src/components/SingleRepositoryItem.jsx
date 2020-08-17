import React from 'react';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';

import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const SingleRepositoryItem = () => {
  
  const { id } = useParams();
  console.log(id);

  const { data, error, loading } = useQuery(
    GET_REPOSITORY, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    }
  );

  const item = data ? data.repository: null;

  if (!item) {
    return null;
  }

  console.log(item)

  return (
    <RepositoryItem item={item} openable={true} />
  );
};

export default SingleRepositoryItem;